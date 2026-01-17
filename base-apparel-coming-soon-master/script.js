const form = document.getElementById('email-form');
const emailInput = document.getElementById('email');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = emailInput.value;

    if (validateEmail(emailValue)) {
        form.classList.remove('error');
        alert('Terimakasih telah mendaftar!');
        form.reset();
    } else {
        form.classList.add('error');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}