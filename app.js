const order = document.getElementById("order");
const resul = document.getElementById("resul");
const loading = document.getElementById("result");
const muchRes = document.getElementById("muchRes");
const search = document.getElementById("search");
const firstBtn = document.getElementById("first");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const lastBtn = document.getElementById("last");
loading.textContent = "";
let currentPage = 1;
let totalPages = 1;

order.addEventListener("change", function () {
  loading.textContent = "Loading...";
  get_data();
});

muchRes.addEventListener("change", function () {
  loading.textContent = "Loading...";
  get_data();
});

search.addEventListener("input", function () {
  loading.textContent = "Loading...";
  get_data();
});

firstBtn.addEventListener("click", function () {
  currentPage = 1;
  get_data();
});

prevBtn.addEventListener("click", function () {
  currentPage--;
  get_data();
});

nextBtn.addEventListener("click", function () {
  currentPage++;
  get_data();
});

lastBtn.addEventListener("click", function () {
  currentPage = totalPages;
  get_data();
});

async function get_data() {
  // https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
  // https://stackoverflow.com/questions/74064662/how-to-fetch-api-data-and-display-it
  
  try {
    loading.textContent = "Loading...";

    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // Verificar si la respuesta es correcta
    if (!response.ok) {
      throw new Error("Server response error");
    }

    let data = await response.json();

    // Filtrar por nombre
    if (search.value.trim() !== "") {
      data = data.filter(user =>
        user.name.toLowerCase().includes(search.value.toLowerCase())
      );
    }

    // Elegir orden
    if (order.value === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Limitar la cantidad de datos mostrados y paginación
    let resultsPerPage = parseInt(muchRes.value);
    totalPages = Math.ceil(data.length / resultsPerPage);

    // En vez de deshabilitar los botones, se limita el rango y se pueden usar para refrescar los datos
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    let start = (currentPage - 1) * resultsPerPage;
    let end = start + resultsPerPage;

    data = data.slice(start, end);

    resul.textContent = "Page " + currentPage + " of " + totalPages;

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

    loading.textContent = "";

  } catch (error) {
    console.error("Error fetching data:", error);

    loading.textContent = "";
    document.querySelector("thead").innerHTML = "";
    document.querySelector("tbody").innerHTML =
      `<tr><td colspan="4" class="text-danger">Error loading data from API</td></tr>`;

    resul.textContent = "Error loading data";
  }
}


get_data(); // Llamo a la función para que se haga por defecto 