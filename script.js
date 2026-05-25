const csvUrl = 'https://docs.google.com/spreadsheets/d/1B60ciK2qtUW1nsg7NpFEIOweo_yseqlzW6-DQRfLtgI/export?format=csv&gid=1968708823';

function loadFamilyTree() {
    // Check if Papa is loaded
    if (typeof Papa === 'undefined') {
        console.error("PapaParse library not loaded!");
        return;
    }

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const container = document.getElementById('tree-container');
            if (!container) {
                console.error("Element with id 'tree-container' not found in your HTML.");
                return;
            }
            container.innerHTML = '';
            
            results.data.forEach(row => {
                // Ensure the row has a name before creating a card
                if (row.NAME && row.LEVEL && row.LEVEL.trim() == "1") {
                    const card = document.createElement('div');
                    // This class 'box' connects to the CSS styling
                    card.className = 'box'; 
                    card.innerHTML = `
                        <h3><a href="profile.html?name=${encodeURIComponent(row.NAME)}">${row.NAME}</a></h3>
                        <div class="card-details">
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
        },
        error: function(err) {
            console.error("Error parsing CSV:", err);
        }
    });
}

// Run the function when the page is fully loaded
document.addEventListener('DOMContentLoaded', loadFamilyTree);
