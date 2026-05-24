// This URL specifically targets your Sheet ID (gid=1968708823)
const csvUrl = 'https://docs.google.com/spreadsheets/d/1B60ciK2qtUW1nsg7NpFEIOweo_yseqlzW6-DQRfLtgI/export?format=csv&gid=1968708823';

function loadFamilyTree() {
    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const container = document.getElementById('tree-container');
            if (!container) return;
            container.innerHTML = '';
            
            results.data.forEach(row => {
                // We only load Level 1 (Head of Family) to start
                if (row.LEVEL != "1") return;
                if (!row.NAME) return;

                const card = document.createElement('div');
                card.className = 'card';
                // Using the exact headers from your spreadsheet
                card.innerHTML = `
                    <h3>${row.NAME}</h3>
                    <div class="card-details">
                        <p><strong>Partner:</strong> ${row['PARTNER NAME'] || 'N/A'}</p>
                        <div class="dates">
                            <strong>Self:</strong> ${row['DOB 1'] || 'N/A'} - ${row['DOD 1'] || 'N/A'} <br>
                            <strong>Partner:</strong> ${row['DOB 2'] || 'N/A'} - ${row['DOD 2'] || 'N/A'}
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    });
}

loadFamilyTree();
