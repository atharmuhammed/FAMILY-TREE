const csvUrl = 'https://docs.google.com/spreadsheets/d/1B60ciK2qtUW1nsg7NpFEIOweo_yseqlzW6-DQRfLtgI/export?format=csv&gid=1968708823';

function loadFamilyTree() {
    Papa.parse(csvUrl, {
        download: true, header: true,
        complete: function(results) {
            const container = document.getElementById('tree-container');
            if (!container) return;
            container.innerHTML = '';
            
            results.data.forEach(row => {
                if (row.LEVEL && row.LEVEL.trim() == "1") {
                    const card = document.createElement('div');
                    card.className = 'box'; // Unified class
                    card.innerHTML = `
                        <h3><a href="profile.html?name=${encodeURIComponent(row.NAME)}">${row.NAME}</a></h3>
                        <div class="card-details" style="font-size: 0.9em; color: #555;">
                            <p><strong>Partner:</strong> ${row['PARTNER NAME'] || 'N/A'}</p>
                            <div class="dates">
                                ${row['DOB 1'] ? 'Born: ' + row['DOB 1'] : ''} <br>
                                ${row['DOD 1'] ? 'Passed Away: ' + row['DOD 1'] : ''}
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                }
            });
        }
    });
}
loadFamilyTree();
