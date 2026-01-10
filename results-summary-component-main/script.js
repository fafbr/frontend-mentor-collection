const summaryList = document.getElementById('summary-list');

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item  => {
            const categoryClass = item.category.toLowerCase();

            const itemHTML = `
                <div class="item ${categoryClass}">
                    <div class="item-name">
                        <img src="${item.icon}" alt="${item.category} icon" class="icon-img">
                        ${item.category}
                    </div>
                    <div class="item-score">
                        <span>${item.score}</span> / 100
                    </div>
                </div>
            `;

            summaryList.innerHTML +=itemHTML;
        });

    })
    .catch(error => console.error('Gagal mengambil data:', error))