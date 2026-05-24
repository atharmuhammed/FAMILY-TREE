const csvUrl = 'https://docs.google.com/spreadsheets/d/1B60ciK2qtUW1nsg7NpFEIOweo_yseqlzW6-DQRfLtgI/export?format=csv&gid=1968708823';
const params = new URLSearchParams(window.location.search);
const personName = params.get('name');

Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const data = results.data;
        const container = document.getElementById('profile-container');
        if (!container) return;

        const person = data.find(p => p.NAME && p.NAME.trim().toLowerCase() === (personName || "").trim().toLowerCase());

        if (!person) {
            container.innerHTML = "<h1>Person not found.</h1><a href='index.html'>Back to Home</a>";
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
                    <p>Born: ${person['DOB 2'] || person['DOB 1'] || 'N/A'}</p>
                    <p>Passed Away: ${person['DOD 2'] || 'N/A'}</p>
                </div>
            </div>
            <h2 class="children-heading">Children</h2>
            <div class="children-row" id="children-container"></div>
        `;

        const childrenContainer = document.getElementById('children-container');
        const children = data.filter(p => p['PARENT NAME'] && p['PARENT NAME'].trim().toLowerCase() === person.NAME.trim().toLowerCase());

        if (children.length > 0) {
            children.forEach(child => {
                const childBox = document.createElement('a');
                childBox.className = 'box child-box';
                childBox.style.textDecoration = 'none';
                childBox.style.color = 'black';
                childBox.href = `profile.html?name=${encodeURIComponent(child.NAME)}`;
                childBox.innerHTML = `
                    <h4>${child.NAME}</h4>
                    <p>Partner: ${child['PARTNER NAME'] || 'None'}</p>
                    <div style="font-size: 0.9em; color: #444;">
                        ${child['DOB 1'] ? 'Born: ' + child['DOB 1'] : ''} <br>
                        ${child['DOD 1'] ? 'Passed Away: ' + child['DOD 1'] : ''}
                    </div>
                `;
                childrenContainer.appendChild(childBox);
            });
        } else {
            childrenContainer.innerHTML = "<p style='text-align:center;'>No children listed.</p>";
        }
    }
});
