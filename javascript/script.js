'use srict'

// const map = document.getElementById("")

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
  
        const coords = [latitude, longitude];
  
        map = L.map('map').setView(coords, 13);
  
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
  
        // This is for whenever we click on the map
        map.on('click', function (mapE) {
          mapEvent = mapE;
  
          // Remove hidden class on form
          form.classList.remove('hidden');
          inputDistance.focus();
        });
      },
      function () {
        alert('could not get location');
      }
    );  
    }        