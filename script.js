// ==========================================================================
// 1. PREMIUM TEXT DATABASE (Meaningful, Long Paragraphs)
// ==========================================================================
const textDatabase = {
    en: [
        "Technology is the application of scientific knowledge for practical purposes, especially in industry. It has completely transformed the way we communicate, work, and live our daily lives. The evolution of the internet has brought the world closer, making information accessible at our fingertips.",
        "Nature refers to the physical world and everything in it, such as plants, animals, mountains, oceans, and stars. The beauty of nature is unmatched, offering a sense of peace and tranquility. Protecting our environment is essential to maintain the delicate balance of our ecosystem for future generations.",
        "Success is not something that happens overnight. It requires hard work, dedication, and a positive mindset. Every failure is a stepping stone towards achieving your goals. Never give up on your dreams, no matter how difficult the journey may seem. Consistency is the ultimate key to unlocking your true potential.",
        "Artificial Intelligence is rapidly changing the landscape of modern industries. From self-driving cars to virtual assistants, machines are becoming smarter every day. However, human creativity and emotional intelligence remain irreplaceable assets in the workforce.",
        "Reading books is one of the best habits a person can develop. It not only expands your vocabulary but also broadens your perspective on various aspects of life. A good book can transport you to an entirely different world, allowing you to experience a thousand lives in one."
    ],
    bn: [
        "প্রযুক্তি হলো ব্যবহারিক উদ্দেশ্যে বৈজ্ঞানিক জ্ঞানের প্রয়োগ। এটি আমাদের যোগাযোগ, কাজ এবং দৈনন্দিন জীবনযাপনের পদ্ধতিকে পুরোপুরি বদলে দিয়েছে। ইন্টারনেটের বিবর্তন বিশ্বকে আরও কাছাকাছি নিয়ে এসেছে, যার ফলে যেকোনো তথ্য এখন আমাদের হাতের মুঠোয়।",
        "প্রকৃতি বলতে ভৌত জগত এবং এর ভেতরের সবকিছুকে বোঝায়, যেমন গাছপালা, প্রাণী, পাহাড় এবং মহাসাগর। প্রকৃতির সৌন্দর্য তুলনাহীন, যা আমাদের মনে এক অদ্ভুত প্রশান্তি এনে দেয়। ভবিষ্যৎ প্রজন্মের জন্য বাস্তুতন্ত্রের ভারসাম্য বজায় রাখতে পরিবেশ রক্ষা করা অত্যন্ত জরুরি।",
        "সাফল্য এমন কিছু নয় যা রাতারাতি ঘটে যায়। এর জন্য প্রয়োজন কঠোর পরিশ্রম, নিষ্ঠা এবং ইতিবাচক মানসিকতা। প্রতিটি ব্যর্থতা আপনার লক্ষ্য অর্জনের পথে একটি গুরুত্বপূর্ণ পদক্ষেপ। যাত্রা যতই কঠিন হোক না কেন, কখনোই নিজের স্বপ্নের হাল ছাড়বেন না।",
        "কৃত্রিম বুদ্ধিমত্তা দ্রুত আধুনিক শিল্পের রূপরেখা পরিবর্তন করছে। স্বয়ংক্রিয় গাড়ি থেকে শুরু করে ভার্চুয়াল সহকারী পর্যন্ত, মেশিনগুলো প্রতিনিয়ত আরও স্মার্ট হচ্ছে। তবে মানবীয় সৃজনশীলতা এবং আবেগীয় বুদ্ধিমত্তা কর্মক্ষেত্রে সর্বদা অমূল্য সম্পদ হিসেবে থেকে যাবে।",
        "বই পড়ার অভ্যাস একজন মানুষের শ্রেষ্ঠ গুণগুলোর মধ্যে অন্যতম। এটি কেবল শব্দভাণ্ডারই বাড়ায় না, বরং জীবনের বিভিন্ন দিক সম্পর্কে দৃষ্টিভঙ্গিও প্রসারিত করে। একটি ভালো বই আপনাকে সম্পূর্ণ ভিন্ন এক জগতে নিয়ে যেতে পারে।"
    ],
    hi: [
        "प्रौद्योगिकी व्यावहारिक उद्देश्यों के लिए वैज्ञानिक ज्ञान का अनुप्रयोग है। इसने हमारे संवाद करने, काम करने और दैनिक जीवन जीने के तरीके को पूरी तरह से बदल दिया है। इंटरनेट के विकास ने दुनिया को करीब ला दिया है, जिससे जानकारी हमारी उंगलियों पर सुलभ हो गई है।",
        "प्रकृति भौतिक दुनिया और उसमें मौजूद हर चीज को संदर्भित करती है, जैसे पौधे, जानवर, पहाड़ और महासागर। प्रकृति की सुंदरता बेजोड़ है, जो शांति और सुकून का अहसास कराती है। आने वाली पीढ़ियों के लिए पारिस्थितिकी तंत्र के संतुलन को बनाए रखने के लिए पर्यावरण की रक्षा करना आवश्यक है।",
        "सफलता कोई ऐसी चीज नहीं है जो रातों-रात मिल जाती है। इसके लिए कड़ी मेहनत, समर्पण और सकारात्मक मानसिकता की आवश्यकता होती है। हर असफलता आपके लक्ष्यों को प्राप्त करने की दिशा में एक कदम है। यात्रा चाहे कितनी भी कठिन क्यों न लगे, अपने सपनों को कभी न छोड़ें।",
        "कृत्रिम बुद्धिमत्ता तेजी से आधुनिक उद्योगों के परिदृश्य को बदल रही है। स्वचालित कारों से लेकर आभासी सहायकों तक, मशीनें हर दिन होशियार होती जा रही हैं। हालांकि, मानव रचनात्मकता और भावनात्मक बुद्धिमत्ता कार्यबल में अपूरणीय संपत्ति बनी हुई है।",
        "किताबें पढ़ने की आदत किसी व्यक्ति में विकसित होने वाली सबसे अच्छी आदतों में से एक है। यह न केवल आपकी शब्दावली का विस्तार करता है बल्कि जीवन के विभिन्न पहलुओं पर आपके दृष्टिकोण को भी व्यापक बनाता है। एक अच्छी किताब आपको पूरी तरह से अलग दुनिया में ले जा सकती है।"
    ]
};

// ==========================================================================
// 2. GLOBAL STATE VARIABLES
// ==========================================================================
let currentLang = 'en';
let selectedDuration = 180; // Default 3 mins
let timeLeft = 180;
let timerId = null;
let isGameActive = false;

let wordsList = [];
let activeWordIndex = 0;
let stats = { correctChars: 0, wrongChars: 0, totalTyped: 0 };

// DOM Elements
const paragraphDisplay = document.getElementById('paragraph-display');
const typeInput = document.getElementById('type-input');
const focusScreen = document.getElementById('focus-screen');
const liveWpm = document.getElementById('live-wpm');
const liveAcc = document.getElementById('live-acc');
const timerDisplay = document.getElementById('timer');
const resultModal = document.getElementById('result-modal');

// Audio setup
const audioType = document.getElementById('audio-type');
const audioError = document.getElementById('audio-error');

// ==========================================================================
// 3. TEXT GENERATION & RENDERING
// ==========================================================================
function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

function generateParagraph() {
    // Get paragraphs, shuffle them to avoid repetition
    let rawParagraphs = shuffleArray(textDatabase[currentLang]);
    let fullText = rawParagraphs.join(" ");
    
    // If selected time is 5 minutes, duplicate text to ensure it never runs out
    while(fullText.split(" ").length < 400) {
        fullText += " " + shuffleArray(textDatabase[currentLang]).join(" ");
    }

    let allWords = fullText.split(/\s+/);
    
    // Decide array size based on time (1 min = ~60 words, 3 min = ~160, 5 min = ~280)
    let wordLimit = selectedDuration === 60 ? 60 : (selectedDuration === 180 ? 160 : 280);
    wordsList = allWords.slice(0, wordLimit);
}

function renderParagraph() {
    paragraphDisplay.innerHTML = '';
    wordsList.forEach(word => {
        const span = document.createElement('div');
        span.className = 'word';
        span.innerHTML = `<span class="untyped">${word}</span>`;
        paragraphDisplay.appendChild(span);
    });
    activeWordIndex = 0;
    updateVisuals();
}

function formatTime(sec) {
    let m = Math.floor(sec / 60);
    let s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// ==========================================================================
// 4. GAME INITIALIZATION & FOCUS
// ==========================================================================
function startNewGame() {
    clearInterval(timerId);
    isGameActive = false;
    timeLeft = selectedDuration;
    timerDisplay.innerText = formatTime(timeLeft);
    liveWpm.innerHTML = `0 <small>WPM</small>`;
    liveAcc.innerHTML = `100<small>%</small>`;
    typeInput.value = '';
    
    stats = { correctChars: 0, wrongChars: 0, totalTyped: 0 };
    resultModal.classList.add('hidden');
    
    generateParagraph();
    renderParagraph();
    requestFocus();
}

function requestFocus() {
    typeInput.focus();
    focusScreen.style.opacity = '0';
    setTimeout(() => focusScreen.style.display = 'none', 300);
    paragraphDisplay.classList.remove('unfocused');
}

function looseFocus() {
    focusScreen.style.display = 'flex';
    setTimeout(() => focusScreen.style.opacity = '1', 10);
    paragraphDisplay.classList.add('unfocused');
}

// ==========================================================================
// 5. CORE TYPING ENGINE (Protects Conjuncts using String Matching)
// ==========================================================================
typeInput.addEventListener('input', (e) => {
    if(!isGameActive) startTimer();

    let typedText = typeInput.value;

    // Handle Space (Move to next word)
    if (typedText.endsWith(' ')) {
        let typedWord = typedText.trim();
        let targetWord = wordsList[activeWordIndex];
        let currentWordEl = document.querySelectorAll('.word')[activeWordIndex];

        if (typedWord !== targetWord) {
            currentWordEl.classList.add('error'); // Underline red if wrong
            stats.wrongChars += Math.abs(targetWord.length - typedWord.length);
        } else {
            stats.correctChars += targetWord.length;
        }

        activeWordIndex++;
        typeInput.value = ''; // Reset input for next word
        
        if (activeWordIndex >= wordsList.length) {
            endGame(); // Finished the whole paragraph early
        } else {
            updateVisuals();
            playSound(audioType);
        }
        return;
    }

    // Update visuals while typing the current word
    updateVisuals();
    calculateLiveStats();
});

// Update Green/Red Highlights cleanly without breaking Bengali Fonts
function updateVisuals() {
    const wordEls = document.querySelectorAll('.word');
    wordEls.forEach(el => el.classList.remove('active'));
    
    if(!wordEls[activeWordIndex]) return;
    const activeEl = wordEls[activeWordIndex];
    activeEl.classList.add('active');

    const target = wordsList[activeWordIndex];
    const typed = typeInput.value;

    // Find matching prefix
    let matchLen = 0;
    for(let i = 0; i < typed.length; i++) {
        if(typed[i] === target[i]) matchLen++;
        else break;
    }

    const correctStr = typed.substring(0, matchLen);
    const wrongStr = typed.substring(matchLen);
    const untypedStr = target.substring(matchLen + wrongStr.length) || "";

    // Generate HTML safely
    let html = "";
    if (correctStr) html += `<span class="correct">${correctStr}</span>`;
    if (wrongStr) {
        html += `<span class="incorrect">${wrongStr}</span>`;
        // Play error sound and shake if user just typed a wrong letter
        if (!activeEl.classList.contains('shake-it')) triggerShake(activeEl);
    }
    if (untypedStr) html += `<span class="untyped">${untypedStr}</span>`;

    activeEl.innerHTML = html;
}

function triggerShake(element) {
    playSound(audioError);
    element.classList.remove('shake-it');
    void element.offsetWidth; // Reflow
    element.classList.add('shake-it');
}

function playSound(audio) {
    audio.currentTime = 0;
    audio.play().catch(()=>{});
}

// ==========================================================================
// 6. TIMER & STATISTICS
// ==========================================================================
function startTimer() {
    isGameActive = true;
    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);
        calculateLiveStats();
        
        if (timeLeft <= 0) {
            endGame(); // Stop exactly when time is 0
        }
    }, 1000);
}

function calculateLiveStats() {
    // WPM = (Total Correct Chars / 5) / Time Elapsed in Mins
    let timeElapsed = (selectedDuration - timeLeft) / 60;
    let currentCorrect = document.querySelectorAll('.word .correct').length;
    let totalCorrect = stats.correctChars + currentCorrect;

    if (timeElapsed > 0) {
        let wpm = Math.round((totalCorrect / 5) / timeElapsed);
        liveWpm.innerHTML = `${Math.max(0, wpm)} <small>WPM</small>`;
    }

    // Approximation of total typed for live accuracy
    stats.totalTyped = totalCorrect + stats.wrongChars + document.querySelectorAll('.word .incorrect').length;
    let acc = stats.totalTyped > 0 ? Math.round((totalCorrect / stats.totalTyped) * 100) : 100;
    liveAcc.innerHTML = `${Math.min(100, Math.max(0, acc))}<small>%</small>`;
}

function endGame() {
    clearInterval(timerId);
    isGameActive = false;
    typeInput.blur();
    
    let timeElapsedMins = selectedDuration / 60;
    let finalCorrect = stats.correctChars + document.querySelectorAll('.word .correct').length;
    let finalWrong = stats.wrongChars + document.querySelectorAll('.word .incorrect').length;
    let totalChars = finalCorrect + finalWrong;

    let finalWpm = Math.round((finalCorrect / 5) / timeElapsedMins);
    let finalAcc = totalChars > 0 ? Math.round((finalCorrect / totalChars) * 100) : 0;

    // Set Modal Values
    document.getElementById('res-wpm').innerHTML = `${finalWpm} <span>WPM</span>`;
    document.getElementById('res-acc').innerHTML = `${finalAcc}<span>%</span>`;
    document.getElementById('res-correct').innerText = finalCorrect;
    document.getElementById('res-wrong').innerText = finalWrong;
    document.getElementById('res-words').innerText = activeWordIndex;

    // Show Modal immediately
    resultModal.classList.remove('hidden');
}

// ==========================================================================
// 7. EVENT LISTENERS
// ==========================================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') e.preventDefault();
    if (e.key === 'Enter' && !isGameActive && resultModal.classList.contains('hidden')) startNewGame();
});

focusScreen.addEventListener('click', requestFocus);
document.querySelector('.typing-board').addEventListener('click', requestFocus);
typeInput.addEventListener('blur', looseFocus);

document.getElementById('btn-restart').addEventListener('click', startNewGame);
document.getElementById('btn-try-again').addEventListener('click', startNewGame);

// UI Config Listeners
document.querySelectorAll('#lang-selector .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#lang-selector .opt-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentLang = e.target.getAttribute('data-lang');
        startNewGame();
    });
});

document.querySelectorAll('#time-selector .opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('#time-selector .opt-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        selectedDuration = parseInt(e.target.getAttribute('data-time'));
        startNewGame();
    });
});

// ==========================================================================
// 8. PROFESSIONAL A4 CERTIFICATE GENERATION (Landscape)
// ==========================================================================
document.getElementById('btn-download-cert').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    // A4 Landscape is 297mm x 210mm
    const doc = new jsPDF('landscape', 'mm', 'a4'); 
    
    const candidateName = document.getElementById('candidate-name').value || "Registered Candidate";
    const wpmScore = document.getElementById('res-wpm').innerText.replace('WPM', '').trim();
    const accScore = document.getElementById('res-acc').innerText.replace('%', '').trim();
    const examDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const refID = `BT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // --- Borders ---
    doc.setLineWidth(5);
    doc.setDrawColor(37, 99, 235); // BharatTyping Blue
    doc.rect(10, 10, 277, 190);
    doc.setLineWidth(1);
    doc.setDrawColor(50, 50, 50);
    doc.rect(17, 17, 263, 176);

    // --- Top Header ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Reference ID: ${refID}`, 22, 30);
    doc.text(`Verified by BharatTyping Assessment System`, 270, 30, { align: 'right' });

    // --- Main Institution ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.setTextColor(37, 99, 235);
    doc.text("BHARAT TYPING OFFICIAL", 148.5, 50, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text("National Digital Skill Certification Program", 148.5, 60, { align: "center" });

    // --- Title ---
    doc.setFont("times", "bolditalic");
    doc.setFontSize(48);
    doc.setTextColor(20, 30, 40);
    doc.text("Certificate of Excellence", 148.5, 90, { align: "center" });

    // --- Body Text ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(50, 50, 50);
    doc.text("This prestigious document is awarded to", 148.5, 110, { align: "center" });

    // --- Candidate Name ---
    doc.setFont("times", "bold");
    doc.setFontSize(40);
    doc.setTextColor(37, 99, 235);
    doc.text(candidateName.toUpperCase(), 148.5, 128, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(70, 132, 227, 132); // Underline

    // --- Achievement Statement ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);
    doc.text("for successfully demonstrating exceptional typing proficiency with", 148.5, 145, { align: "center" });

    // --- Scores Highlight ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); // Green tint
    doc.text(`Gross Speed: ${wpmScore} WPM     |     Accuracy: ${accScore}%`, 148.5, 158, { align: "center" });

    // --- Bottom Section (Date & Signature) ---
    doc.setTextColor(0, 0, 0);
    
    // Date
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Date of Examination:`, 40, 175);
    doc.setFont("helvetica", "bold");
    doc.text(examDate, 40, 182);

    // Seal
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(1.5);
    doc.circle(148.5, 178, 12, 'S');
    doc.setFontSize(9);
    doc.setTextColor(220, 38, 38);
    doc.text("VERIFIED", 148.5, 179.5, { align: "center" });

    // Signature (Ayan Karmakar)
    doc.setFont("times", "italic");
    doc.setFontSize(26);
    doc.setTextColor(37, 99, 235); // Signature Blue
    doc.text("Ayan Karmakar", 250, 175, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.line(210, 178, 290, 178);
    doc.text("Ayan Karmakar", 250, 184, { align: "center" });
    doc.setFontSize(10);
    doc.text("Founder & Lead Developer", 250, 189, { align: "center" });

    // Save PDF
    doc.save(`BharatTyping_A4_Certificate_${candidateName.replace(/\s+/g, '_')}.pdf`);
});

// Start the game on initial load
window.onload = startNewGame;
