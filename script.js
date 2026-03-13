const texts = {
    english: [
        "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra.",
        "Practice makes a man perfect, especially when it comes to typing speed and accuracy.",
        "Technology is best when it brings people together and makes lives easier."
    ],
    bengali: [
        "ভারতবর্ষ আমাদের মাতৃভূমি। এদেশের বৈচিত্র্যের মধ্যে ঐক্যই আমাদের প্রধান শক্তি।",
        "টাইপিং প্র্যাকটিস করলে হাতের স্পিড বাড়ে এবং কাজের গতি অনেক উন্নত হয়।",
        "সুন্দরবন পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন যা পশ্চিমবঙ্গ ও বাংলাদেশে অবস্থিত।"
    ],
    hindi: [
        "भारत एक बहुत बड़ा और सुंदर देश है। यहाँ कई भाषाएँ बोली जाती हैं।",
        "निरंतर अभ्यास ही सफलता का एकमात्र मार्ग है। मेहनत कभी बेकार नहीं जाती।",
        "कंप्यूटर आज के युग की सबसे बड़ी जरूरत बन गया है।"
    ]
};

let selectedLang = 'english', timeLeft = 60, totalTime = 60, timer = null;
let charIdx = 0, mistakes = 0, started = false;

const hiddenInput = document.getElementById('hidden-input');
const textDisplay = document.getElementById('text-display');

function showLanguageMenu() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('language-menu').classList.remove('hidden');
}

function selectLanguage(lang) {
    selectedLang = lang;
    document.getElementById('language-menu').classList.add('hidden');
    document.getElementById('timer-menu').classList.remove('hidden');
}

function startApp(min) {
    totalTime = min * 60; timeLeft = totalTime;
    document.getElementById('timer-menu').classList.add('hidden');
    document.getElementById('typing-screen').classList.remove('hidden');
    renderText();
}

function renderText() {
    const list = texts[selectedLang];
    const quote = list[Math.floor(Math.random() * list.length)];
    textDisplay.innerHTML = quote.split('').map(char => `<span>${char}</span>`).join('');
    textDisplay.firstChild.classList.add('char-current');
    hiddenInput.value = "";
    charIdx = 0; mistakes = 0; started = false;
    document.addEventListener('keydown', () => hiddenInput.focus());
}

hiddenInput.addEventListener('input', () => {
    if (!started) { startTimer(); started = true; }
    const spans = textDisplay.querySelectorAll('span');
    const typed = hiddenInput.value.split('');
    const lastChar = typed[charIdx];

    if (charIdx < spans.length) {
        if (lastChar == spans[charIdx].innerText) {
            spans[charIdx].className = 'char-correct';
            document.getElementById('key-sound').cloneNode(true).play();
        } else {
            spans[charIdx].className = 'char-wrong';
            mistakes++;
            document.getElementById('error-sound').cloneNode(true).play();
        }
        charIdx++;
        if (charIdx < spans.length) spans[charIdx].classList.add('char-current');
        updateStats();
    }
    if (charIdx === spans.length) finish();
});

function updateStats() {
    let wpm = Math.round(((charIdx - mistakes) / 5) / ((totalTime - timeLeft) / 60 || 1));
    document.getElementById('wpm').innerText = wpm > 0 ? wpm : 0;
    let acc = Math.round(((charIdx - mistakes) / charIdx) * 100);
    document.getElementById('accuracy').innerText = (acc || 100) + "%";
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            let m = Math.floor(timeLeft / 60), s = timeLeft % 60;
            document.getElementById('timer').innerText = `${m}:${s < 10 ? '0'+s : s}`;
        } else { finish(); }
    }, 1000);
}

function finish() {
    clearInterval(timer);
    document.getElementById('typing-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-wpm').innerText = document.getElementById('wpm').innerText;
    document.getElementById('final-accuracy').innerText = document.getElementById('accuracy').innerText.replace('%','');
}

function generateCertificate() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFillColor(30, 41, 59); doc.rect(0, 0, 297, 210, 'F');
    doc.setTextColor(251, 146, 60); doc.setFontSize(40); doc.text("BharatTyping Certificate", 148, 60, {align:'center'});
    doc.setTextColor(255, 255, 255); doc.setFontSize(20); doc.text("Performance Result", 148, 90, {align:'center'});
    doc.setFontSize(30); doc.text(`Speed: ${document.getElementById('final-wpm').innerText} WPM`, 148, 120, {align:'center'});
    doc.text(`Accuracy: ${document.getElementById('final-accuracy').innerText}%`, 148, 140, {align:'center'});
    doc.save('certificate.pdf');
}

function goBack(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}
