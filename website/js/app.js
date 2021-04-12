// Global instance variables
let zipCode;
let generateButton = document.getElementById("generate");
let tempHolder = document.getElementById("temp");
let tempLabel = document.getElementById("tempLabel");
let minTempLabel = document.getElementById("min-temp-label");
let minTempHolder = document.getElementById("temp-min");
let maxTempLabel = document.getElementById("max-temp-label");
let maxTempHolder = document.getElementById("temp-max");
let humidityLabel = document.getElementById("humidity-label");
let humidityHolder = document.getElementById("humidity");
let weatherLabel = document.getElementById("weather-label");
let weatherHolder = document.getElementById("weather");
let countryLabel = document.getElementById("country-label");
let countryHolder = document.getElementById("country");
let areaLabel = document.getElementById("area-label");
let areaHolder = document.getElementById("area");
let windSpeedLabel = document.getElementById("wind-speed-label");
let windSpeedHolder = document.getElementById("wind-speed");
let windDirectionLabel = document.getElementById("wind-direction-label");
let windDirectionHolder = document.getElementById("wind-direction");
let feelingsLabel = document.getElementById("feelings-lablel");
let feelingsHolder = document.getElementById("feeling-holder");
let COUNTRY_CODE = ",IN";
let API_ID = "&appid=";
let UNITS = "&units=metric";

// Initialize API KEY
const API_KEY = "869ee5bbe03c7234b3c050fb595183db";

// Initialize the base URL
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// function to post data
const postData = async (url = "", data = {}) => {
  console.log(data);

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// function to get WEB API data
const getWeatherApiData = async (zipCode) => {
  const weatherResponse = await fetch(
    BASE_URL + zipCode + COUNTRY_CODE + API_ID + API_KEY + UNITS
  );
  console.log(weatherResponse);

  try {
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

// add event listener to button and function to grab data
generateButton.addEventListener("click", getWeatherForecast);

async function getWeatherForecast(e) {
  e.preventDefault();

  if (document.getElementById("zipCode").value != "") {
    zipCode = document.getElementById("zipCode").value;
    let jsonObj = await getWeatherApiData(zipCode);
    let currentDate = new Date().toDateString();
    let currretFeelings = document.getElementById("feelings").value;
    let currentTemp = Math.round(jsonObj.main.temp);
    let minTemp = Math.round(jsonObj.main.temp_min);
    let maxTemp = Math.round(jsonObj.main.temp_max);
    let humidityWeather = jsonObj.main.humidity;
    let currentWeather = jsonObj.weather[0].main;
    let currentCountry = jsonObj.sys.country;
    let currentArea = jsonObj.name;
    let currentWindSpeed = jsonObj.wind.speed;
    let currentWindDirection = jsonObj.wind.deg;

    postData("/getWeather", {
      date: currentDate,
      temp: currentTemp,
      tempMin: minTemp,
      tempMax: maxTemp,
      humidity: humidityWeather,
      weather: currentWeather,
      country: currentCountry,
      area: currentArea,
      wind_speed: currentWindSpeed,
      wind_direction: currentWindDirection,
      feelings: currretFeelings,
    }).then(updateUI());

    document.getElementById("zipCode").value = "";
    document.getElementById("feelings").value = "";
  }
}

const updateUI = async () => {
  const request = await fetch("/all");

  try {
    const allData = await request.json();

    tempLabel.innerHTML = `<h5>Temperature</h5>`;
    tempHolder.innerHTML = allData[allData.length - 1].temp + `&deg;C`;
    tempHolder.classList.add("tempText");

    minTempLabel.innerHTML = `<h5>Min Temp</h5>`;
    minTempHolder.innerHTML = allData[allData.length - 1].tempMin + `&deg;C`;
    minTempHolder.classList.add("max-min-text");

    maxTempLabel.innerHTML = `<h5>Max Temp</h5>`;
    maxTempHolder.innerHTML = allData[allData.length - 1].tempMax + `&deg;C`;
    maxTempHolder.classList.add("max-min-text");

    humidityLabel.innerHTML = `<h5>Humidity</h5>`;
    humidityHolder.innerHTML = allData[allData.length - 1].humidity + `&#37;`;
    humidityHolder.classList.add("humid-weather-text");

    weatherLabel.innerHTML = `<h5>Weather</h5>`;
    weatherHolder.innerHTML = allData[allData.length - 1].weather;
    weatherHolder.classList.add("humid-weather-text");

    countryLabel.innerHTML = `<h5>Country</h5>`;
    let india = allData[allData.length - 1].country;
    if (india === "IN") {
      countryHolder.innerHTML = "India";
      countryHolder.classList.add("country-area-text");
    }

    areaLabel.innerHTML = `<h5>Zone</h5>`;
    areaHolder.innerHTML = allData[allData.length - 1].area;
    areaHolder.classList.add("country-area-text");

    windSpeedLabel.innerHTML = `<h5>Wind Speed</h5>`;
    let windSpeed = Math.round(allData[allData.length - 1].wind_speed);
    let convertToKm = (windSpeed * 18) / 5;
    windSpeedHolder.innerHTML = convertToKm + `km/h`;
    windSpeedHolder.classList.add("wind-direction-text");

    windDirectionLabel.innerHTML = `<h5>Wind Direction</h5>`;
    windDirectionHolder.innerHTML =
      allData[allData.length - 1].wind_direction + `&deg;`;
    windDirectionHolder.classList.add("wind-direction-text");

    feelingsLabel.innerHTML = `<h5>Feelings</h5>`;
    feelingsHolder.innerHTML = allData[allData.length - 1].feelings;
    feelingsHolder.classList.add("feelings-text");
  } catch (error) {
    console.log("Error:", error);
  }
};
