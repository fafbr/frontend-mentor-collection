const textDisplay = document.getElementById('text-display');
const hiddenInput = document.getElementById('hidden-input');
const wpmEl = document.getElementById('wpm'), accEl = document.getElementById('accuracy'), timerEl = document.getElementById('timer');

let charIndex = 0, mistakes = 0, isPlaying = false, timer = null, timeLeft = 0;
let everWrong = new Set(), cachedData = null;

async function init() {
    if (!cachedData) {
        const res = await fetch('./data.json');
        cachedData = await res.json();
    }
    const diff = document.getElementById('difficulty-select').value;
    const mode = document.getElementById('mode-select').value;
    const text = cachedData[diff][Math.floor(Math.random() * cachedData[diff].length)].text;

    textDisplay.innerHTML = text.split('').map(c => `<span class="char">${c}</span>`).join('');
    charIndex = 0; mistakes = 0; isPlaying = false; everWrong.clear();
    clearInterval(timer);
    timeLeft = mode === 'timed' ? 60 : 0;
    timerEl.innerText = timeLeft;
    wpmEl.innerText = 0; accEl.innerText = 100;
    hiddenInput.value = "";
    document.getElementById('best-wpm').innerText = localStorage.getItem('pb') || 0;
    update();
}

function update() {
    const chars = textDisplay.querySelectorAll('.char');
    chars.forEach(c => c.classList.remove('current'));
    if(chars[charIndex]) chars[charIndex].classList.add('current');
}

hiddenInput.addEventListener('keydown', (e) => {
    if(e.key === 'Backspace' && charIndex > 0) {
        charIndex--;
        textDisplay.querySelectorAll('.char')[charIndex].classList.remove('correct', 'incorrect');
        update();
    }
});

hiddenInput.addEventListener('input', (e) => {
    if(!isPlaying) start();
    const chars = textDisplay.querySelectorAll('.char');
    const input = e.target.value.split('').pop();
    if(charIndex < chars.length && input) {
        if(input === chars[charIndex].innerText) {
            chars[charIndex].classList.add('correct');
        } else {
            chars[charIndex].classList.add('incorrect');
            if(!everWrong.has(charIndex)) { mistakes++; everWrong.add(charIndex); }
        }
        charIndex++; update();
        if(charIndex === chars.length) end();
    }
    e.target.value = "";
});

function start() {
    isPlaying = true; let startT = Date.now();
    const mode = document.getElementById('mode-select').value;
    timer = setInterval(() => {
        let sec = Math.floor((Date.now() - startT) / 1000);
        if(mode === 'timed') {
            timeLeft = 60 - sec;
            if(timeLeft <= 0) end();
        } else { timeLeft = sec; }
        timerEl.innerText = Math.max(0, timeLeft);
        wpmEl.innerText = Math.round((charIndex / 5) / (Math.max(sec, 1) / 60));
        accEl.innerText = Math.round(((charIndex - everWrong.size) / Math.max(charIndex, 1)) * 100);
    }, 1000);
}

function end() {
    clearInterval(timer);
    const wpm = parseInt(wpmEl.innerText), pb = parseInt(localStorage.getItem('pb') || 0);
    document.getElementById('result-modal').classList.remove('hidden');
    document.getElementById('final-wpm').innerText = wpm;
    document.getElementById('final-acc').innerText = accEl.innerText + '%';
    if(wpm > pb) {
        localStorage.setItem('pb', wpm);
        document.getElementById('modal-title').innerText = pb === 0 ? "Baseline Established!" : "High Score Smashed!";
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
}

document.getElementById('typing-trigger').onclick = () => hiddenInput.focus();
document.getElementById('restart-btn').onclick = init;
document.getElementById('difficulty-select').onchange = init;
document.getElementById('mode-select').onchange = init;
document.getElementById('close-modal').onclick = () => { document.getElementById('result-modal').classList.add('hidden'); init(); };
window.onload = init;