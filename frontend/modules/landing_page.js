import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data  
  const url = config.backendEndpoint + "cities";
  try {
    let respCities = await fetch(url);
    let respCitiesJSON = await respCities.json();
    return respCitiesJSON;
    console.log(respCitiesJSON);
  } catch(err) {
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const parentComponent = document.getElementById("data");
  const div = document.createElement("div");
  div.setAttribute('class','col-12 col-sm-6 col-lg-3 mb-4');
  div.innerHTML = `
    <a id="${id}" href="pages/adventures/?city=${id}">
      <div class="tile">
        <img src="${image}" />
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
  `;
  parentComponent.appendChild(div);
}

export { init, fetchCities, addCityToDOM };
