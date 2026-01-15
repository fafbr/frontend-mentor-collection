const searchInput = document.getElementById('search-input');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector('.card-title').innerText.toLowerCase();

        if (title.includes(searchString)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});