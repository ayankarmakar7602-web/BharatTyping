// =========================================
// 1. Word Banks (English, Bengali, Hindi)
// =========================================
const wordsData = {
    en: "the be to of and a in that have i it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us".split(" "),
    bn: "আমি তুমি সে এবং ও বা কিন্তু যদি তবে তাই কারণ জন্য থেকে হতে চেয়ে দ্বারা দিয়া কর্তৃক সহিত সাথে আছে নাই ছিল না হ্যাঁ কি কে কেন কোথায় কবে কিভাবে কেমন করে কোন কোনটি কি কি শুধু কেবল মাত্র হয়তো অবশ্য অবশ্যই বাদে ছাড়া ব্যতীত বরং তবু তথাপি সুতরাং অতএব".split(" "),
    hi: "मैं तुम वह और या लेकिन अगर तो इसलिए क्योंकि के लिए से द्वारा के साथ है नहीं था क्या कौन क्यों कहाँ कब कैसे कौन सा केवल शायद बेशक के बिना बल्कि फिर भी इसलिए".split(" ")
};

// =========================================
// 2. Global Variables & State
// =========================================
let currentLang = 'en';
let selectedTime = 180; // Default 3 mins
let timeRemaining = 180;
let timerInterval = null;
let isTyping = false;

let wordsArray = [];
let currentWordIndex = 0;
let currentCharIndex = 0;

let stats = {
    correctChars: 0,
    incorrectChars: 0,
    extraChars: 0,
    missedChars: 0,
    totalCharsTyped: 0
};

// DOM Elements
const wordsContainer = document.getElementById('words');
const hiddenInput = document.getElementById('hidden-input');
const caret = document.getElementById('caret');
const focusOverlay = document.getElementById('focus-overlay');
const typingContainer = document.getElementById('typing-container');
const timerDisplay = document.getElementById('timer');
const liveWpmDisplay = document.getElementById('live-wpm');

// Sounds
const typeSound = document.getElementById('sound-type');
const errorSound = document.getElementById('sound-error');

// =========================================
// 3. Initialization & Word Generation
// =========================================
function generateWords() {
    wordsArray = [];
    // 1 min = 50 words, 3 min = 150 words, 5 min = 250 words approx.
    let wordCount = selectedTime === 60 ? 50 : (selectedTime === 180 ? 150 : 250);
    
    let sourceWords = wordsData[currentLang];
    for (let i = 0; i < wordCount; i++) {
        let randomWord = sourceWords[Math.floor(Math.random() * sourceWords.length)];
        wordsArray.push(randomWord);
    }
}

function renderWords() {
    wordsContainer.innerHTML = '';
    wordsArray.forEach((word, wIndex) => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        word.split('').forEach(char => {
            const letterTag = document.createElement('letter');
            letterTag.innerText = char;
            wordDiv.appendChild(letterTag);
        });
        wordsContainer.appendChild(wordDiv);
    });
    
    currentWordIndex = 0;
    currentCharIndex = 0;
    updateCaretPosition();
}

function initGame() {
    clearInterval(timerInterval);
    isTyping = false;
    timeRemaining = selectedTime;
    timerDisplay.innerText = timeRemaining;
    liveWpmDisplay.classList.add('hidden');
    hiddenInput.value = '';
    
    stats = { correctChars: 0, incorrectChars: 0, extraChars: 0, missedChars: 0, totalCharsTyped: 0 };
    
    generateWords();
    renderWords();
    
    document.getElementById('typing-test').classList.remove('hidden');
    document.getElementById('results-screen').classList.add('hidden');
    
    focusInput();
}

// =========================================
// 4. Focus & Caret Logic
// =========================================
function focusInput() {
    hiddenInput.focus();
    focusOverlay.classList.add('hidden');
    wordsContainer.classList.remove('unfocused');
    caret.classList.remove('hidden');
}

function blurInput() {
    focusOverlay.classList.remove('hidden');
    wordsContainer.classList.add('unfocused');
    caret.classList.add('hidden');
}

function updateCaretPosition() {
    const activeWord = document.querySelectorAll('.word')[currentWordIndex];
    if (!activeWord) return;
    
    const letters = activeWord.querySelectorAll('letter');
    let target;
    
    if (currentCharIndex < letters.length) {
        target = letters[currentCharIndex];
        caret.style.left = target.offsetLeft + 'px';
        caret.style.top = target.offsetTop + 'px';
    } else {
        target = letters[letters.length - 1];
        caret.style.left = (target.offsetLeft + target.offsetWidth) + 'px';
        caret.style.top = target.offsetTop + 'px';
    }
    
    // Auto-scroll words wrapper if caret goes out of view
    const wordsWrapper = document.getElementById('words-wrapper');
    if (target.offsetTop > wordsWrapper.scrollTop + wordsWrapper.clientHeight - 40) {
        wordsWrapper.scrollTop = target.offsetTop - 40;
    } else if (target.offsetTop < wordsWrapper.scrollTop) {
        wordsWrapper.scrollTop = target.offsetTop;
    }
}

// =========================================
// 5. Typing Logic (The Core)
// =========================================
hiddenInput.addEventListener('input', (e) => {
    if (!isTyping) startTimer();
    
    const inputVal = hiddenInput.value;
    const inputChar = inputVal[inputVal.length - 1];
    hiddenInput.value = ''; // Reset hidden input
    
    const words = document.querySelectorAll('.word');
    const activeWord = words[currentWordIndex];
    const letters = activeWord.querySelectorAll('letter');
    
    // Backspace Handling
    if (e.inputType === 'deleteContentBackward') {
        if (currentCharIndex > 0) {
            currentCharIndex--;
            let letterToRevert = letters[currentCharIndex];
            
            if (letterToRevert.classList.contains('extra')) {
                letterToRevert.remove(); // Remove extra character
            } else {
                letterToRevert.classList.remove('correct', 'incorrect');
            }
        } else if (currentWordIndex > 0) {
            // Move to previous word if not fully correct
            currentWordIndex--;
            const prevWord = words[currentWordIndex];
            const prevLetters = prevWord.querySelectorAll('letter');
            currentCharIndex = prevLetters.length;
            while(currentCharIndex > 0 && (prevLetters[currentCharIndex-1].classList.contains('extra') || !prevLetters[currentCharIndex-1].classList.contains('correct') && !prevLetters[currentCharIndex-1].classList.contains('incorrect'))) {
                currentCharIndex--;
            }
        }
        updateCaretPosition();
        return;
    }

    // Spacebar Handling (Next Word)
    if (inputChar === ' ') {
        // Mark missed letters
        if(currentCharIndex < letters.length) {
            for(let i = currentCharIndex; i < letters.length; i++) {
                stats.missedChars++;
            }
            activeWord.classList.add('error'); // Underline wrong word
        }
        
        currentWordIndex++;
        currentCharIndex = 0;
        
        if (currentWordIndex >= wordsArray.length) {
            endGame(); // Finished all words early
        } else {
            updateCaretPosition();
        }
        return;
    }

    // Normal Character Typing
    if (inputChar) {
        stats.totalCharsTyped++;
        
        if (currentCharIndex < letters.length) {
            // Checking actual letters
            const expectedChar = letters[currentCharIndex].innerText;
            if (inputChar === expectedChar) {
                letters[currentCharIndex].classList.add('correct');
                stats.correctChars++;
                playSound(typeSound);
            } else {
                letters[currentCharIndex].classList.add('incorrect');
                stats.incorrectChars++;
                triggerError();
            }
            currentCharIndex++;
        } else {
            // Typing extra characters
            const extraTag = document.createElement('letter');
            extraTag.innerText = inputChar;
            extraTag.classList.add('extra');
            activeWord.appendChild(extraTag);
            stats.extraChars++;
            currentCharIndex++;
            triggerError();
        }
        updateCaretPosition();
        calculateLiveWPM();
    }
});

function triggerError() {
    playSound(errorSound);
    typingContainer.classList.remove('shake');
    void typingContainer.offsetWidth; // Trigger reflow
    typingContainer.classList.add('shake');
}

function playSound(audioEl) {
    audioEl.currentTime = 0;
    audioEl.play().catch(e => {}); // Catch error if browser blocks autoplay
}

// =========================================
// 6. Timer & Stats
// =========================================
function startTimer() {
    isTyping = true;
    liveWpmDisplay.classList.remove('hidden');
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = timeRemaining;
        calculateLiveWPM();
        
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function calculateLiveWPM() {
    const timeElapsed = (selectedTime - timeRemaining) / 60; // in minutes
    if (timeElapsed > 0) {
        let wpm = Math.round((stats.correctChars / 5) / timeElapsed);
        liveWpmDisplay.innerText = `${Math.max(0, wpm)} wpm`;
    }
}

function endGame() {
    clearInterval(timerInterval);
    isTyping = false;
    blurInput();
    
    const timeElapsed = (selectedTime - timeRemaining) / 60;
    let finalWpm = Math.round((stats.correctChars / 5) / (selectedTime / 60)); // Total time based WPM
    let finalAcc = Math.round((stats.correctChars / (stats.totalCharsTyped || 1)) * 100);
    
    // Show Results UI
    document.getElementById('typing-test').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');
    
    document.getElementById('res-wpm').innerText = finalWpm;
    document.getElementById('res-acc').innerText = `${finalAcc}%`;
    document.getElementById('res-test-type').innerText = `time ${selectedTime}s`;
    document.getElementById('res-chars').innerText = `${stats.correctChars}/${stats.incorrectChars}/${stats.extraChars}/${stats.missedChars}`;
    document.getElementById('res-time').innerText = `${selectedTime - timeRemaining}s`;
}

// =========================================
// 7. Event Listeners for UI
// =========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.ctrlKey) {
        e.preventDefault();
        initGame();
    }
});

typingContainer.addEventListener('click', focusInput);
focusOverlay.addEventListener('click', focusInput);
hiddenInput.addEventListener('blur', blurInput);

document.getElementById('restart-btn').addEventListener('click', initGame);
document.getElementById('next-test-btn').addEventListener('click', initGame);
document.getElementById('try-again-btn')?.addEventListener('click', initGame);

// Config Buttons Logic
document.querySelectorAll('.config-lang .text-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.config-lang .text-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentLang = e.target.getAttribute('data-lang');
        initGame();
    });
});

document.querySelectorAll('.config-time .text-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.config-time .text-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        selectedTime = parseInt(e.target.getAttribute('data-time'));
        initGame();
    });
});

// =========================================
// 8. Professional Certificate Generation (jsPDF)
// =========================================
document.getElementById('download-cert-btn').addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape', 'mm', 'a4'); // Horizontal A4 size
    
    const name = document.getElementById('cert-name').value || "Pro Typist";
    const wpm = document.getElementById('res-wpm').innerText;
    const acc = document.getElementById('res-acc').innerText;
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    // 1. Draw Outer & Inner Borders
    doc.setLineWidth(3);
    doc.setDrawColor(226, 183, 20); // Golden Border
    doc.rect(10, 10, 277, 190); 
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(100, 100, 100);
    doc.rect(14, 14, 269, 182);

    // 2. Add Logo / Top Heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(50, 52, 55);
    doc.text("PRO TYPING MASTER", 148.5, 35, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("An Institute of Digital Skills & Speed", 148.5, 42, { align: "center" });

    // 3. Certificate Title
    doc.setFont("times", "bolditalic");
    doc.setFontSize(40);
    doc.setTextColor(226, 183, 20); // Golden
    doc.text("Certificate of Achievement", 148.5, 75, { align: "center" });

    // 4. Body Text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(50, 52, 55);
    doc.text("This is proudly presented to", 148.5, 95, { align: "center" });

    // 5. User Name
    doc.setFont("times", "bold");
    doc.setFontSize(35);
    doc.setTextColor(0, 0, 0);
    // Line under name
    doc.line(70, 112, 227, 112);
    doc.text(name.toUpperCase(), 148.5, 110, { align: "center" });

    // 6. Achievement Details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`For successfully passing the Professional Typing Test with an exceptional speed`, 148.5, 125, { align: "center" });
    
    // Bold Stats
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(226, 183, 20);
    doc.text(`Typing Speed: ${wpm} WPM   |   Accuracy: ${acc}`, 148.5, 138, { align: "center" });

    // 7. Footer (Date, Signatures, Seal)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Date
    doc.line(40, 175, 100, 175);
    doc.text(`Date: ${date}`, 70, 182, { align: "center" });
    
    // Signature
    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.text("Ayan Karmakar", 227, 172, { align: "center" }); // Fake Signature Look
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(197, 175, 257, 175);
    doc.text("Ayan Karmakar, Director", 227, 182, { align: "center" });

    // Save PDF
    doc.save(`Pro_Typing_Certificate_${name.replace(/\s+/g, '_')}.pdf`);
});

// Start game on load
window.onload = initGame;
