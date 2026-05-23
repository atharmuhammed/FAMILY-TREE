const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv';

function loadFamilyTree() {
    Papa.parse(csvUrl, {
        download: true, header: true,
        complete: function(results) {
            const container = document.getElementById('tree-container');
            if (!container) return;
            container.innerHTML = '';
            
            results.data.forEach(row => {
                // FILTER: Only show main (Level 1) people on Home Page
                if (row.Level != "1") return;
                if (!row.NAME) return;

                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3><a href="profile.html?name=${row.Slug}">${row.NAME}</a></h3>
                    <div class="card-details">
                        <p><strong>Partner:</strong> ${row['NAMES 1'] || 'N/A'}</p>
                        <p><strong>Children:</strong> ${row.CHILDREN || 'None'}</p>
                        <div class="dates">
                            Born: ${row['BORN DATE'] || 'N/A'} <br>
                            Died: ${row['DEATH DATE'] || 'N/A'}
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    });
}
loadFamilyTree();
