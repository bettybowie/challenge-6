var cityFormEl = document.querySelector('#city-form');
var searchHistoryEl = document.querySelector('#search-history');
var clearBtn = document.querySelector('#clear-search');
var cityInputEl = document.querySelector('#cityname');
var resultsContainerEl = document.querySelector('#results-container');
var currentConditionEl = document.querySelector('#current-condition');
var forecastEl = document.querySelector('#forecast');
var citySearchTerm = document.querySelector('#city-search-term');
var lat ='';
var lon ='';
var historyList = '';
var todayDate = dayjs().format('MM.DD.YYYY');
var currentCity = document.querySelector('#current-city-date');
var temperature = document.querySelector('#temperature');
var wind = document.querySelector('#wind');
var humidity = document.querySelector('#humidity');
var forecastHeader = document.querySelector('#forecast-title');
var currentIcon = document.querySelector('#current-icon');


// when search button is clicked, results will display on the right
// search term will be in search history
// result will display cityname(today's date) icon representation, Temperature, wind, humidity on the top
// result will display 5 day forecast on the bottom

clearBtn.addEventListener('click', function(e) {
  e.preventDefault;
  localStorage.clear();
  searchHistoryEl.innerHTML = "";
})


// function for search button
var formSubmitHandler = function (e) {
  e.preventDefault();

  var cityname = cityInputEl.value.trim().toUpperCase();

  if (cityname) {
    getWeather(cityname);
    saveSearch(cityname);
    showSearch();
    cityInputEl.value = '';
  } else {
    alert('Please enter a city name');
  }
};

cityFormEl.addEventListener('submit', formSubmitHandler);


// function for fetching data
var getWeather = function (city) {
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=43e9f965132c49cafd2c625109b0f45f&units=imperial';

  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          lat = data.coord.lat;
          lon = data.coord.lon;
          showResults(lat, lon);
          currentCity.textContent = city + '  ---  ' + todayDate;
          temperature.textContent = 'temperature: ' + data.main.temp + '°F';
          wind.textContent = 'wind: ' + data.wind.speed + 'mph';
          humidity.textContent = 'humidity: ' + data.main.humidity + '%';
        })
      } else {
        alert('Error:' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to OpenWeather');
    });
};

var showResults = function (lat, lon) {
  var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=43e9f965132c49cafd2c625109b0f45f&units=imperial';

  fetch(forecastUrl)
    .then(function(response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
        })
      } else {
        alert('Error' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to OpenWeather');
    });

  
}


// function to save to local storage
var saveSearch = function(cityname) {
  if (localStorage.getItem('cities') === null) {
    localStorage.setItem('cities', '[]');
  };

  var historyList = JSON.parse(localStorage.getItem('cities'));
  historyList.push(cityname);

  localStorage.setItem('cities', JSON.stringify(historyList));
};

// var historyList = JSON.parse(localStorage.getItem('cities'));

var showSearch = function() {
  if (localStorage.getItem('cities') !== null) {
    var historyList = JSON.parse(localStorage.getItem('cities'));

    historyList.forEach(city => {
      var historyBtn = document.createElement("button");
      historyBtn.classList = 'list-item flex-row justify-space-between align-center';
      historyBtn.textContent = JSON.parse(localStorage.getItem('cities'));
      searchHistoryEl.appendChild(historyBtn);
    });
  };
} 

  //   for (var i = 0; i < historyList.length; i++) {
  //     var historyBtn = document.createElement("button");
  //     historyBtn.classList = 'list-item flex-row justify-space-between align-center';
  //     historyBtn.textContent = JSON.parse(localStorage.getItem('cities'));
  //     searchHistoryEl.appendChild(historyBtn);
  //   }
      
  // };
