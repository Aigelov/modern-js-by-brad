class Weather {
  constructor(lat, lon) {
    this.apiKey = '40bfc4e270dffa76ac5539e0fd71e33a';
    this.hostname = 'https://api.darksky.net';
    this.proxy = 'https://cors-anywhere.herokuapp.com';
    this.lat = lat;
    this.lon = lon;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `${this.proxy}/${this.hostname}/forecast/${this.apiKey}/${this.lat},${this.lon}`
    );
    if (!response.ok) {
      throw new Error('Error occured');
    }
    return await response.json();
  }

  // Change weather location
  changeLocation(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
}