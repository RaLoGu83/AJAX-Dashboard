
function get_data() {
    // https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
    // https://stackoverflow.com/questions/74064662/how-to-fetch-api-data-and-display-it

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            let headers = `
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Adress</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
          </tr>`;
            document.querySelector("thead").innerHTML = headers;

            let rows = "";
            data.forEach((facility) => {
                rows += `
              <tr>
                <td>${facility.name}</td>
                <td>${facility.username} </td>
                <td>${facility.email}</td>
                <td>${facility.adress}</td>
                <td>${facility.phone}</td>
                <td>${facility.website}</td>
                <td>${facility.company}</td>
              </tr>
            `;
            });
            document.querySelector("tbody").innerHTML = rows;
        });
};



get_data();