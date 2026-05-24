const csvUrl = 'https://docs.google.com/spreadsheets/d/1B60ciK2qtUW1nsg7NpFEIOweo_yseqlzW6-DQRfLtgI/export?format=csv&gid=1968708823';
const params = new URLSearchParams(window.location.search);
const personName = params.get('name');

Papa.parse(csvUrl, {
    download: true, header: true,
    complete: function(results) {
        const data = results.data;
        const container = document.getElementById('profile-container');
        
        // Find the person
        const person = data.find(p => p.NAME && p.NAME.trim().toLowerCase() === personName.trim().toLowerCase());
        
        if (!person) {
            container.innerHTML = "<h1>Person not found.</h1>";
            return;
        }

        container.innerHTML = `
            <div class="top-row">
                <div class="box"><h3>${person.NAME}</h3><p>Born: ${person['DOB 1']}</p><p>Died: ${person['DOD 1']}</p></div>
                <div class="box"><h3>${person['PARTNER NAME'] || 'No Partner'}</h3><p>Partner</p></div>
            </div>
            <h3>Children</h3>
            <div class="children-row" id="children-container"></div>
        `;

        const childrenContainer = document.getElementById('children-container');
        
        // DEBUGGING: Log to console to see what the data looks like
        console.log("DEBUG: Viewing profile for:", person.NAME);
        const matches = data.filter(p => {
            const parentName = p['PARENT NAME'] ? p['PARENT NAME'].trim() : "";
            const isMatch = parentName.toLowerCase() === person.NAME.trim().toLowerCase();
            if (isMatch) console.log("DEBUG: Found child:", p.NAME);
            return isMatch;
        });

        if (matches.length > 0) {
            matches.forEach(child => {
                const childBox = document.createElement('a');
                childBox.className = 'box child-box';
                childBox.href = `profile.html?name=${encodeURIComponent(child.NAME)}`;
                childBox.innerHTML = `<h4>${child.NAME}</h4><p>Partner: ${child['PARTNER NAME'] || 'None'}</p>`;
                childrenContainer.appendChild(childBox);
            });
        } else {
            childrenContainer.innerHTML = "<p>No children found. Check that the column header is EXACTLY 'PARENT NAME' and the names match.</p>";
        }
    }
});
