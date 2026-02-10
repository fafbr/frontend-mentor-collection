let extensionsData = [];
let currentFilter = 'all';

const grid = document.getElementById('extensions-grid');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

async function init() {
    try {
    const res = await fetch('./data.json');
    extensionsData = await res.json();
    render();
    } catch (err) {
    grid.innerHTML = '<p>Gagal memuat data. Gunakan Live Server.</p>';
    }
}

function render() {
    grid.innerHTML = '';
    const filtered = extensionsData.filter(ex => {
    if (currentFilter === 'active') return ex.isActive;
    if (currentFilter === 'inactive') return !ex.isActive;
    return true;
});

filtered.forEach(ex => {
    const card = document.createElement('article');
    card.className = 'extension-card';
    card.innerHTML = `
        <div class="card-top">
            <img src="${ex.logo}" alt="${ex.name}" class="ext-logo">
            <div class="ext-info">
                <h3>${ex.name}</h3>
                <p>${ex.description}</p>
            </div>
        </div>
        <div class="card-bottom">
            <button class="remove-btn" onclick="removeExt('${ex.name}')">Remove</button>
            <label class="switch">
                <input type="checkbox" ${ex.isActive ? 'checked' : ''} onchange="toggleStatus('${ex.name}')">
                <span class="slider"></span>
            </label>
        </div>
    `;
    grid.appendChild(card);
});
}

// Global Actions
window.toggleStatus = (name) => {
const ext = extensionsData.find(e => e.name === name);
if (ext) { ext.isActive = !ext.isActive; render(); }
};

window.removeExt = (name) => {
extensionsData = extensionsData.filter(e => e.name !== name);
render();
};

// Listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
});
});

themeToggle.addEventListener('click', () => {
const body = document.body;
body.classList.toggle('theme-dark');
const isDark = body.classList.contains('theme-dark');
themeIcon.src = isDark ? './assets/images/icon-sun.svg' : './assets/images/icon-moon.svg';
});

init();