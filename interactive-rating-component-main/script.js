const titleText = document.getElementById('title-text');
const descText = document.getElementById('desc-text');
const ratingContainer = document.getElementById('rating-buttons-container');
const submitBtn = document.getElementById('submit-btn');
const ratingState = document.getElementById('rating-state');
const thankYouState = document.getElementById('thank-you-state');
const tyTitle = document.getElementById('ty-title');
const tyDesc = document.getElementById('ty-desc');
const selectedRatingVal = document.getElementById('selected-rating-value');
const maxRating = document.getElementById('max-rating-value');

let currentRating = 0;

async function initApp() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();

        titleText.textContent = data.title;
        descText.textContent = data.description;
        submitBtn.textContent = data.buttonText;
        tyTitle.textContent = data.thankYouTitle;
        tyDesc.textContent = data.thankYouDescription;
        maxRating.textContent = data.maxRating

        for (let i = 1; i <= data.maxRating; i++) {
            const btn = document.createElement('button');
            btn.classList.add('rating-btn')
            btn.textContent = i;

            btn.addEventListener('click', () => {
                handleRatingClick(i, btn);
            });

            ratingContainer.appendChild(btn)
        }
    }

    catch (error){
        console.error('Error loading data:', error);
    }
}

function handleRatingClick(value, clickBtn) {
    currentRating = value;
    
    const allBtn = document.querySelectorAll('.rating-btn');
    allBtn.forEach(btn => btn.classList.remove('active'));

    clickBtn.classList.add('active');
}

submitBtn.addEventListener('click', () => {
    if (currentRating === 0) {
        alert('please select a rating first!');
        return;
    }

    selectedRatingVal.textContent = currentRating;

    ratingState.classList.add('hidden');
    thankYouState.classList.remove('hidden');
})

initApp();