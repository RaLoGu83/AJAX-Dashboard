get_data_az(); // Llamo a la función para que se haga por defecto 

const order = document.getElementById("order");
order.addEventListener("change", function(e){
  const OptionValue = e.target.value;

  if (OptionValue === "asc"){
    console.log("Orden ascendente")
    get_data_az();
  }
  else {
    console.log("Orden descendente")
    get_data_za();
  }
} );


function get_data_az() {
    // https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
    // https://stackoverflow.com/questions/74064662/how-to-fetch-api-data-and-display-it

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          data.sort((a, b) => a.name.localeCompare(b.name));
            let headers = `
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
          </tr>`;
            document.querySelector("thead").innerHTML = headers;

            let rows = "";
            data.forEach((facility) => {
                rows += `
              <tr>
                <td>${facility.name}</td>
                <td>${facility.email}</td>
                <td>${facility.phone}</td>
                <td>${facility.address.city}</td>
              </tr>
            `;
            });
            document.querySelector("tbody").innerHTML = rows;
        });
};

function get_data_za() {
    // https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
    // https://stackoverflow.com/questions/74064662/how-to-fetch-api-data-and-display-it

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          data.sort((a, b) => b.name.localeCompare(a.name));
            let headers = `
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
          </tr>`;
            document.querySelector("thead").innerHTML = headers;

            let rows = "";
            data.forEach((facility) => {
                rows += `
              <tr>
                <td>${facility.name}</td>
                <td>${facility.email}</td>
                <td>${facility.phone}</td>
                <td>${facility.address.city}</td>
              </tr>
            `;
            });
            document.querySelector("tbody").innerHTML = rows;
        });
};