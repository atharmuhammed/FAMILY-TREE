async function loadFamilyTree() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv';
    
    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        
        const container = document.getElementById('tree-container');
        container.innerHTML = ''; 
        
        rows.forEach(row => {
            // Split by comma
            const cols = row.split(',');
            if (cols.length < 7) return;
            
            // Mapping your exact columns:
            const name = cols[0];
            const spouse = cols[1];
            const born = cols[2];
            const death = cols[3];
            const children = cols[4];
            const father = cols[5];
            const mother = cols[6];
            
            if (!name) return;

            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <h3>${name} & ${spouse}</h3>
                <p><strong>Parents:</strong> ${father} & ${mother}</p>
                <p><strong>Bio:</strong> Born: ${born} | Died: ${death}</p>
                <p><strong>Children:</strong> ${children}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading family tree:", error);
    }
}

loadFamilyTree();
