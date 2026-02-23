document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticket-form');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('avatar');
    const uploadPrompt = document.getElementById('upload-prompt');
    const uploadPreview = document.getElementById('upload-preview');
    const avatarImgPreview = document.getElementById('avatar-img-preview');
    const btnRemoveImg = document.getElementById('btn-remove-img');
    const btnChangeImg = document.getElementById('btn-change-img');
    const avatarGroup = document.getElementById('group-avatar');

    let uploadedFile = null;

    dropZone.addEventListener('click', (e) => {
        if(e.target !== btnRemoveImg && e.target !== btnChangeImg) fileInput.click();
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--clr-primary-500)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'var(--clr-neutral-500)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--clr-neutral-500';
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });

    fileInput.addEventListener('change', (e) => {
        if(e.target.files.length) handleFile(e.target.files[0]);
    });

    function handleFile(file) {
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 500 * 1024;

        if (!validTypes.includes(file.type) || file.size > maxSize) {
            avatarGroup.classList.add('invalid-file');
            document.querySelector('#avatar-info').innerHTML = `<img src="assets/images/icon-info.svg"> File too large or invalid format. Max 500KB.`;
            resetFileInput();
            return;
        }

        avatarGroup.classList.remove('invalid-file');
        document.querySelector('#avatar-info').innerHTML = `<img src="assets/images/icon-info.svg"> Upload your photo (JPG or PNG, max size: 500KB).`;

        uploadedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            avatarImgPreview.src = e.target.result;
            uploadPrompt.classList.add('hidden');
            uploadPreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    function resetFileInput() {
        uploadedFile = null;
        fileInput.value = '';
        uploadPrompt.classList.remove('hidden');
        uploadPreview.classList.add('hidden');
        avatarImgPreview.src = '';
    }

    btnRemoveImg.addEventListener('click', (e) => { e.stopPropagation(); resetFileInput(); });
    btnChangeImg.addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (!uploadedFile) {
            avatarGroup.classList.add('invalid-file');
            isValid = false;
        }

        const nameInput = document.getElementById('fullname');
        if (!nameInput.value.trim()) {
            document.getElementById('group-name').classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('group-name').classList.remove('invalid');
        }

        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            document.getElementById('group-email').classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('group-email').classList.remove('invalid');
        }

        const githubInput = document.getElementById('gitHub');
        if (!githubInput.value.trim()) {
            document.getElementById('group-github').classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('group-github').classList.remove('invalid');
        }

        if (isValid) {
            document.getElementById('form-section').classList.add('hidden');
            document.getElementById('ticket-section').classList.remove('hidden');

            document.getElementById('display-name-hero').textContent = nameInput.value;
            document.getElementById('display-email').textContent = emailInput.value;
            document.getElementById('display-fullname').textContent = nameInput.value;

            let gitHandle = githubInput.value.trim();
            if (!gitHandle.startsWith('@')) gitHandle = '@' + gitHandle;
            document.getElementById('display-github').textContent = gitHandle;

            document.getElementById('display-avatar').src = avatarImgPreview.src;

            const ticketNum = Math.floor(Math.random() * 90000) + 10000;
            document.getElementById('display-ticket-number').textContent = `#${ticketNum}`;
        }
    });
});