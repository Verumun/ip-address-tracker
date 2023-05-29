"use srict";

// const map = document.getElementById("")

const formEl = document.querySelector(".form");
const ipInputEl = document.getElementById("ip-input");
const ipEl = document.getElementById("ip-info");
const locationEl = document.getElementById("location-info");
const timezoneEl = document.getElementById("timezone-info");
const ispEl = document.getElementById("isp-info");

ipInputEl.addEventListener('submit', function(){
    console.log(ipInputEl.value)
})


let map = null;
let marker = null;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      initializeMap(coords);
      fetchGeoLocationData(coords);
    },
    function () {
      alert("Could not get location");
    }
  );
}

function initializeMap(coords) {
  map = L.map("map").setView(coords, 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  marker = L.marker(coords).addTo(map);
}

function fetchGeoLocationData(coords) {
  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((data) => renderResults(data, coords))
    .catch((error) => displayError(error));
}

//------ Form
formEl.onsubmit = (e) => {
  e.preventDefault();
  const ipAddress = ipInputEl.value;

  fetch(`https://ipapi.co/${ipAddress}/json/`)
    .then((res) => res.json())
    .then((data) => {
      const coords = [data.latitude, data.longitude];
      map.setView(coords, 13);
      marker.setLatLng(coords);
      renderResults(data, coords);
    })
    .catch((error) => displayError(error));
};

function renderResults(data, coords) {
  if (!data || data.error) {
    throw new Error("Invalid data received");
  }

  ipEl.textContent = data.ip;
  locationEl.textContent = `${data.city}, ${data.region}, ${data.country_name}`;

  if (data.utc_offset !== null) {
    timezoneEl.textContent =
      "UTC: " + data.utc_offset.slice(0, 3) + ":" + data.utc_offset.slice(3);
  } else {
    timezoneEl.textContent = data.timezone;
  }

  ispEl.textContent = data.org;
  map.setView(coords, 13);
  marker.setLatLng(coords);
  marker.bindPopup(`<b>${data.ip}</b>`).openPopup();
}

function displayError(error) {
  console.log(error);
}





// draft Code
// const map = L.map('map').setView([0, 0], 13);

// L.tileLayer(tileUrl, {
//     maxZoom: 18,
//     attribution: false,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(map);

// const locationIcon = L.icon({
//     iconUrl: 'images/icon-location.svg',
//     iconSize: [35, 35],
//     iconAnchor: [15, 15]
// });

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude } = position.coords;
//       const { longitude } = position.coords;
//     //   console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//       const coords = [latitude, longitude];

//       let map = L.map("map").setView(coords, 13);

//       L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//     },
//     function () {
//       alert("could not get location");
//     }
//     );
    
//     renderResults()
// }



// formEl.onsubmit = (e) => {
//   e.preventDefault();

//   fetch(`https://ipapi.co/${ipInputEl.value}/json/`)
//     .then((res) => res.json())
//     .then((data) => renderResults(data))
//     .catch((error) => displayError(error));
// };

// fetch("https://ipapi.co/json/")
//   .then((res) => res.json())
//   .then((data) => renderResults(data))
//   .catch((error) => displayError(error));


// function renderResults(data) {
//   if (data.error) {
//     throw `${data.reason}`;
//   }

//   ipEl.textContent = data.ip;
//   locationEl.textContent = `${data.city}, ${data.region}, ${data.country_name}`;

//   if (data.utc_offset !== null) {
//     timezoneEl.textContent =
//       "UTC: " + data.utc_offset.slice(0, 3) + ":" + data.utc_offset.slice(3);
//   } else {
//     timezoneEl.textContent = data.timezone;
//   }

//   ispEl.textContent = data.org;
//   map.setView([data.latitude, data.longitude], 13);
//   marker.setLatLng([data.latitude, data.longitude]);
//   marker.bindPopup(`<b>${data.ip}</b>`).openPopup();
// }




// function displayError(e) {
//     // errorMsgEl.textContent = e;
//     console.log(e)
//     // modal.showModal();
// }
