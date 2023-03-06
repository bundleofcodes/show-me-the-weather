
let cityEl = document.getElementById("enter-city");
let searchEl = document.getElementById("search-button");
let clearEl = document.getElementById("clear-history");
let nameEl = document.getElementById("city-name");
let currentPicEl = document.getElementById("current-picture");
let currentTempEl = document.getElementById("temperature");
let currentHumidityEl = document.getElementById("humidity")
let currentWindEl = document.getElementById("wind");
let historyEl = document.getElementById("history");

var fivedayEl = document.getElementById("fiveday-header");
var todayWeatherEl = document.getElementById("today-weather");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

let apiKey = "e976410ae238d2e283ac7ed7040e14e2";

function getWeather(cityName) {
    // Execute a current weather get request from open weather api
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
}


let citiesArray = [];


function init() {

    generateCityList();
}

// $(function () {
//     $("#enter-city").autocomplete({
//         source: citiesArray
//     });
// });

function Enter(event) {
    if (event.key == "Enter") {
        findCurrentWeather();
        $("#enter-city").val("");
    }
}

$("#search-button").on("click", function () {
    findCurrentWeather();
    $("#enter-city").val("");
    generateFiveDayForecast(weatherData);
});

$("#clear-button").on("click", function () {
    localStorage.clear();
    $(searchedCities).empty();
});

async function findCurrentWeather() {
    let enterCity = $("#enter-city").val();
    console.log("City:", enterCity);
    let requestWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + enterCity + "&appid=e976410ae238d2e283ac7ed7040e14e2";
    fetch(requestWeather, {
        method: 'GET', 
        credentials: 'same-origin', 
        redirect: 'follow', 
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            nameEl.textContent = data.name;
            currentTempEl.textContent = "Current Temperature: " + data.main.temp + " \u2109";
            currentHumidityEl.textContent = "humidity: " + data.main.humidity + "%";
            currentWindEl.textContent = "Wind: " + data.wind.speed + " MPH";
            // var image = $('<img class="imgsize">').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
            // currentPicEl.appendChild(image);     
            let locationIcon = document.querySelector('#current-picture');
            let icon =`https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            locationIcon.setAttribute('src', icon)        
        });
    // let response = await fetch(requestWeather);
    // console.log("response",response);
    // if (response.status !== 200) {
    //     alert("No city found.")
    // }
    // let weatherData = await response.json();

    // generateTodayForecast(weatherData);
    // generateFiveDayForecast(weatherData);
}

function generateTodayForecast(weatherData) {
    $("#today-weather").empty();
    let NameEl = weatherData.name;
    console.log(weatherData);
    let currentTime = dayjs.unix(weatherData.list[0].dt).format('MMMM, DD YYYY');
    // let currentPicEl = $("<img>").attr(src, "https://openweathermap.org/img/wn/" = weatherData.list[0].weather[0].picture + "@2x.png");
    let cityTimeisplay = $("<h2>").text(currentCity + "" + currentTime).append("current-picture");

    let currentTempEl = $("<h3>").text("Temp: " + weatherData.list[0].main.temp + "\u2109");
    let currentWindEl = $("<h3>").text("Wind: " + weatherData.list[0].wind.speed + "MPH");
    // let currentPicEl = $("<img>").attr(src, "https://openweathermap.org/img/wn/" = weatherData.list[0].weather[0].picture + "@2x.png");
    let currentHumidityEl = $("<h3>").text("Humidity: " + weatherData.list[0].main.humidity + "%");
    $("#today-weather").append(cityTimeDisplay, currentTempEl, currentWindEl, currentHumidityEl);

    storeSearchedCities(weatherData);
}

function generateFiveDayForecast(weatherData) {
    // let requestWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + enterCity + "&appid=e976410ae238d2e283ac7ed7040e14e2";
    fetch(requestWeather, {
        method: 'GET', 
        credentials: 'same-origin', 
        redirect: 'follow', 
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
    $(container - forecast).empty();
    console.log(weatherData);
    for (var i = 7; i < weatherData.list.length; i += 8) {
        let eachTime = dayjs.unix(weatherData.list[i].dt).format('MM/DD/YYYY');
        let eachPicture = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherData.list[i].weather[0].picture + "@2x.png");
        let eachTimeDisplay = $("<h5>").text(eachTime).append(eachPicture);
        let eachCast = $("<div>").addClass("eachDailyCast");
        let eachTemp = $("<p>").text("Temp: " + weatherData.list[i].main.temp + "\u2109");
        let eachWind = $("<p>").text("Wind: " + weatherData.list[i].main.speed + "MPH");
        let eachHumid = $("<p>").text("Humidity: " + weatherData.list[i].main.humidity + "%");
        $(container - forecast).append(eachCast.append(eachTimeDisplay, eachTemp, eachWind, eachHumid));
    }
})
}

var searchedCities = [];
var storedCitiesArray = [];

function storeSearchedCities(weatherData) {
    let storedCity = weatherData.city.name;
    storedCitiesArray.push(storedCity);
    localStorage.setItem("storedCities", JSON.stringify(storedCitiesArray));

    let storedLat = weatherData.city.coord.lat;
    let storedLon = weatherData.city.coord.lon;
    let keyLatLon = `${storedLat}&${storedLon}`;
    localStorage.setItem(storedCity, keyLatLon);

    generateCityList();
}

function generateCityList() {
    $(searchedCities).empty();

    let renderedCities = JSON.parse(localStorage.getItem("storedCities"));
    if (renderedCities == null) {
        return;
    } else {
        function filterDuplicates(value, index, self) {
            return self.indexof(value) === index;
        }
        let filteredCities = renderedCities.filter(filterDiplicates);

        for (var i = 0; i < filteredCities.length; i++) {
            let eachListedCity = $("<li>").text(filteredCities[i]);
            eachListedCity.addcast("listedCity");
            $(searchedCities).append(eachListedCity);
        }
    }
}

$(searchedCities).on("click", ".listedCity", function () {
    let enterCity = $(this).text();
    let renderCoord = localStorage.getItem(enterCity);
    rerunCurrentWeather(renderCoord);
})

init();
