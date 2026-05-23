async function loadFamilyTree() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv';
    
    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip the header row
        
        const container = document.getElementById('tree-container');
        
        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length < 5) return;
            
            const [name, spouse, children, bio, parents] = columns;
            
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <h3>${name} & ${spouse}</h3>
                <p><strong>Parents:</strong> ${parents}</p>
                <p><strong>Bio:</strong> ${bio}</p>
                <p><strong>Children:</strong> ${children}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading family tree:", error);
    }
}

loadFamilyTree();
