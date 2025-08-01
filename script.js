const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

let isCelsius = true;
let currentTempC = null;

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  if (data.cod === "404") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  document.querySelector(".error").style.display = "none";
  document.querySelector(".city").innerHTML = data.name;
  currentTempC = data.main.temp;
  updateTemperature();

  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "img/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "img/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "img/rain.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "img/drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "img/mist.png";
  }

  document.querySelector(".weather").style.display = "block";
}

// Unit toggle logic
document.getElementById("unitSwitch").addEventListener("change", () => {
  isCelsius = !isCelsius;
  document.getElementById("unitLabel").textContent = isCelsius ? "°C" : "°F";
  updateTemperature();
});

function updateTemperature() {
  const temp = isCelsius
    ? currentTempC
    : (currentTempC * 9) / 5 + 32;
  document.querySelector(".temp").innerHTML = `${Math.round(temp)}°${isCelsius ? "C" : "F"}`;
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
