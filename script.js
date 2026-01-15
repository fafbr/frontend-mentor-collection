const container = document.getElementById('projects-container');
const seacrhInput = document.getElementById('search-input');

let allProjects = [];

async function loadProjects() {
    try {
        const response = await fetch('./data.json');
        allProjects = await response.json();

        displayProjects(allProjects);
    }
    catch (error) {
        console.log('Gagal memuat data project:', error);
    }
}

function displayProjects(projects) {
    container.innerHTML = '';

    projects.forEach(project => {
        const badgesHTML = project.techStack.map(tech =>
            `<span class="badge">${tech}</span>`
        ).join('');

        const cardHTML = 
            `<article class="card">
                <div class="badge-container">
                    ${badgesHTML}
                </div>
                <h3 class="card-title">${project.title}</h3>
                <p class="card-desc">${project.description}</p>

                <div class="card-links">
                    <a href="${project.liveLink}" target="_blank" class="btn btn-primary">
                        <i data-feather="external-link"></i> Live Demo
                    </a>

                    <a href="${project.repoLink}" target="_blank" class="btn btn-secondary">
                        <i data-feather="github"></i> View Code
                    </a>
                </div>
            </article>
        `;

        container.innerHTML += cardHTML;
    });
    feather.replace();
}

seacrhInput.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredProjects = allProjects.filter(project => {
        return (
            project.title.toLowerCase().includes(searchString) || project.description.toLowerCase().includes(searchString)
        );
    });

    displayProjects(filteredProjects);
});

loadProjects();