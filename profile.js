const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv';

const params = new URLSearchParams(window.location.search);
const personSlug = params.get('name');

Papa.parse(csvUrl, {
    download: true, header: true,
    complete: function(results) {
        const data = results.data;
        const person = data.find(p => p.Slug === personSlug);
        const container = document.getElementById('profile-container');

        if (!person) {
            container.innerHTML = "<h1>Person not found.</h1><a href='index.html'>Back to Home</a>";
            return;
        }

        // Render Parent + Partner boxes
        container.innerHTML = `
            <div class="top-row">
                <div class="box"><h3>${person.NAME}</h3><p>Born: ${person['BORN DATE'] || 'N/A'}</p></div>
                <div class="box"><h3>${person['NAMES 1'] || 'No Partner'}</h3><p>Partner</p></div>
            </div>
            <h3>Children</h3>
            <div class="children-row" id="children-container"></div>
        `;

        // Render Children grid
        const childrenContainer = document.getElementById('children-container');
        if (person.CHILDREN && person.CHILDREN.trim() !== "") {
            const childNames = person.CHILDREN.split('|').map(s => s.trim());
            
            childNames.forEach(childName => {
                const childData = data.find(p => p.NAME.toLowerCase() === childName.toLowerCase());
                
                const childBox = document.createElement('div');
                childBox.className = 'box child-box';
                childBox.innerHTML = `
                    <h4>${childData ? `<a href="profile.html?name=${childData.Slug}">${childName}</a>` : childName}</h4>
                    <p>${childData ? (childData['NAMES 1'] || 'No Partner') : 'Data Pending'}</p>
                `;
                childrenContainer.appendChild(childBox);
            });
        } else {
            childrenContainer.innerHTML = "<p>No children listed.</p>";
        }
    }
});
