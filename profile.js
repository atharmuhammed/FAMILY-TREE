// REPLACE THIS URL WITH YOUR ?output=csv LINK
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv';

const params = new URLSearchParams(window.location.search);
const personSlug = params.get('name');

Papa.parse(csvUrl, {
    download: true, 
    header: true,
    complete: function(results) {
        const data = results.data;
        const person = data.find(p => p.Slug === personSlug);
        const container = document.getElementById('profile-container');

        if (!person) {
            container.innerHTML = "<h1>Person not found.</h1><a href='index.html'>Back to Home</a>";
            return;
        }

        // 1. Render Top Boxes (Parent + Spouse)
        container.innerHTML = `
            <div class="top-row">
                <div class="box"><h3>${person.NAME}</h3><p>Born: ${person['BORN DATE'] || 'N/A'}</p></div>
                <div class="box"><h3>${person['NAMES 1'] || 'No Spouse'}</h3><p>Spouse</p></div>
            </div>
            <h3>Children</h3>
            <div class="children-row" id="children-container"></div>
        `;

        // 2. Render Children Boxes
        const childrenContainer = document.getElementById('children-container');
        if (person.CHILDREN && person.CHILDREN.trim() !== "") {
            const childNames = person.CHILDREN.split('|').map(s => s.trim());
            
            childNames.forEach(childName => {
                // Find this child's data in the CSV by name
                const childData = data.find(p => p.NAME.toLowerCase() === childName.toLowerCase());
                
                const childBox = document.createElement('div');
                childBox.className = 'box child-box';
                
                // If childData exists, we link to their profile; otherwise, just show the name
                childBox.innerHTML = `
                    <h4>${childData ? `<a href="profile.html?name=${childData.Slug}">${childName}</a>` : childName}</h4>
                    <p>${childData ? (childData['NAMES 1'] || 'No Spouse') : 'No details available'}</p>
                `;
                childrenContainer.appendChild(childBox);
            });
        } else {
            childrenContainer.innerHTML = "<p>No children listed.</p>";
        }
    },
    error: function(err) {
        console.error("Error loading CSV:", err);
    }
});
