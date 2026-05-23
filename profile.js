const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5NHtG504CerQUBm-rCc1X90dmNTsx9JOzKi3uFvPWq3yXXtSUr38g-TFlAAR6gFsnvC-9LEGSANv3/pub?output=csv'; // MUST end in ?output=csv

const params = new URLSearchParams(window.location.search);
const personSlug = params.get('name');

Papa.parse(csvUrl, {
    download: true, header: true,
    complete: function(results) {
        const person = results.data.find(p => p.Slug === personSlug);
        const container = document.getElementById('profile-container');

        if (!person) {
            container.innerHTML = "<h1>Person not found.</h1><a href='index.html'>Back to Home</a>";
            return;
        }

        // Fill the boxes
        container.innerHTML = `
            <div class="top-row">
                <div class="box"><h3>${person.NAME}</h3><p>Born: ${person['BORN DATE']}</p></div>
                <div class="box"><h3>${person.SPOUSE || 'N/A'}</h3><p>Spouse</p></div>
            </div>
            <h3>Children</h3>
            <div class="children-row">${person.CHILDREN || 'No children listed'}</div>
        `;
    }
});
