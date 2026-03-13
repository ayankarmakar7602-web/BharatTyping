// ELEMENTS

const startBtn = document.getElementById("startBtn")
const textDisplay = document.getElementById("textDisplay")
const typingArea = document.getElementById("typingArea")

const wpmText = document.getElementById("wpm")
const accuracyText = document.getElementById("accuracy")
const timerText = document.getElementById("timer")

const resultSection = document.getElementById("resultSection")
const finalWPM = document.getElementById("finalWPM")
const finalAccuracy = document.getElementById("finalAccuracy")

const languageSelect = document.getElementById("language")
const timeSelect = document.getElementById("time")

const keySound = document.getElementById("keySound")
const errorSound = document.getElementById("errorSound")

const downloadBtn = document.getElementById("downloadCert")


// WORD DATABASE

const words = {

english:[
"keyboard","typing","practice","computer","screen","speed","accuracy","lesson","random","focus",
"method","monitor","technology","internet","development","javascript","programming","software",
"hardware","system","performance","professional","creative","learning","challenge","solution",
"engineer","design","modern","education","training","productivity","workflow","typingtest",
"improvement","exercise","efficiency","communication","knowledge","experience"
],

bangla:[
"কম্পিউটার","টাইপিং","অনুশীলন","গতি","নির্ভুলতা","শিক্ষা","প্রযুক্তি","ইন্টারনেট",
"কীবোর্ড","স্ক্রিন","কাজ","অভ্যাস","দক্ষতা","উন্নতি","কমিউনিকেশন","সফটওয়্যার",
"হার্ডওয়্যার","প্রোগ্রাম","ডেভেলপমেন্ট","শেখা","সমাধান","অভিজ্ঞতা","চ্যালেঞ্জ"
],

hindi:[
"कंप्यूटर","टाइपिंग","अभ्यास","गति","सटीकता","कीबोर्ड","स्क्रीन","तकनीक",
"इंटरनेट","सीखना","विकास","प्रोग्राम","सिस्टम","ज्ञान","अनुभव","समाधान",
"चुनौती","शिक्षा","कार्य","संचार"
]

}



// VARIABLES

let charIndex = 0
let mistakes = 0
let timer = null
let timeLeft = 0
let started = false



// GENERATE PARAGRAPH

function generateParagraph(){

let wordsNeeded = 50

if(timeSelect.value == "180") wordsNeeded = 150
if(timeSelect.value == "300") wordsNeeded = 250

const lang = languageSelect.value
const list = words[lang]

let paragraph = []

for(let i=0;i<wordsNeeded;i++){

const random = list[Math.floor(Math.random()*list.length)]

paragraph.push(random)

}

return paragraph.join(" ")

}



// LOAD TEXT

function loadText(){

const text = generateParagraph()

textDisplay.innerHTML = ""

text.split("").forEach(char=>{

const span = document.createElement("span")
span.innerText = char

textDisplay.appendChild(span)

})

textDisplay.querySelector("span").classList.add("current")

}



// START TEST

startBtn.addEventListener("click",()=>{

loadText()

charIndex = 0
mistakes = 0

timeLeft = parseInt(timeSelect.value)

timerText.innerText = timeLeft

wpmText.innerText = 0
accuracyText.innerText = 100

started = true

resultSection.style.display = "none"

typingArea.focus()

clearInterval(timer)

timer = setInterval(updateTimer,1000)

})




// TIMER

function updateTimer(){

if(timeLeft>0){

timeLeft--
timerText.innerText = timeLeft

}else{

finishTest()

}

}



// KEY TYPING

document.addEventListener("keydown",(e)=>{

if(!started) return

const characters = textDisplay.querySelectorAll("span")

if(e.key === "Backspace"){

if(charIndex>0){

charIndex--

characters[charIndex].classList.remove("correct","wrong")

}

return

}



if(charIndex < characters.length){

const currentChar = characters[charIndex]

if(e.key === currentChar.innerText){

currentChar.classList.add("correct")

keySound.currentTime=0
keySound.play()

}else{

currentChar.classList.add("wrong")

mistakes++

errorSound.currentTime=0
errorSound.play()

if(navigator.vibrate){

navigator.vibrate(100)

}

}

currentChar.classList.remove("current")

charIndex++

if(charIndex < characters.length){

characters[charIndex].classList.add("current")

}

updateStats()

}

})




// UPDATE STATS

function updateStats(){

const typed = charIndex
const correct = typed - mistakes

const minutes = (parseInt(timeSelect.value)-timeLeft)/60

let wpm = 0

if(minutes>0){

wpm = Math.round((correct/5)/minutes)

}

let accuracy = 0

if(typed>0){

accuracy = Math.round((correct/typed)*100)

}

wpmText.innerText = wpm
accuracyText.innerText = accuracy

}




// FINISH TEST

function finishTest(){

clearInterval(timer)

started = false

resultSection.style.display = "block"

finalWPM.innerText = wpmText.innerText
finalAccuracy.innerText = accuracyText.innerText

}



// CERTIFICATE

downloadBtn.addEventListener("click",()=>{

const name = document.getElementById("userName").value

if(name===""){

alert("Enter your name first")
return

}

const { jsPDF } = window.jspdf

const doc = new jsPDF()

doc.setFillColor(255,255,255)
doc.rect(0,0,210,297,"F")

doc.setDrawColor(0)
doc.rect(10,10,190,277)

doc.setFontSize(28)
doc.text("Typing Achievement Certificate",35,60)

doc.setFontSize(16)
doc.text("This certificate is proudly presented to",55,90)

doc.setFontSize(24)
doc.text(name,80,110)

doc.setFontSize(16)
doc.text("for successfully completing the typing test",50,130)

doc.text("Typing Speed: "+finalWPM.innerText+" WPM",70,160)
doc.text("Accuracy: "+finalAccuracy.innerText+" %",80,175)

doc.text("Authorized Signature:",20,230)

doc.setFontSize(18)
doc.text("Ayan Karmakar",20,245)

doc.setFontSize(12)
doc.text("Pro Typing Practice Institute",140,260)

doc.save("Typing_Certificate.pdf")

})