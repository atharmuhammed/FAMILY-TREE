const csvUrl = 'YOUR_CSV_LINK_HERE'; // MUST end in ?output=csv

const params = new URLSearchParams(window.location.search);
const personSlug = params.get('name');

Papa.parse(csvUrl, {
    download: true, header: true,
    complete: function(results) {
        const data = results.data;
        const person = data.find(p => p.Slug === personSlug);
        const container = document.getElementById('profile-container');

        if (!person) {
            container.innerHTML = "<h1>Person not found.</h1>";
            return;
        }

        // 1. Render Top Boxes
        container.innerHTML = `
            <div class="top-row">
                <div class="box"><h3>${person.NAME}</h3><p>Born: ${person['BORN DATE']}</p></div>
                <div class="box"><h3>${person.SPOUSE || 'N/A'}</h3><p>Spouse</p></div>
            </div>
            <h3>Children</h3>
            <div class="children-row" id="children-container"></div>
        `;

        // 2. Render Children Boxes
        const childrenContainer = document.getElementById('children-container');
        if (person.CHILDREN) {
            const childNames = person.CHILDREN.split('|').map(s => s.trim());
            
            childNames.forEach(childName => {
                // Find this child's data in the CSV
                const childData = data.find(p => p.NAME.toLowerCase() === childName.toLowerCase());
                
                const childBox = document.createElement('div');
                childBox.className = 'box child-box';
                childBox.innerHTML = `
                    <h4><a href="profile.html?name=${childData ? childData.Slug : '#'}">${childName}</a></h4>
                    <p>${childData ? (childData.SPOUSE || 'No Spouse') : 'Data Pending'}</p>
                `;
                childrenContainer.appendChild(childBox);
            });
        }
    }
});
