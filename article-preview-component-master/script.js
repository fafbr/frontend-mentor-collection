const shareButton = document.getElementById('share-toggle');
const shareMenu = document.getElementById('share-menu');

shareButton.addEventListener('click', () => {
    shareMenu.classList.toggle('hidden');

    shareButton.classList.toggle('active');

    const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
    shareButton.setAttribute('aria-expanded', !isExpanded);
} )