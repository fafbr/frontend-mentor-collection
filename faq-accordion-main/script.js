// document.querySelectorAll('.faq-question').forEach(button => {
//     button.addEventListener('click', () => {
//         button.classList.toggle('active');

//         const answer = button.nextElementSibling;
//         answer.classList.toggle('active');

//         const isExpanded = button.classList.contains('active');
//         button.setAttribute('aria-expanded', isExpanded);
//     });
// });

const buttons = document.querySelectorAll('.faq-question');

buttons.forEach(button => {
    button.addEventListener('click', () => {
    const currentActive = document.querySelector('.faq-question.active');

    if (currentActive && currentActive !== button) {
        currentActive.classList.remove('active');
        
        if (currentActive.nextElementSibling) {
            currentActive.nextElementSibling.classList.remove('active');
        }
    }

    button.classList.toggle('active');
    const answer = button.nextElementSibling;
    if (answer) {
        answer.classList.toggle('active');
    }
    });
});
