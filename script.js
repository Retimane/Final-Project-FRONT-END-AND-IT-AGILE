const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Add your own key for local testing. Never commit a real key.
const currentWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const weatherForecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast";

const currentWeatherSection = document.getElementById("current-weather");
const searchLocationSection = document.getElementById("search-location");
const weatherForecastSection = document.getElementById("weather-forecast");
const locationInput = document.getElementById("location-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");
const weatherCondition = document.getElementById("weather-condition");
const temperature = document.getElementById("temperature");
const forecastList = document.getElementById("forecast-list");

searchBtn.addEventListener("click", searchLocation);

function searchLocation() {
    const location = locationInput.value.trim();
    if (location) {
        fetch(`${currentWeatherApiUrl}?q=${location}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
                fetch(`${weatherForecastApiUrl}?q=${location}&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(data => displayWeatherForecast(data));
            })
            .catch(error => console.error(error));
    }
}

function fetchCurrentWeather(location) {
    fetch(`${currentWeatherApiUrl}?q=${location}&appid=${apiKey}`)
       .then(response => response.json())
       .then(data => displayCurrentWeather(data));
}

function fetchWeatherForecast(location) {
    fetch(`${weatherForecastApiUrl}?q=${location}&appid=${apiKey}`)
       .then(response => response.json())
       .then(data => displayWeatherForecast(data));
}

function displayCurrentWeather(data) {
    const weatherIconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.src = weatherIconUrl;
    weatherCondition.textContent = data.weather[0].description;
    temperature.textContent = `${Math.round(data.main.temp-273.15)}°C`;
}

function displayWeatherForecast(data) {
    const forecast = data.list; // data.list is an array of forecast objects
    forecastList.innerHTML = "";
    forecast.forEach(day => {
        const li = document.createElement("li");
        li.textContent = `${day.dt_txt} - ${day.weather[0].description} - ${Math.round(day.main.temp - 273.15)}°C`; // Convert Kelvin to Celsius
        forecastList.appendChild(li);
    });
}

// Initialize current weather and forecast
fetchCurrentWeather("London"); // default location
fetchWeatherForecast("London"); // default location