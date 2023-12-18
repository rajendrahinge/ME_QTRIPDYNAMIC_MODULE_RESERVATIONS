import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const queryParam = new URLSearchParams(search);
  // Place holder for functionality to work in the Stubs
  return queryParam.get("adventure");
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {

  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  const url = config.backendEndpoint + "adventures/detail?adventure="+adventureId;
  try {
    let respAdventure = await fetch(url);
    let respAdventureJSON = await respAdventure.json();
    // Place holder for functionality to work in the Stubs
    return respAdventureJSON;
  } catch(err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}


//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;
  document.getElementById("adventure-content").textContent = adventure.content;
  
  const galleryComponent = document.getElementById("photo-gallery");
  adventure.images.forEach(element => { 
      let parentGalleryComponent = document.createElement("div");
      // parentGalleryComponent.setAttribute('class','activity-card-image');
      parentGalleryComponent.innerHTML = `
        <img src="${element}" class="activity-card-image" alt="...">
      `; 
      galleryComponent.appendChild(parentGalleryComponent);
   });  

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  const galleryComponent = document.getElementById("photo-gallery");
  const parentGalleryComponent = document.createElement("div");
  parentGalleryComponent.setAttribute('class','carousel slide');
  parentGalleryComponent.setAttribute('id','carouselExampleIndicators');
  parentGalleryComponent.setAttribute('data-bs-ride','carousel');
  
  let i = 0;
  let div1 = document.createElement("div");
  div1.setAttribute('class','carousel-indicators');
  let div2 = document.createElement("div");
  div2.setAttribute('class','carousel-inner');
  images.forEach(element => {   
    let button = document.createElement("button");
    button.setAttribute('type','button');
    button.setAttribute('data-bs-target','#carouselExampleIndicators');
    button.setAttribute('data-bs-slide-to',i);
    button.setAttribute('aria-label','Slide'+i+1);
    div1.appendChild(button);
    
    let divCarouselItem = document.createElement("div");
    if(i == 0) {
      divCarouselItem.setAttribute('class','carousel-item active');
    } else {
      divCarouselItem.setAttribute('class','carousel-item');
    }      
    divCarouselItem.innerHTML = `
      <img src="${element}" class="d-block w-100 " alt="...">
    `; 
    div2.appendChild(divCarouselItem);
    i++;
  });

  // class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"
  let button1 = document.createElement("button");
  button1.setAttribute('class','carousel-control-prev')
  button1.setAttribute('type','button');
  button1.setAttribute('data-bs-target','#carouselExampleIndicators');
  button1.setAttribute('data-bs-slide','prev');
  button1.innerHTML = `
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `; 

  // class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"
  let button2 = document.createElement("button");
  button2.setAttribute('class','carousel-control-next')
  button2.setAttribute('type','button');
  button2.setAttribute('data-bs-target','#carouselExampleIndicators');
  button2.setAttribute('data-bs-slide','next');
  button2.innerHTML = `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  `; 

  parentGalleryComponent.appendChild(div1);
  parentGalleryComponent.appendChild(div2);
  parentGalleryComponent.appendChild(button1);
  parentGalleryComponent.appendChild(button2);

  galleryComponent.appendChild(parentGalleryComponent);  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available) {

    document.getElementById("reservation-panel-available").style.display = 'block';
    document.getElementById("reservation-panel-sold-out").style.display = 'none';

  } else {

    document.getElementById("reservation-panel-sold-out").style.display = 'block';
    document.getElementById("reservation-panel-available").style.display = 'none';

  }

  document.getElementById("reservation-person-cost").textContent = adventure.costPerHead
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent = adventure.costPerHead*persons;
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    let myForm = document.getElementById("myForm");  
    const inputs = document.getElementById("myForm").elements;
    myForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const postVal = {
        name: inputs['name'].value,
        date: inputs['date'].value,
        person: inputs['person'].value,
        adventure: adventure.id
    };          
          const options = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(postVal),
          };


          fetch(config.backendEndpoint + "reservations/new", options).then(data => {
                  if (!data.ok) {
                    alert('Error!');
                  }
                  alert('Success!');
                  location.reload();
                  // console.log(data.json());
          }).then(update => {
              
          }).catch(e => {
            alert('Error!');
          });       
      
      // handle submit

    });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) { 
    document.getElementById("reserved-banner").style.display = 'block'; 
  } else { 
    document.getElementById("reserved-banner").style.display = 'none'; 
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
