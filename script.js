const textDatabase = {
    en: [
        "Technology has revolutionized the way we live and work. From the invention of the printing press to the rise of the internet.",
        "Nature is a complex and beautiful system where every living organism plays a vital role. The lush green forests are amazing.",
        "Success is not final, and failure is not fatal. It is the courage to continue that truly counts in the modern world.",
        "Programming is the art of giving instructions to computers to solve complex problems logically and efficiently.",
        "The universe is vast and expanding, filled with billions of galaxies, stars, and mysteries yet to be discovered."
    ],
    bn: [
        "প্রযুক্তি আমাদের জীবন এবং কাজকে পুরোপুরি বদলে দিয়েছে। মুদ্রণযন্ত্রের আবিষ্কার থেকে শুরু করে ইন্টারনেটের উত্থান অভাবনীয়।",
        "প্রকৃতি এক অপরূপ ব্যবস্থা যেখানে প্রতিটি জীবের একটি গুরুত্বপূর্ণ ভূমিকা রয়েছে। সবুজ বনভূমি, মহাসাগর সবই একে অপরের সাথে সংযুক্ত।",
        "সাফল্য মানেই শেষ নয়, আর ব্যর্থতা মানেই ধ্বংস নয়। সামনে এগিয়ে যাওয়ার সাহসটাই হলো আসল কথা।",
        "কঠোর পরিশ্রম, নিষ্ঠা এবং ইতিবাচক মানসিকতা যেকোনো বাধাকে সুযোগে পরিণত করতে পারে। নিজের সীমানাকে ছাড়িয়ে যাওয়ার চেষ্টা করুন।",
        "বাংলাদেশ নদীমাতৃক দেশ। এখানকার প্রাকৃতিক সৌন্দর্য এবং মানুষের সহজ সরল জীবনযাত্রা সত্যিই মনোমুগ্ধকর।"
    ],
    hi: [
        "प्रौद्योगिकी ने हमारे जीने और काम करने के तरीके में पूरी तरह से क्रांति ला दी है। इंटरनेट का उदय इसका प्रमाण है।",
        "प्रकृति एक सुंदर प्रणाली है जहां हर जीवित जीव एक महत्वपूर्ण भूमिका निभाता है। हरे-भरे जंगल बहुत ही आकर्षक हैं।",
        "सफलता अंतिम नहीं है, और असफलता घातक नहीं है। यह जारी रखने का साहस है जो वास्तव में मायने रखता है।",
        "कड़ी मेहनत, समर्पण और सकारात्मक मानसिकता किसी भी बाधा को अवसर में बदल सकती है। हमेशा आगे बढ़ते रहें।",
        "भारत एक विशाल और विविध देश है, जहां विभिन्न संस्कृतियां, भाषाएं और परंपराएं एक साथ निवास करती हैं।"
    ]
};

let currentLang = 'en', selectedTime = 180, timeRemaining = 180;
let timerInterval = null, isTyping = false;
let wordsArray = [], activeWordIndex = 0;
let stats = { correctStrokes: 0, wrongStrokes: 0, totalTyped: 0 };

const textDisplay = document.getElementById('words');
const hiddenInput = document.getElementById('hidden-input');
const focusOverlay = document.getElementById('focus-overlay');
const liveWpmDisplay = document.getElementById('live-wpm');
const liveAccDisplay = document.getElementById('live-acc');
const timerDisplay = document.getElementById('timer');
const errorSound = document.getElementById('sound-error');

function generateText() {
    wordsArray = [];
    let paragraphs = [...textDatabase[currentLang]];
    paragraphs.sort(() => Math.random() - 0.5); // Randomize
    let fullText = paragraphs.join(" ");
    let words = fullText.split(/\s+/);
    
    let wordCount = selectedTime === 60 ? 40 : (selectedTime === 180 ? 120 : 220);
    wordsArray = words.slice(0, wordCount);
}

function renderText() {
    textDisplay.innerHTML = '';
    wordsArray.forEach((word) => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        wordDiv.innerHTML = `<span class="untyped">${word}</span>`;
        textDisplay.appendChild(wordDiv);
    });
    activeWordIndex = 0;
    updateActiveWordVisuals();
}

function initGame() {
    clearInterval(timerInterval);
    isTyping = false;
    timeRemaining = selectedTime;
    timerDisplay.innerText = formatTime(timeRemaining);
    liveWpmDisplay.innerHTML = `0 <small>WPM</small>`;
    liveAccDisplay.innerHTML = `100<small>%</small>`;
    hiddenInput.value = '';
    stats = { correctStrokes: 0, wrongStrokes: 0, totalTyped: 0 };
    
    generateText();
    renderText();
    document.getElementById('result-modal').classList.add('hidden');
    focusInput();
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function focusInput() {
    hiddenInput.focus();
    focusOverlay.style.opacity = '0';
    setTimeout(() => focusOverlay.style.display = 'none', 300);
}
focusOverlay.addEventListener('click', focusInput);
document.getElementById('typing-container').addEventListener('click', focusInput);

// MOBILE AND PC HYBRID TYPING ENGINE (Protects Bengali Conjuncts)
hiddenInput.addEventListener('input', (e) => {
    if(!isTyping) startTimer();
    
    let typedVal = hiddenInput.value;

    // Spacebar check for moving to next word
    if (typedVal.endsWith(' ')) {
        const activeWordEl = document.querySelectorAll('.word')[activeWordIndex];
        const targetWord = wordsArray[activeWordIndex];
        
        let typedWord = typedVal.trim();
        if(typedWord !== targetWord) {
            activeWordEl.classList.add('error'); // Underline if word is wrong
        }
        
        activeWordIndex++;
        hiddenInput.value = ''; // Reset for next word
        
        if (activeWordIndex >= wordsArray.length) {
            endGame(); 
        } else {
            updateActiveWordVisuals();
            // Scroll down automatically
            const activeEl = document.querySelectorAll('.word')[activeWordIndex];
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    updateActiveWordVisuals();
    calculateStats();
});

function updateActiveWordVisuals() {
    const wordElements = document.querySelectorAll('.word');
    wordElements.forEach(el => el.classList.remove('active'));
    
    if(!wordElements[activeWordIndex]) return;
    
    const activeWordEl = wordElements[activeWordIndex];
    activeWordEl.classList.add('active');
    
    const targetWord = wordsArray[activeWordIndex];
    const typedVal = hiddenInput.value;

    let matchLen = 0;
    for(let i=0; i<typedVal.length; i++){
        if(typedVal[i] === targetWord[i]) matchLen++;
        else break;
    }

    let correctStr = typedVal.substring(0, matchLen);
    let wrongStr = typedVal.substring(matchLen);
    let untypedStr = targetWord.substring(matchLen + wrongStr.length);

    let html = '';
    if (correctStr) html += `<span class="correct">${correctStr}</span>`;
    if (wrongStr) {
        html += `<span class="incorrect">${wrongStr}</span>`;
        triggerShake(); // Vibrate screen on error
    }
    if (untypedStr) html += `<span class="untyped">${untypedStr}</span>`;

    activeWordEl.innerHTML = html;
}

function triggerShake() {
    errorSound.currentTime = 0;
    errorSound.play().catch(()=>{});
    const container = document.querySelector('.typing-card');
    container.classList.remove('shake-animation');
    void container.offsetWidth; 
    container.classList.add('shake-animation');
    stats.wrongStrokes++;
}

function startTimer() {
    isTyping = true;
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = formatTime(timeRemaining);
        calculateStats();
        if (timeRemaining <= 0) endGame();
    }, 1000);
}

function calculateStats() {
    // Count exact correct characters from DOM
    let totalCorrect = document.querySelectorAll('.word .correct').length;
    let typedSoFar = totalCorrect + stats.wrongStrokes;
    
    const timeElapsed = (selectedTime - timeRemaining) / 60; 
    if (timeElapsed > 0) {
        let wpm = Math.round((totalCorrect / 5) / timeElapsed);
        liveWpmDisplay.innerHTML = `${Math.max(0, wpm)} <small>WPM</small>`;
    }
    
    let acc = typedSoFar > 0 ? Math.round((totalCorrect / typedSoFar) * 100) : 100;
    liveAccDisplay.innerHTML = `${acc}<small>%</small>`;
}

function endGame() {
    clearInterval(timerInterval);
    isTyping = false;
    
    let totalCorrect = document.querySelectorAll('.word .correct').length;
    let finalWpm = Math.round((totalCorrect / 5) / (selectedTime / 60));
    let finalAcc = liveAccDisplay.innerText.replace('%', '');

    document.getElementById('final-wpm').innerHTML = `${finalWpm} <span>WPM</span>`;
    document.getElementById('final-acc').innerHTML = `${finalAcc}<span>%</span>`;
    document.getElementById('stat-correct').innerText = totalCorrect;
    document.getElementById('stat-wrong').innerText = stats.wrongStrokes;
    document.getElementById('stat-words').innerText = activeWordIndex;

    document.getElementById('result-modal').classList.remove('hidden');
}

// Config Controls
document.getElementById('restart-btn').addEventListener('click', initGame);
document.getElementById('close-modal-btn').addEventListener('click', initGame);

document.querySelectorAll('#lang-group .toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#lang-group .toggle-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentLang = e.target.getAttribute('data-lang');
        initGame();
    });
});

document.querySelectorAll('#time-group .toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#time-group .toggle-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        selectedTime = parseInt(e.target.getAttribute('data-time'));
        initGame();
    });
});

// Govt. Style Certificate
document.getElementById('download-cert-btn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape', 'mm', 'a4');
    const name = document.getElementById('student-name').value || "Candidate";
    const wpm = document.getElementById('final-wpm').innerText.replace('WPM', '').trim();
    const acc = document.getElementById('final-acc').innerText.replace('%', '').trim();
    const dateStr = new Date().toLocaleDateString('en-GB');

    doc.setLineWidth(4); doc.setDrawColor(37, 99, 235); doc.rect(10, 10, 277, 190);
    doc.setLineWidth(1); doc.setDrawColor(200, 200, 200); doc.rect(16, 16, 265, 178);

    doc.setFont("helvetica", "bold"); doc.setFontSize(28); doc.setTextColor(37, 99, 235);
    doc.text("BHARAT TYPING INITIATIVE", 148.5, 45, { align: "center" });
    doc.setFontSize(12); doc.setTextColor(100, 100, 100);
    doc.text("GOVERNMENT VERIFIED CERTIFICATION", 148.5, 53, { align: "center" });

    doc.setFont("times", "bolditalic"); doc.setFontSize(40); doc.setTextColor(30, 41, 59);
    doc.text("Certificate of Typing Proficiency", 148.5, 85, { align: "center" });

    doc.setFont("times", "bold"); doc.setFontSize(35); doc.setTextColor(37, 99, 235);
    doc.text(name.toUpperCase(), 148.5, 122, { align: "center" });
    
    doc.setFont("helvetica", "bold"); doc.setFontSize(14);
    doc.text(`Speed: ${wpm} WPM   |   Accuracy: ${acc}%`, 148.5, 155, { align: "center" });

    doc.setFont("times", "italic"); doc.setFontSize(20); doc.setTextColor(37, 99, 235);
    doc.text("Ayan Karmakar", 230, 172, { align: "center" }); 
    doc.setFont("helvetica", "normal"); doc.setFontSize(12); doc.setTextColor(0, 0, 0);
    doc.text("Ayan Karmakar, Founder", 230, 182, { align: "center" });
    doc.text(`Date: ${dateStr}`, 60, 182);

    doc.save(`BharatTyping_Certificate_${name.replace(/\s+/g, '_')}.pdf`);
});

window.onload = initGame;
