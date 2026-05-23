const csvUrl = 'YOUR_PUBLISHED_CSV_LINK_HERE';

function loadFamilyTree() {
    Papa.parse(csvUrl, {
        download: true, header: true,
        complete: function(results) {
            const container = document.getElementById('tree-container');
            container.innerHTML = '';
            
            results.data.forEach(row => {
                if (!row.NAME) return;

                const card = document.createElement('div');
                card.className = 'card';
                // Creates a card for every person
                card.innerHTML = `
                    <h3><a href="${row.Slug}.html">${row.NAME}</a></h3>
                    <p>Spouse: ${row.SPOUSE || 'N/A'}</p>
                    <div class="bio">
                        Born: ${row['BORN DATE']}<br>
                        Died: ${row['DEATH DATE']}
                    </div>
                    <p><strong>Children:</strong> ${row.CHILDREN || 'None'}</p>
                `;
                container.appendChild(card);
            });
        }
    });
}
loadFamilyTree();
