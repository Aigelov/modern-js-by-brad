class UI {
  constructor() {
    this.location = document.querySelector('#w-location');
    this.desc = document.querySelector('#w-desc');
    this.string = document.querySelector('#w-string');
    this.details = document.querySelector('#w-details');
    this.icon = document.querySelector('#w-icon');
    this.humidity = document.querySelector('#w-humidity');
    this.feelsLike = document.querySelector('#w-feels-like');
    this.dewpoint = document.querySelector('#w-dewpoint');
    this.wind = document.querySelector('#w-wind');
  }

  /**
   *
   * @param weather
   * @param weather.timezone
   * @param weather.currently
   * @param weather.currently.summary
   * @param weather.currently.temperature
   * @param weather.currently.humidity
   * @param weather.currently.apparentTemperature
   * @param weather.currently.dewPoint
   * @param weather.currently.windSpeed
   */
  paint(weather) {
    const location = weather.timezone.split('/');
    this.location.textContent = location[1];
    this.desc.textContent = weather.currently.summary;
    this.string.textContent = weather.currently.temperature.toFixed(0) + ' C';
    this.icon.setAttribute('src', 'https://darksky.net/images/weather-icons/cloudy.png');
    this.icon.setAttribute('width', '50px');
    this.humidity.textContent = `Relative Humidity: ${weather.currently.humidity * 100}%`;
    this.dewpoint.textContent = `Dew Point: ${weather.currently.dewPoint} C`;
    this.feelsLike.textContent = `Feels Like: ${weather.currently.apparentTemperature} C`;
    this.wind.textContent = `Wind: ${weather.currently.windSpeed} km/h`;
  }
}