const ratingContainer = document.getElementById('rating-buttons-container');
const submitBtn = document.getElementById('submit-btn');
const ratingState = document.getElementById('rating-state');
const thankYouState = document.getElementById('thank-you-state');
const selectedRatingVal = document.getElementById('selected-rating-value');

let currentRating = 0;

async function initApp() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();

        document.querySelectorAll('[data-bind]').forEach(element => {
            const key = element.dataset.bind;

            if (data[key]) {
                element.textContent = data[key];
            }
        });

        createRatingButtons(data.maxRating);
        
    } catch (error) {
        console.log('Gagal memuat data:', error);
        ratingContainer.innerHTML = '<p style="color: white">Gagal memuat sistem rating.</p>';
    }
}

function createRatingButtons(amount) {
    ratingContainer.innerHTML = '';

    for (let i = 1; i <= amount; i++) {
        const btn = document.createElement('button');
        btn.classList.add('rating-btn');
        btn.textContent = i;

        btn.onclick = () => {
            currentRating = i;
            updateActiveButton(btn);
        };

        ratingContainer.appendChild(btn);
    }
}

function updateActiveButton(activeBtn) {
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    activeBtn.classList.add('active');
}

submitBtn.addEventListener('click', () => {
    if(currentRating === 0) {
        alert('Please select a rating first!');
        return;
    }

    selectedRatingVal.textContent = currentRating;

    ratingState.classList.add('hidden');
    thankYouState.classList.remove('hidden');
});

initApp();