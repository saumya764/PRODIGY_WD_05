const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const locationInput = document.getElementById("location-input");
const weatherInfo = document.getElementById("weather-info");

// Search by city
searchBtn.addEventListener("click", () => {
  const city = locationInput.value;
  if(city) fetchWeather(city);
});

// Search by user location
locationBtn.addEventListener("click", () => {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    }, () => alert("Unable to get your location"));
  } else {
    alert("Geolocation not supported");
  }
});

// Fetch weather by city
function fetchWeather(city){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(err => alert("City not found"));
}

// Fetch weather by coordinates
function fetchWeatherByCoords(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(err => alert("Weather data unavailable"));
}

// Display weather data
function displayWeather(data){
  if(data.cod !== 200){
    weatherInfo.innerHTML = `<p>${data.message}</p>`;
    return;
  }

  weatherInfo.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Condition: ${data.weather[0].main}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${data.wind.speed} m/s</p>
  `;
}
