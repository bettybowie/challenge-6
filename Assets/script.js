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
// when search button is clicked, results will display on the right
// search term will be in search history
// result will display cityname(today's date) icon representation, Temperature, wind, humidity on the top
// result will display 5 day forecast on the bottom
// clear search history


// function for search button
var formSubmitHandler = function (e) {
  e.preventDefault();

  var cityname = cityInputEl.value.trim().toUpperCase();

  if (cityname) {
    getWeather(cityname);
    saveSearch(cityname);
    showSearch();
    resultsContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a city name');
  }
};

cityFormEl.addEventListener('submit', formSubmitHandler);


// function for fetching data
var getWeather = function (city) {
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=43e9f965132c49cafd2c625109b0f45f';

  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          lat = data.coord.lat;
          lon = data.coord.lon;
          showResults(lat, lon);
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
  var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=43e9f965132c49cafd2c625109b0f45f';

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
};

// function to save to local storage
var saveSearch = function(cityname) {
  if (localStorage.getItem('cities') === null) {
    localStorage.setItem('cities', '[]');
  };

  var historyList = JSON.parse(localStorage.getItem('cities'));
  historyList.push(cityname);

  localStorage.setItem('cities', JSON.stringify(historyList));
  };

var historyList = JSON.parse(localStorage.getItem('cities'));

var showSearch = function() {
  if (localStorage.getItem('cities') !== null) {

    historyList.forEach(city => {
      var historyBtn = document.createElement("button");
      historyBtn.textContent = JSON.parse(localStorage.getItem('cities'));
      searchHistoryEl.appendChild(historyBtn);
    });
      
    // });
    // for (var i = 0; i < historyList.length; i++) {
    //   var historyBtn = document.createElement("button");
    //   historyBtn.textContent = JSON.parse(localStorage.getItem('cities'));
    //   searchHistoryEl.appendChild(historyBtn);
    // }
      
  };
};

//   for (var i = 0; i < storageList.length; i++) {
//     var li = document.createElement("li");
//     li.textContent = storageList[i].player + "--------" + storageList[i].score;
//     scores.appendChild(li);
// };



// var displayRepos = function (repos, searchTerm) {
//   if (repos.length === 0) {
//     repoContainerEl.textContent = 'No repositories found.';
//     return;
//   }

//   repoSearchTerm.textContent = searchTerm;

//   for (var i = 0; i < repos.length; i++) {
//     var repoName = repos[i].owner.login + '/' + repos[i].name;

//     var repoEl = document.createElement('a');
//     repoEl.classList = 'list-item flex-row justify-space-between align-center';
//     repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

//     var titleEl = document.createElement('span');
//     titleEl.textContent = repoName;

//     repoEl.appendChild(titleEl);

//     var statusEl = document.createElement('span');
//     statusEl.classList = 'flex-row align-center';

//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     repoEl.appendChild(statusEl);

//     repoContainerEl.appendChild(repoEl);
//   }
// };

// userFormEl.addEventListener('submit', formSubmitHandler);
// languageButtonsEl.addEventListener('click', buttonClickHandler);
