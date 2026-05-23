async function loadFamilyTree() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv';
    
    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        
        const container = document.getElementById('tree-container');
        container.innerHTML = ''; 
        
        rows.forEach(row => {
            // This line intelligently splits by comma, ignoring commas inside quotes
            const cols = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            if (!cols || cols.length < 7) return;
            
            // Map columns (cleaning up potential quotes)
            const clean = cols.map(c => c.replace(/"/g, ''));
            
            const [name, spouse, born, death, children, father, mother] = clean;
            
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <h3>${name} & ${spouse}</h3>
                <p><strong>Parents:</strong> ${father} & ${mother}</p>
                <p><strong>Bio:</strong> Born: ${born} | Died: ${death}</p>
                <p><strong>Children:</strong> ${children.replace(/;/g, ',')}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading family tree:", error);
    }
}

loadFamilyTree();
