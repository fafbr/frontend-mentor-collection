const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const navbar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');
const dropdownWrappers = document.querySelectorAll('.dropdown-wrapper');

function toggleMenu() {
    const isActive = navbar.classList.contains('active');

    if(!isActive) {
        navbar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        openBtn.setAttribute('aria-expanded', 'true');
    } else {
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        openBtn.setAttribute('aria-expanded', 'false');
    }
}

openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);


dropdownWrappers.forEach((wrapper) => {
    const btn = wrapper.querySelector('.dropdown-btn');
    const menu = wrapper.querySelector('.dropdown-menu');
    const arrow = wrapper.querySelector('.arrow');

    btn.addEventListener('click', (e) => {
        e.preventDefault();

        dropdownWrappers.forEach((otherWrapper) => {
            if(otherWrapper !== wrapper) {
                otherWrapper.querySelector('.dropdown-menu').classList.remove('show');
                otherWrapper.querySelector('.arrow').src = './images/icon-arrow-down.svg';
            }
        });

        menu.classList.toggle('show');

        if(menu.classList.contains('show')) {
            arrow.src = './images/icon-arrow-up.svg';
        } else {
            arrow.src = './images/icon-arrow-down.svg';
        }
    });
});

window.addEventListener('resize', () => {
    if(window.innerWidth >= 1024) {
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflowe = 'auto';
    }
})