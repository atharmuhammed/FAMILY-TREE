const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv';

function loadFamilyTree() {
    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const container = document.getElementById('tree-container');
            container.innerHTML = '';
            
            results.data.forEach(row => {
                // Ensure the row has data before trying to display it
                if (!row.NAME) return; 

                const card = document.createElement('div');
                card.className = 'member-card';
                card.innerHTML = `
                    <h3>${row.NAME || 'N/A'} & ${row.SPOUSE || 'N/A'}</h3>
                    <p><strong>Parents:</strong> ${row['FATHER NAME'] || ''} & ${row['MOTHER NAME'] || ''}</p>
                    <p><strong>Bio:</strong> Born: ${row['BORN DATE'] || 'N/A'} | Died: ${row['DEATH DATE'] || 'N/A'}</p>
                    <p><strong>Children:</strong> ${row.CHILDREN || 'None'}</p>
                `;
                container.appendChild(card);
            });
        }
    });
}

loadFamilyTree();
