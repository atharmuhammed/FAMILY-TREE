const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv';

function loadFamilyTree() {
    Papa.parse(csvUrl, {
        download: true,
        header: true, // This tells it the first row is your headers (Name, Spouse, etc.)
        complete: function(results) {
            const container = document.getElementById('tree-container');
            container.innerHTML = '';
            
            results.data.forEach(row => {
                // Now you can use the exact column names from your sheet!
                const card = document.createElement('div');
                card.className = 'member-card';
                card.innerHTML = `
                    <h3>${row.Name || 'N/A'} & ${row.Spouse || 'N/A'}</h3>
                    <p><strong>Parents:</strong> ${row.Father || ''} & ${row.Mother || ''}</p>
                    <p><strong>Bio:</strong> Born: ${row.Born || 'N/A'} | Died: ${row.Death || 'N/A'}</p>
                    <p><strong>Children:</strong> ${row.Children || 'None'}</p>
                `;
                container.appendChild(card);
            });
        }
    });
}

loadFamilyTree();
