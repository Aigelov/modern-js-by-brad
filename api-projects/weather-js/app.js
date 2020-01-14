// Init storage
const storage = new Store();

// Get stored location data
const weatherLocation = storage.getLocationData();

// Init weather object
// 51.059 71.421 Almaty
// 37.8267 -122.4233 Los Angeles
const weather = new Weather(weatherLocation.lat, weatherLocation.lon);
const ui = new UI;

// Get weather on DOM Load
document.addEventListener('DOMContentLoaded', getWeather);

// Change location event
document.querySelector('#w-change-btn').addEventListener('click', (event) => {
  event.preventDefault();

  const lat = document.querySelector('#lat').value;
  const lon = document.querySelector('#lon').value;

  weather.changeLocation(lat, lon);

  // Set location in Local Storage
  storage.setLocationData(lat, lon);

  // Get and display weather
  getWeather();

  // Close modal
  $('locModal').modal('hide');
});

function getWeather() {
  weather.getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.error(err));
}