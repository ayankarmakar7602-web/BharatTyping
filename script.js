const DB = {
    english: [
        "In the world of technology, speed is efficiency. (High-speed) typing is a skill! @2026 #Coding; Can you type 100% correctly? {Success} is near.",
        "A quick brown fox jumps over the lazy dog. 1234567890! Symbols like #, $, %, &, *, (, ), _, +, [, ], {, }, |, \, :, ;, \", ', <, >, ?, /, , . are essential for pro typing.",
        "Computer programming is the process of designing and building an executable computer program to accomplish a specific computing result."
    ],
    bengali: [
        "          #! ' '   ()    !",
        "         @Ayan;         ?   "
    ]
};

let lang = 'english', time = 60, timer = null, idx = 0, mistakes = 0, active = false;
let currentText = "";

function setLang(l) { lang = l; goBack('time-screen'); }

function startApp(m) {
    time = m * 60;
    goBack('typing-screen');
    render();
}

function render() {
    const list = DB[lang];
    currentText = list[Math.floor(Math.random() * list.length)]; // Random Paragraph
    document.getElementById('text-display').innerHTML = currentText.split('').map(c => `<span>${c}</span>`).join('');
    document.getElementById('text-display').children[0].classList.add('current');
    document.getElementById('master-input').value = "";
    idx = 0; mistakes = 0; active = false;
    setTimeout(() => document.getElementById('master-input').focus(), 500);
}

function focusInput() { document.getElementById('master-input').focus(); }

document.getElementById('master-input').addEventListener('input', (e) => {
    if (!active) startTimer();
    const spans = document.getElementById('text-display').querySelectorAll('span');
    const typed = document.getElementById('master-input').value.split('');

    if (e.inputType === "deleteContentBackward") {
        if (idx > 0) {
            idx--;
            spans[idx].className = '';
        }
    } else {
        const char = typed[typed.length - 1];
        if (idx < spans.length) {
            if (char === spans[idx].innerText) {
                spans[idx].className = 'correct';
                new Audio(document.getElementById('sfx-key').src).play();
            } else {
                spans[idx].className = 'wrong';
                mistakes++;
                new Audio(document.getElementById('sfx-error').src).play();
            }
            idx++;
        }
    }

    spans.forEach(s => s.classList.remove('current'));
    if (spans[idx]) spans[idx].classList.add('current');
    
    // Auto-scroll if text is long
    if(idx > 20) spans[idx].scrollIntoView({behavior: "smooth", block: "center"});
    
    updateStats();
    if (idx === spans.length) end();
});

function startTimer() {
    active = true;
    let left = time;
    timer = setInterval(() => {
        left--;
        let m = Math.floor(left/60), s = left%60;
        document.getElementById('timer').innerText = `${m}:${s<10?'0'+s:s}`;
        if (left <= 0) end();
    }, 1000);
}

function updateStats() {
    let wpm = Math.round((idx / 5) / ((time - getLeftTime()) / 60) || 0);
    document.getElementById('wpm').innerText = wpm;
    document.getElementById('acc').innerText = Math.round(((idx - mistakes) / idx) * 100 || 100) + "%";
}

function getLeftTime() {
    const t = document.getElementById('timer').innerText.split(':');
    return parseInt(t[0]) * 60 + parseInt(t[1]);
}

function end() {
    clearInterval(timer);
    goBack('result-screen');
    document.getElementById('res-wpm').innerText = document.getElementById('wpm').innerText;
    document.getElementById('res-acc').innerText = document.getElementById('acc').innerText.replace('%','');
}

function prepareCertificate() {
    const name = document.getElementById('user-name').value;
    if (!name) { alert("Please enter your name first!"); return; }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');

    // Design
    doc.setDrawColor(212, 175, 55); doc.setLineWidth(5); doc.rect(5, 5, 287, 200); // Border
    doc.setLineWidth(1); doc.rect(10, 10, 277, 190); 

    // Header
    doc.setFont("Cinzel", "bold"); doc.setFontSize(40); doc.setTextColor(184, 134, 11);
    doc.text("CERTIFICATE OF ACHIEVEMENT", 148, 40, {align: 'center'});

    doc.setFont("Poppins", "normal"); doc.setFontSize(15); doc.setTextColor(0);
    doc.text("This is to certify that", 148, 60, {align: 'center'});

    // User Name
    doc.setFont("Dancing Script", "bold"); doc.setFontSize(50); doc.setTextColor(0);
    doc.text(name, 148, 85, {align: 'center'});

    // Body
    doc.setFont("Poppins", "normal"); doc.setFontSize(18);
    doc.text("has successfully completed the Professional Typing Speed Test", 148, 110, {align: 'center'});
    doc.text(`with an impressive speed of ${document.getElementById('res-wpm').innerText} WPM`, 148, 125, {align: 'center'});
    doc.text(`and an Accuracy of ${document.getElementById('res-acc').innerText}%`, 148, 135, {align: 'center'});

    // Signatures
    doc.setDrawColor(0); doc.line(50, 170, 110, 170); doc.line(180, 170, 240, 170);
    doc.setFont("Dancing Script", "bold"); doc.setFontSize(20);
    doc.text("Ayan Karmakar", 80, 165, {align: 'center'}); 
    doc.text("BharatTyping Org.", 210, 165, {align: 'center'});

    doc.setFont("Poppins", "bold"); doc.setFontSize(12);
    doc.text("CEO & Founder", 80, 175, {align: 'center'});
    doc.text("Authorized Signatory", 210, 175, {align: 'center'});

    doc.save(`${name}_Typing_Certificate.pdf`);
}

function goBack(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}
