import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const url = config.backendEndpoint + "reservations/";
  try {
    let resReservations = await fetch(url);
    let resReservationsJSON = await resReservations.json();
    return resReservationsJSON;
  } catch(err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if(reservations.length == 0) {
    document.getElementById("no-reservation-banner").style.display = 'block';
    document.getElementById("reservation-table-parent").style.display = 'none'; 
    return false;
  } 
  document.getElementById("no-reservation-banner").style.display = 'none';
  document.getElementById("reservation-table-parent").style.display = 'block'; 
  const tbodyComponent = document.getElementById("reservation-table");
      reservations.forEach(element => { 
        let parentTrComponent = document.createElement("tr");
        // parentGalleryComponent.setAttribute('class','activity-card-image');
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const frmtTime = new Date(element.time);
        const frmtdate = new Date(element.date);
        let hr = frmtTime.getHours(); 
        const min = frmtTime.getMinutes() < 10 ? '0'+frmtTime.getMinutes() : frmtTime.getMinutes();
        const sec = frmtTime.getSeconds() < 10 ? '0'+frmtTime.getSeconds() : frmtTime.getSeconds();
        const ampm = hr >= 12 ? 'pm' : 'am'; 
        hr = hr % 12;
        hr = hr ? hr : 12;
        // hr = hr < 10 ? '0'+hr : hr;
        parentTrComponent.innerHTML = `
          <td scope="col">${element.id}</td>
          <td scope="col">${element.name}</td>
          <td scope="col">${element.adventureName}</td>
          <td scope="col">${element.person}</td>
          <td scope="col">${frmtdate.getDate()}/${frmtdate.getMonth()+1}/${frmtdate.getFullYear()}</td>
          <td scope="col">${element.price}</td>
          <td scope="col">${frmtTime.getDate()} ${month[frmtTime.getMonth()]} ${frmtTime.getFullYear()}, ${hr}:${min}:${sec} ${ampm}</td>
          <td scope="col"><span id="${element.id}"><a href="detail/?adventure=${element.adventure}">Visit Adventure</a></span></td>
        `; 
        tbodyComponent.appendChild(parentTrComponent);
      });  
  
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
