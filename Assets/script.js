function initPage() {
const cityEl = document.getElementById("enter-city");
const searchEl = document.getElementById("search-button");
const clearEl = document.getElementById("clear-history");
const nameEl = document.getElementById("city-name");
const currentPicEl = document.getElementById("current-picture");
const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity")
const currentWindEl = document.getElementById("wind");
const historyEl = document.getElementById("history");

var fivedayEl = document.getElementById("fiveday-header");
var todayWeatherEl =document.getElementById("today-weather");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

const APIKey = "";

function getWeather(cityName) {
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

}




}