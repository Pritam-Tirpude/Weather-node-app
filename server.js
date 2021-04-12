// Intialize a empty JS object to act as endpoint for all routes
let projectData = {};

// Require express to run server and routes
const express = require("express");

// Start an insatance an app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Middleware to communicate from server to brwoser*/

// cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize main project folder
app.use(express.static("website"));

// Server setup
const port = process.env.port || 3000;

const server = app.listen(port, listening);

function listening() {
  console.log(`Server running on localhost : ${port}`);
}

// POST route
const data = [];

app.post("/getWeather", getWeatherInfo);

function getWeatherInfo(req, res) {
  const newEntries = {
    date: req.body.date,
    temp: req.body.temp,
    tempMin: req.body.tempMin,
    tempMax: req.body.tempMax,
    humidity: req.body.humidity,
    weather: req.body.weather,
    country: req.body.country,
    area: req.body.area,
    wind_speed: req.body.wind_speed,
    wind_direction: req.body.wind_direction,
    feelings: req.body.feelings,
  };

  data.push(newEntries);
  projectData = data;

  console.log(projectData);
  res.send(projectData);
}

// GET ROUTE
app.get("/all", getForecastDetails);
function getForecastDetails(req, res) {
  let projectData = data;
  console.log(projectData);
  res.send(projectData);
}
