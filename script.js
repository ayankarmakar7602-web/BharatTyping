const DB = {
    english: ["India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area and the most populous country in the world. Bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast, it shares land borders with Pakistan to the west; China, Nepal, and Bhutan to the north; and Bangladesh and Myanmar to the east. India has been a federal republic since 1950, governed through a democratic parliamentary system. It is a pluralistic, multilingual and multi-ethnic society. India's economy is the world's fifth-largest by nominal GDP and third-largest by purchasing power parity. The country has a rich history, from ancient Indus Valley Civilizations to the modern technological powerhouse it is today."],
    bengali: ["ভারতবর্ষ বিশ্বের অন্যতম প্রাচীন ও বৈচিত্র্যময় দেশ। হিমালয়ের পাদদেশ থেকে ভারত মহাসাগরের উপকূল পর্যন্ত বিস্তৃত এই ভূখণ্ড তার সমৃদ্ধ সংস্কৃতি ও ঐতিহ্যের জন্য পরিচিত। এদেশের স্বাধীনতা সংগ্রাম ছিল ত্যাগের এক মহাকাব্য। রবীন্দ্রনাথ ঠাকুর থেকে শুরু করে নেতাজি সুভাষচন্দ্র বসুর মতো মনীষীদের জন্মভূমি এই ভারত। বর্তমান যুগে ভারত তথ্যপ্রযুক্তি এবং মহাকাশ গবেষণায় প্রভূত উন্নতি লাভ করেছে। চন্দ্রযান থেকে মঙ্গলযান, ভারতের বিজয় পতাকা আজ মহাকাশেও উড়ছে। আমাদের উচিত আমাদের এই মহান দেশের ঐক্য বজায় রাখা এবং উন্নতির পথে এগিয়ে নিয়ে যাওয়া। টাইপিং প্র্যাকটিস আমাদের ডিজিটাল যুগে দ্রুত যোগাযোগ করতে সাহায্য করে।"],
    hindi: ["भारत दुनिया का सबसे बड़ा लोकतंत्र है। यहाँ की सभ्यता और संस्कृति हजारों साल पुरानी है। भारत के उत्तर में हिमालय की ऊँची चोटियाँ हैं और दक्षिण में विशाल हिंद महासागर। भारत अपनी एकता और अखंडता के लिए जाना जाता है, जहाँ विभिन्न धर्मों और भाषाओं के लोग प्रेमपूर्वक रहते हैं। आज का भारत तकनीक और शिक्षा के क्षेत्र में तेजी से आगे बढ़ रहा है। डिजिटल इंडिया अभियान ने देश के कोने-कोने में इंटरनेट और तकनीक पहुँचा दी है। हमें गर्व है कि हम इस महान देश के नागरिक हैं। अपनी टाइपिंग गति बढ़ाना आज के समय में बहुत आवश्यक है ताकि हम अपनी बात तेजी से दुनिया तक पहुँचा सकें।"]
};

let lang = 'english', time = 60, timer = null, idx = 0, mistakes = 0, active = false;
const input = document.getElementById('master-input');
const display = document.getElementById('text-display');

function showLang() { goBack('lang-screen'); }
function setLang(l) { lang = l; goBack('time-screen'); }

function startApp(m) {
    time = m * 60;
    goBack('typing-screen');
    render();
}

function render() {
    const raw = DB[lang][0]; // বড় প্যারাগ্রাফ
    display.innerHTML = raw.split('').map(c => `<span>${c}</span>`).join('');
    display.children[0].classList.add('current');
    input.value = ""; idx = 0; mistakes = 0; active = false;
    setTimeout(() => input.focus(), 500);
}

function focusInput() { input.focus(); }

input.addEventListener('input', (e) => {
    if (!active) startTimer();
    const spans = display.querySelectorAll('span');
    const val = input.value.split('');
    
    // Backspace Logic
    if (e.inputType === "deleteContentBackward") {
        if (idx > 0) {
            idx--;
            spans[idx].className = '';
            spans.forEach(s => s.classList.remove('current'));
            spans[idx].classList.add('current');
        }
        return;
    }

    // Typing Logic
    const char = val[val.length - 1];
    if (idx < spans.length) {
        if (char === spans[idx].innerText) {
            spans[idx].className = 'correct';
            playSound('sfx-key');
        } else {
            spans[idx].className = 'wrong';
            mistakes++;
            playSound('sfx-error');
        }
        idx++;
        spans.forEach(s => s.classList.remove('current'));
        if (spans[idx]) spans[idx].classList.add('current');
        updateStats();
    }
    if (idx === spans.length) end();
});

function playSound(id) {
    const s = document.getElementById(id).cloneNode();
    s.volume = 0.5;
    s.play().catch(() => {}); // অটো-প্লে ব্লক হ্যান্ডলিং
}

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
    let wpm = Math.round((idx / 5) / ((time - (parseInt(document.getElementById('timer').innerText.split(':')[0]*60) + parseInt(document.getElementById('timer').innerText.split(':')[1]))) / 60) || 0);
    document.getElementById('wpm').innerText = wpm;
    document.getElementById('acc').innerText = Math.round(((idx - mistakes) / idx) * 100 || 100) + "%";
}

function end() {
    clearInterval(timer);
    goBack('result-screen');
    document.getElementById('res-wpm').innerText = document.getElementById('wpm').innerText;
    document.getElementById('res-acc').innerText = document.getElementById('acc').innerText.replace('%','');
}

function goBack(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function generateCertificate() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFillColor(20, 20, 20); doc.rect(0, 0, 297, 210, 'F');
    doc.setTextColor(247, 129, 102); doc.setFontSize(50); doc.text("BharatTyping Pro 🇮🇳", 148, 70, {align:'center'});
    doc.setTextColor(255); doc.setFontSize(25); doc.text(`Speed: ${document.getElementById('res-wpm').innerText} WPM`, 148, 110, {align:'center'});
    doc.text(`Accuracy: ${document.getElementById('res-acc').innerText}%`, 148, 130, {align:'center'});
    doc.save('pro-certificate.pdf');
}
