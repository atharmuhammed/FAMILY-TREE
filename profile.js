// Updated for your new Excel/Sheet structure
const csvUrl = 'https://docs.google.com/spreadsheets/d/1B60ciK2qtUW1nsg7NpFEIOweo_yseqlzW6-DQRfLtgI/export?format=csv&gid=1968708823';

const params = new URLSearchParams(window.location.search);
const personName = params.get('name'); // We now search by Name, not Slug

Papa.parse(csvUrl, {
    download: true, header: true,
    complete: function(results) {
        const data = results.data;
        const person = data.find(p => p.NAME && p.NAME.trim() === personName);
        const container = document.getElementById('profile-container');

        if (!person) {
            container.innerHTML = "<h1>Person not found.</h1><a href='index.html'>Back to Home</a>";
            return;
        }

        // Render Parent + Partner boxes
        container.innerHTML = `
            <div class="top-row">
                <div class="box">
                    <h3>${person.NAME}</h3>
                    <p>Born: ${person['DOB 1'] || 'N/A'}</p>
                    <p>Died: ${person['DOD 1'] || 'N/A'}</p>
                </div>
                <div class="box">
                    <h3>${person['PARTNER NAME'] || 'No Partner'}</h3>
                    <p>Partner</p>
                    <p>Born: ${person['DOB 2'] || 'N/A'}</p>
                </div>
            </div>
            <h3>Children</h3>
            <div class="children-row" id="children-container"></div>
        `;

        // NEW LOGIC: Find children by looking for rows where PARENT NAME matches this person
        const childrenContainer = document.getElementById('children-container');
        const children = data.filter(p => p['PARENT NAME'] && p['PARENT NAME'].trim() === person.NAME.trim());

        if (children.length > 0) {
            children.forEach(child => {
                const childBox = document.createElement('a'); // Make the whole box clickable
                childBox.className = 'box child-box';
                childBox.href = `profile.html?name=${encodeURIComponent(child.NAME)}`;
                childBox.innerHTML = `
                    <h4>${child.NAME}</h4>
                    <p>Partner: ${child['PARTNER NAME'] || 'None'}</p>
                `;
                childrenContainer.appendChild(childBox);
            });
        } else {
            childrenContainer.innerHTML = "<p>No children listed.</p>";
        }
    }
});
