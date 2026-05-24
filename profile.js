const csvUrl = 'https://docs.google.com/spreadsheets/d/1B60ciK2qtUW1nsg7NpFEIOweo_yseqlzW6-DQRfLtgI/export?format=csv&gid=1968708823';
const params = new URLSearchParams(window.location.search);
const personName = params.get('name');

Papa.parse(csvUrl, {
    download: true, header: true,
    complete: function(results) {
        const data = results.data;
        // Use a simpler search: Just look for the first match regardless of extra spaces
        const person = data.find(p => p.NAME && p.NAME.trim() === personName.trim());
        const container = document.getElementById('profile-container');

        if (!person) {
            container.innerHTML = "<h1>Data not found for: " + personName + "</h1><a href='index.html'>Back to Home</a>";
            return;
        }

        container.innerHTML = `
            <div class="top-row">
                <div class="box">
                    <h3>${person.NAME}</h3>
                    <p>Born: ${person['DOB 1'] || 'N/A'}</p>
                    <p>Passed Away: ${person['DOD 1'] || 'N/A'}</p>
                </div>
                <div class="box">
                    <h3>${person['PARTNER NAME'] || 'No Partner'}</h3>
                    <p>Partner</p>
                    <p>Born: ${person['DOB 2'] || 'N/A'}</p>
                    <p>Passed Away: ${person['DOD 2'] || 'N/A'}</p>
                </div>
            </div>
            <h3>Children</h3>
            <div class="children-row" id="children-container"></div>
        `;

        const childrenContainer = document.getElementById('children-container');
        // Simple search: Does the PARENT NAME column contain this name?
        const children = data.filter(p => p['PARENT NAME'] && p['PARENT NAME'].trim() === person.NAME.trim());

        if (children.length > 0) {
            children.forEach(child => {
                const childBox = document.createElement('a');
                childBox.className = 'box child-box';
                childBox.style.display = 'block'; // Ensure it renders
                childBox.style.margin = '10px';
                childBox.href = `profile.html?name=${encodeURIComponent(child.NAME)}`;
                childBox.innerHTML = `
                    <h4>${child.NAME}</h4>
                    <p>Partner: ${child['PARTNER NAME'] || 'None'}</p>
                    <div style="font-size: 0.8em; color: #666;">
                        ${child['DOB 1'] ? 'Born: ' + child['DOB 1'] : ''} <br>
                        ${child['DOD 1'] ? 'Passed Away: ' + child['DOD 1'] : ''}
                    </div>
                `;
                childrenContainer.appendChild(childBox);
            });
        } else {
            childrenContainer.innerHTML = "<p>No children found. (System could not match PARENT NAME to this person)</p>";
        }
    }
});
