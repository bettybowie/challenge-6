var cityFormEl = document.querySelector('#city-form');
var searchHistoryEl = document.querySelector('#search-history');
var clearBtn = document.querySelector('#clear-search');
var cityInputEl = document.querySelector('#cityname');
var resultsContainerEl = document.querySelector('#results-container');
var currentConditionEl = document.querySelector('#current-condition');
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
var fiveDays = document.querySelector('#five-day-container');
var historyBtn = document.createElement("button");


// function for clearing search history
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
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=43e9f965132c49cafd2c625109b0f45f&units=imperial';

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
          var iconUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
          currentIcon.setAttribute("src", iconUrl);
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

// function to show results
var showResults = function (lat, lon) {
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=43e9f965132c49cafd2c625109b0f45f&units=imperial';

  fetch(forecastUrl)
    .then(function(response) {
      fiveDays.innerHTML = '';
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          forecastHeader.textContent = '5-day forecast:';
          for (i = 1; i < data.list.length; i++) {
            var icon = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
            if (data.list[i].dt_txt.includes('15:00:00')){
              console.log(data.list[i]);
              var cardEl = document.createElement('div');
              cardEl.classList.add('card');
              var headerEl = document.createElement('div');
              headerEl.classList.add('card-header');
              var forecastDate = data.list[i].dt;
              var headerDate = dayjs(forecastDate * 1000).format('MM.DD.YYYY');
              headerEl.innerHTML = headerDate + `<img src="${icon}" alt=""></img>`;
              var bodyEl = document.createElement('div');
              bodyEl.classList.add('card-body');
              bodyEl.innerHTML = `
              <h3> TEMP: ${data.list[i].main.temp} °F </h3>
              <h3> WIND: ${data.list[i].wind.speed} MPH </h3>
              <h3> HUMIDITY: ${data.list[i].main.humidity} % </h3>
              `
              cardEl.append(headerEl);
              cardEl.append(bodyEl);
              fiveDays.append(cardEl);
            };
          }
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
  if (!historyList.includes(cityname)) {
  historyList.push(cityname);
  };
  localStorage.setItem('cities', JSON.stringify(historyList));
};

// function to show search history
var showSearch = function() {
  searchHistoryEl.innerHTML = '';
  if (localStorage.getItem('cities') !== null) {
    var historyList = JSON.parse(localStorage.getItem('cities'));

    for (var i = 0; i < historyList.length; i++) {
      var historyBtn = document.createElement("button");
      historyBtn.classList.add('cityname','d-block', 'p-4', 'w-100', 'btn', 'my-3', 'align-center');
      historyBtn.textContent = historyList[i];
      searchHistoryEl.append(historyBtn);
    }
  };
} 

// function to view searched cities
searchHistoryEl.addEventListener('click', function(e) {
  e.preventDefault();
  var cityname = e.target;
  if (cityname) {
    console.log(cityname.textContent);
    getWeather(cityname.textContent);
  } 
 })   
      
