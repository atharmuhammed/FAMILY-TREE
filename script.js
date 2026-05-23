async function loadFamilyTree() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv';
    
    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        
        const container = document.getElementById('tree-container');
        container.innerHTML = ''; // Clear container
        
        rows.forEach(row => {
            // This regex handles commas inside or outside quotes
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (columns.length < 7) return; 
            
            const [name, spouse, children, born, death, father, mother] = columns;
            
            if (!name) return;

            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <h3>${name.replace(/"/g, '')} & ${spouse ? spouse.replace(/"/g, '') : ''}</h3>
                <p><strong>Parents:</strong> ${father ? father.replace(/"/g, '') : ''} & ${mother ? mother.replace(/"/g, '') : ''}</p>
                <p><strong>Bio/Dates:</strong> Born: ${born ? born.replace(/"/g, '') : ''} | Died: ${death ? death.replace(/"/g, '') : ''}</p>
                <p><strong>Children:</strong> ${children ? children.replace(/"/g, '') : ''}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading family tree:", error);
    }
}

loadFamilyTree();
