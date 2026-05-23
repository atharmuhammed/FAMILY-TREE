// REPLACE THIS URL WITH THE ONE THAT ENDS IN ?output=csv
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv'; 

function loadFamilyTree() {
    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const container = document.getElementById('tree-container');
            container.innerHTML = '';
            
            // Loop through every row in your spreadsheet
            results.data.forEach(row => {
                // Check if row has a name
                if (!row.NAME) return;

                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${row.NAME}</h3>
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
