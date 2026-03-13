// ==========================================================================
// 1. PREMIUM PARAGRAPH BANKS (Meaningful text for true typing practice)
// ==========================================================================
const textDatabase = {
    en: [
        "Technology has revolutionized the way we live, work, and communicate. From the invention of the printing press to the rise of the internet, human progress has been driven by innovation. In today's digital age, mastering keyboard skills is not just an advantage; it is a fundamental necessity for almost every professional career.",
        "Nature is a complex and beautiful system where every living organism plays a vital role. The lush green forests, deep blue oceans, and soaring mountains are all interconnected. Protecting our environment is crucial for the survival of future generations. We must adopt sustainable practices to preserve the delicate balance of our ecosystem.",
        "Success is not final, and failure is not fatal. It is the courage to continue that truly counts. Many great leaders faced countless rejections before achieving their dreams. Hard work, dedication, and a positive mindset can turn any obstacle into an opportunity. Keep pushing your limits, and eventually, you will reach your ultimate goals."
    ],
    bn: [
        "প্রযুক্তি আমাদের জীবন, কাজ এবং যোগাযোগের মাধ্যমকে পুরোপুরি বদলে দিয়েছে। মুদ্রণযন্ত্রের আবিষ্কার থেকে শুরু করে ইন্টারনেটের উত্থান—মানুষের অগ্রগতি সর্বদা উদ্ভাবনের ওপর নির্ভরশীল। বর্তমান ডিজিটাল যুগে কীবোর্ডের দক্ষতা অর্জন করা কেবল কোনো সুবিধা নয়; বরং এটি প্রায় প্রতিটি পেশাগত ক্যারিয়ারের জন্য একটি মৌলিক প্রয়োজনীয়তা।",
        "প্রকৃতি এক অপরূপ ও জটিল ব্যবস্থা যেখানে প্রতিটি জীবের একটি গুরুত্বপূর্ণ ভূমিকা রয়েছে। সবুজ বনভূমি, গভীর নীল মহাসাগর এবং বিশাল পর্বতমালা সবই একে অপরের সাথে সংযুক্ত। ভবিষ্যৎ প্রজন্মের অস্তিত্ব রক্ষার জন্য পরিবেশ সংরক্ষণ করা অত্যন্ত জরুরি। বাস্তুতন্ত্রের ভারসাম্য বজায় রাখতে আমাদের অবশ্যই টেকসই পদ্ধতি গ্রহণ করতে হবে।",
        "সাফল্য মানেই শেষ নয়, আর ব্যর্থতা মানেই ধ্বংস নয়। সামনে এগিয়ে যাওয়ার সাহসটাই হলো আসল কথা। অনেক বড় বড় নেতা তাদের স্বপ্ন পূরণের আগে অসংখ্যবার প্রত্যাখ্যাত হয়েছেন। কঠোর পরিশ্রম, নিষ্ঠা এবং ইতিবাচক মানসিকতা যেকোনো বাধাকে সুযোগে পরিণত করতে পারে। নিজের সীমানাকে ছাড়িয়ে যাওয়ার চেষ্টা করুন, একদিন ঠিকই লক্ষ্যে পৌঁছাবেন।"
    ],
    hi: [
        "प्रौद्योगिकी ने हमारे जीने, काम करने और संवाद करने के तरीके में पूरी तरह से क्रांति ला दी है। प्रिंटिंग प्रेस के आविष्कार से लेकर इंटरनेट के उदय तक, मानव प्रगति हमेशा नवाचार से प्रेरित रही है। आज के डिजिटल युग में, कीबोर्ड कौशल में महारत हासिल करना सिर्फ एक फायदा नहीं है; यह लगभग हर पेशेवर करियर के लिए एक बुनियादी आवश्यकता है।",
        "प्रकृति एक सुंदर और जटिल प्रणाली है जहां हर जीवित जीव एक महत्वपूर्ण भूमिका निभाता है। हरे-भरे जंगल, गहरे नीले महासागर और ऊंचे पहाड़ सभी आपस में जुड़े हुए हैं। आने वाली पीढ़ियों के अस्तित्व के लिए हमारे पर्यावरण की रक्षा करना बहुत महत्वपूर्ण है। हमें अपने पारिस्थितिकी तंत्र के नाजुक संतुलन को बनाए रखने के लिए स्थायी प्रथाओं को अपनाना चाहिए।",
        "सफलता अंतिम नहीं है, और असफलता घातक नहीं है। यह जारी रखने का साहस है जो वास्तव में मायने रखता है। कई महान नेताओं ने अपने सपनों को हासिल करने से पहले अनगिनत अस्वीकृतियों का सामना किया। कड़ी मेहनत, समर्पण और एक सकारात्मक मानसिकता किसी भी बाधा को अवसर में बदल सकती है। अपनी सीमाओं को आगे बढ़ाते रहें, और अंततः, आप अपने लक्ष्यों तक पहुंच जाएंगे।"
    ]
};

// ==========================================================================
// 2. GLOBAL STATE VARIABLES
// ==========================================================================
let currentLang = 'en';
let selectedTime = 180; // 3 mins default
let timeRemaining = 180;
let timerInterval = null;
let isTyping = false;

let wordsArray = [];
let activeWordIndex = 0;
let activeCharIndex = 0;

let stats = {
    correctStrokes: 0,
    wrongStrokes: 0,
    extraStrokes: 0,
    missedStrokes: 0,
    totalTyped: 0
};

// DOM Elements
const textDisplay = document.getElementById('words');
const hiddenInput = document.getElementById('hidden-input');
const caret = document.getElementById('caret');
const focusOverlay = document.getElementById('focus-overlay');
const typingContainer = document.getElementById('typing-container');
const timerDisplay = document.getElementById('timer');
const liveWpmDisplay = document.getElementById('live-wpm');
const liveAccDisplay = document.getElementById('live-acc');

// Audio Objects
const typeSound = document.getElementById('sound-type');
const errorSound = document.getElementById('sound-error');

// ==========================================================================
// 3. INITIALIZATION & TEXT GENERATION
// ==========================================================================
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateText() {
    wordsArray = [];
    const paragraphs = textDatabase[currentLang];
    let fullText = "";

    // Build enough text based on time limits (Combine paragraphs)
    let neededLength = selectedTime === 60 ? 1 : (selectedTime === 180 ? 2 : 3);
    for(let i=0; i<neededLength; i++) {
        fullText += paragraphs[i % paragraphs.length] + " ";
    }
    
    // Split into words
    wordsArray = fullText.trim().split(" ");
}

function renderText() {
    textDisplay.innerHTML = '';
    wordsArray.forEach((word) => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        // Add letters
        word.split('').forEach(char => {
            const letterTag = document.createElement('letter');
            letterTag.innerText = char;
            wordDiv.appendChild(letterTag);
        });
        textDisplay.appendChild(wordDiv);
    });
    
    activeWordIndex = 0;
    activeCharIndex = 0;
    updateCaretPosition();
}

function initGame() {
    clearInterval(timerInterval);
    isTyping = false;
    timeRemaining = selectedTime;
    
    // Reset UI
    timerDisplay.innerText = formatTime(timeRemaining);
    liveWpmDisplay.innerHTML = `0 <small>WPM</small>`;
    liveAccDisplay.innerHTML = `100<small>%</small>`;
    hiddenInput.value = '';
    
    stats = { correctStrokes: 0, wrongStrokes: 0, extraStrokes: 0, missedStrokes: 0, totalTyped: 0 };
    
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

// ==========================================================================
// 4. FOCUS, CARET & SCROLL LOGIC
// ==========================================================================
function focusInput() {
    hiddenInput.focus();
    focusOverlay.style.opacity = '0';
    setTimeout(() => focusOverlay.style.display = 'none', 300);
    textDisplay.classList.remove('unfocused');
    caret.classList.remove('hidden');
}

function blurInput() {
    focusOverlay.style.display = 'flex';
    setTimeout(() => focusOverlay.style.opacity = '1', 10);
    textDisplay.classList.add('unfocused');
    caret.classList.add('hidden');
}

function updateCaretPosition() {
    const words = document.querySelectorAll('.word');
    if (!words[activeWordIndex]) return;
    
    const activeWord = words[activeWordIndex];
    const letters = activeWord.querySelectorAll('letter');
    let target;
    
    if (activeCharIndex < letters.length) {
        target = letters[activeCharIndex];
        caret.style.left = target.offsetLeft + 'px';
        caret.style.top = target.offsetTop + 'px';
    } else {
        target = letters[letters.length - 1];
        caret.style.left = (target.offsetLeft + target.offsetWidth) + 'px';
        caret.style.top = target.offsetTop + 'px';
    }
    
    // Premium Auto-Scroll Mechanism
    const textDisplayArea = document.getElementById('text-display');
    const caretTop = parseInt(caret.style.top);
    
    if (caretTop > 70) { 
        // Scroll up smoothly
        textDisplayArea.style.transform = `translateY(-${caretTop - 8}px)`;
    } else {
        textDisplayArea.style.transform = `translateY(0px)`;
    }
}

// ==========================================================================
// 5. THE CORE TYPING ENGINE (Includes 100% working Backspace)
// ==========================================================================
hiddenInput.addEventListener('keydown', (e) => {
    if(!isTyping && e.key !== 'Tab') startTimer();

    const words = document.querySelectorAll('.word');
    const activeWord = words[activeWordIndex];
    if(!activeWord) return;
    const letters = activeWord.querySelectorAll('letter');

    // Handle Backspace (100% Accurate Logic)
    if (e.key === 'Backspace') {
        e.preventDefault();
        
        if (activeCharIndex > 0) {
            // Delete character in current word
            activeCharIndex--;
            const letterToRemove = letters[activeCharIndex];
            
            if (letterToRemove.classList.contains('extra')) {
                letterToRemove.remove();
                stats.extraStrokes--;
            } else {
                if(letterToRemove.classList.contains('incorrect')) stats.wrongStrokes--;
                if(letterToRemove.classList.contains('correct')) stats.correctStrokes--;
                letterToRemove.className = ''; // reset
            }
        } else if (activeWordIndex > 0) {
            // Go back to previous word
            activeWordIndex--;
            const prevWord = words[activeWordIndex];
            prevWord.classList.remove('error'); // remove error underline
            
            const prevLetters = prevWord.querySelectorAll('letter');
            activeCharIndex = prevLetters.length;
            
            // Re-adjust char index to the last typed character
            while(activeCharIndex > 0) {
                let pLetter = prevLetters[activeCharIndex - 1];
                if(!pLetter.classList.contains('correct') && !pLetter.classList.contains('incorrect') && !pLetter.classList.contains('extra')) {
                    activeCharIndex--;
                } else {
                    break;
                }
            }
        }
        updateCaretPosition();
        calculateLiveStats();
        return;
    }

    // Handle Spacebar (Next Word)
    if (e.key === ' ') {
        e.preventDefault();
        
        // Mark missed letters if word is skipped
        if(activeCharIndex < letters.length) {
            activeWord.classList.add('error');
            stats.missedStrokes += (letters.length - activeCharIndex);
        }
        
        activeWordIndex++;
        activeCharIndex = 0;
        
        if (activeWordIndex >= wordsArray.length) {
            endGame(); // Finished all text
        } else {
            updateCaretPosition();
        }
        return;
    }

    // Handle normal character typing (Ignore Meta, Ctrl, Alt keys)
    if (e.key.length === 1) {
        e.preventDefault();
        stats.totalTyped++;
        
        if (activeCharIndex < letters.length) {
            const expectedChar = letters[activeCharIndex].innerText;
            if (e.key === expectedChar) {
                letters[activeCharIndex].classList.add('correct');
                stats.correctStrokes++;
                playSound(typeSound);
            } else {
                letters[activeCharIndex].classList.add('incorrect');
                stats.wrongStrokes++;
                triggerShake();
            }
            activeCharIndex++;
        } else {
            // Extra characters typed over the word limit
            const extraTag = document.createElement('letter');
            extraTag.innerText = e.key;
            extraTag.classList.add('extra');
            activeWord.appendChild(extraTag);
            stats.extraStrokes++;
            activeCharIndex++;
            triggerShake();
        }
        
        updateCaretPosition();
        calculateLiveStats();
    }
});

function triggerShake() {
    playSound(errorSound);
    const container = document.querySelector('.typing-card');
    container.classList.remove('shake-animation');
    void container.offsetWidth; // Reflow trick
    container.classList.add('shake-animation');
}

function playSound(audioEl) {
    audioEl.currentTime = 0;
    audioEl.play().catch(()=>{});
}

// ==========================================================================
// 6. TIMER & STATISTICS CALCULATOR
// ==========================================================================
function startTimer() {
    isTyping = true;
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = formatTime(timeRemaining);
        calculateLiveStats();
        
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function calculateLiveStats() {
    const timeElapsed = (selectedTime - timeRemaining) / 60; // in minutes
    if (timeElapsed > 0) {
        // WPM = (Correct Keystrokes / 5) / Time in Minutes
        let wpm = Math.round((stats.correctStrokes / 5) / timeElapsed);
        liveWpmDisplay.innerHTML = `${Math.max(0, wpm)} <small>WPM</small>`;
    }
    
    let acc = 100;
    if (stats.totalTyped > 0) {
        acc = Math.round((stats.correctStrokes / stats.totalTyped) * 100);
    }
    liveAccDisplay.innerHTML = `${acc}<small>%</small>`;
}

function endGame() {
    clearInterval(timerInterval);
    isTyping = false;
    blurInput();
    
    const timeElapsed = (selectedTime - timeRemaining) / 60 || (selectedTime / 60);
    let finalWpm = Math.round((stats.correctStrokes / 5) / timeElapsed);
    let finalAcc = stats.totalTyped > 0 ? Math.round((stats.correctStrokes / stats.totalTyped) * 100) : 0;
    
    // Populate Results Modal
    document.getElementById('final-wpm').innerHTML = `${finalWpm} <span>WPM</span>`;
    document.getElementById('final-acc').innerHTML = `${finalAcc}<span>%</span>`;
    document.getElementById('stat-correct').innerText = stats.correctStrokes;
    document.getElementById('stat-wrong').innerText = stats.wrongStrokes + stats.extraStrokes;
    document.getElementById('stat-words').innerText = activeWordIndex;

    // Show Modal
    document.getElementById('result-modal').classList.remove('hidden');
}

// ==========================================================================
// 7. EVENT LISTENERS FOR CONTROLS
// ==========================================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault(); // Prevent default tabbing behavior
    }
    if (e.key === 'Enter' && !isTyping && document.getElementById('result-modal').classList.contains('hidden')) {
        initGame(); // Quick restart
    }
});

focusOverlay.addEventListener('click', focusInput);
document.getElementById('typing-container').addEventListener('click', focusInput);
hiddenInput.addEventListener('blur', blurInput);

document.getElementById('restart-btn').addEventListener('click', initGame);
document.getElementById('close-modal-btn').addEventListener('click', initGame);

// Config Buttons
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

// ==========================================================================
// 8. GOVERNMENT STYLE CERTIFICATE GENERATOR (High-End jsPDF)
// ==========================================================================
document.getElementById('download-cert-btn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape', 'mm', 'a4');
    
    const name = document.getElementById('student-name').value || "Registered Candidate";
    const wpm = document.getElementById('final-wpm').innerText.replace('WPM', '').trim();
    const acc = document.getElementById('final-acc').innerText.replace('%', '').trim();
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const regNo = `PRO-${today.getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    // --- 1. Draw Premium Borders ---
    doc.setLineWidth(4);
    doc.setDrawColor(37, 99, 235); // Primary Blue
    doc.rect(10, 10, 277, 190);
    
    doc.setLineWidth(1);
    doc.setDrawColor(200, 200, 200); // Inner Gray
    doc.rect(16, 16, 265, 178);

    // --- 2. Registration & Header ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Registration No: ${regNo}`, 22, 28);
    doc.text(`Govt. Verified Authenticity`, 215, 28);

    // --- 3. Institution Name & Logo (Text based) ---
    doc.setFontSize(28);
    doc.setTextColor(37, 99, 235);
    doc.text("DEPARTMENT OF DIGITAL SKILLS", 148.5, 45, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("AN INITIATIVE FOR NATIONAL IT LITERACY", 148.5, 53, { align: "center" });

    // --- 4. Main Title ---
    doc.setFont("times", "bolditalic");
    doc.setFontSize(45);
    doc.setTextColor(30, 41, 59);
    doc.text("Certificate of Typing Proficiency", 148.5, 85, { align: "center" });

    // --- 5. Certification Text ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);
    doc.text("This official document certifies that", 148.5, 105, { align: "center" });

    // --- 6. Candidate Name ---
    doc.setFont("times", "bold");
    doc.setFontSize(38);
    doc.setTextColor(37, 99, 235);
    doc.text(name.toUpperCase(), 148.5, 122, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(70, 125, 227, 125); // Underline name

    // --- 7. Achievement Details ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    doc.text(`has successfully completed the Professional Typing Examination with`, 148.5, 138, { align: "center" });

    // Highlighted Stats Box inside PDF
    doc.setDrawColor(37, 99, 235);
    doc.setFillColor(239, 246, 255); // Light blue bg
    doc.rect(85, 145, 127, 15, 'FD');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text(`Gross Speed: ${wpm} WPM   |   Accuracy: ${acc}%`, 148.5, 155, { align: "center" });

    // --- 8. Fake QR Code (Visual element) ---
    doc.setFillColor(0, 0, 0);
    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            if(Math.random() > 0.4) {
                doc.rect(22 + (i*4), 160 + (j*4), 4, 4, 'F');
            }
        }
    }
    // QR Border squares
    doc.rect(22, 160, 8, 8, 'F'); doc.rect(34, 160, 8, 8, 'F'); doc.rect(22, 172, 8, 8, 'F');
    doc.setFontSize(8); doc.text("Scan to Verify", 22, 184);

    // --- 9. Official Seal Design ---
    doc.setLineWidth(1);
    doc.setDrawColor(220, 38, 38); // Red seal
    doc.circle(148.5, 172, 12, 'S');
    doc.circle(148.5, 172, 10, 'S');
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(220, 38, 38);
    doc.text("VERIFIED", 148.5, 173.5, { align: "center" });

    // --- 10. Developer Signature (Ayan Karmakar) ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    
    // Date
    doc.line(70, 175, 110, 175);
    doc.text(`Date: ${dateStr}`, 90, 182, { align: "center" });
    
    // Signature
    doc.setFont("times", "italic");
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // Blue ink signature
    doc.text("Ayan Karmakar", 230, 172, { align: "center" }); 
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.line(190, 175, 260, 175);
    doc.text("Ayan Karmakar", 225, 182, { align: "center" });
    doc.setFontSize(9);
    doc.text("Chief Development Officer", 225, 187, { align: "center" });

    // --- 11. Trigger Download ---
    doc.save(`Govt_Verified_Typing_Certificate_${name.replace(/\s+/g, '_')}.pdf`);
});

// Start the core engine on load
window.onload = initGame;
