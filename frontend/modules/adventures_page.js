
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const queryParam = new URLSearchParams(search);
  return queryParam.get("city");

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const url = config.backendEndpoint + "adventures?city="+city;
  try {
    let respAdventures = await fetch(url);
    let respAdventuresJSON = await respAdventures.json();
    return respAdventuresJSON;
  } catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const parentComponent = document.getElementById("data"); 
  adventures.forEach(element => {
    let div = document.createElement("div");
    div.setAttribute('class','col-12 col-sm-6 col-lg-3 mb-4 activity-card');
    div.innerHTML = `
      <a class="" id="${element.id}" href="detail/?adventure=${element.id}">
        <img src="${element.image}" />
        <p class="category-banner">${element.category}</p>      
        <div class="row">
          <span class="col-6">${element.name}</span>
          <span class="col-6 allign-right">${element.costPerHead}</span>
        </div>
        <div class="row">
          <span class="col-6">Duration</span>
          <span class="col-6 allign-right">${element.duration}</span>
        </div>
      </a>
    `; 
    parentComponent.appendChild(div);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let finalList = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].duration >= low && list[i].duration <= high) {
      finalList.push(list[i])
    }
  }
  return finalList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let finalList = [];
  for (let i = 0; i < list.length; i++) {
    if (categoryList.includes(list[i].category)) {
      finalList.push(list[i])
    }
  }
  return finalList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods 
    if(filters['category'].length == 0){
      return list;
    } 
    
    let finalList = [];
    for (let i = 0; i < list.length; i++) {
            
        let dArr = filters['duration'].split("-");
        let sHr = parseInt(dArr[0]);
        let eHr = parseInt(dArr[1]);

        if (filters['category'].length > 0 && (filters['duration'])) {
          if(filters['category'].includes(list[i].category) && (list[i].duration >= sHr && list[i].duration <= eHr)) {
            finalList.push(list[i]);
          }
        } else if(filters['category'].length > 0 && filters['category'].includes(list[i].category)) {
          finalList.push(list[i]);
        } else if ((filters['duration']) && (list[i].duration >= sHr && list[i].duration <= eHr)) {
          finalList.push(list[i])
        }                           
    }
    // Place holder for functionality to work in the Stubs
    return finalList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  // return { duration: duration, category: category };
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const parentComponent1 = document.getElementById("category-list"); 
  filters['category'].forEach(el => {
      let p = document.createElement("p");
      p.setAttribute('class','col-sm-2 mb-4');
      p.innerHTML = ` ${el} `; 
      parentComponent1.appendChild(p);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
