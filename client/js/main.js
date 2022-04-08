let degree = document.getElementById("degree");
let weather_type = document.getElementById("weather_type");
let humidity = document.getElementById("humdity");
const input = document.getElementById("location");
const suggestions = document.querySelector(".suggestions ul");

let WEATHER_URL = "http://localhost:5000/api/v1";

fetch(`${WEATHER_URL}/weather`)
  .then((data) => data.json())
  .then((data) => {
    humidity.innerHTML = data.data.current.humidity;
    weather_type.innerHTML = data.data.current.condition.text;
    degree.innerHTML = data.data.current.wind_degree + "°";
  });

let locations = ["Nigeria", "London", "Austria", "Germany", "Ghana"];

function search(str) {
  let results = [];
  const val = str.toLowerCase();

  for (i = 0; i < locations.length; i++) {
    if (locations[i].toLowerCase().indexOf(val) > -1) {
      results.push(locations[i]);
    }
  }

  return results;
}

function searchHandler(e) {
  const inputVal = e.currentTarget.value;
  let results = [];
  if (inputVal.length > 0) {
    results = search(inputVal);
  }
  showLocations(results, inputVal);
}

function showLocations(results, inputVal) {
  suggestions.innerHTML = "";

  if (results.length > 0) {
    for (i = 0; i < results.length; i++) {
      let item = results[i];
      // Highlights only the first match
      // TODO: highlight all matches
      const match = item.match(new RegExp(inputVal, "i"));
      item = item.replace(match[0], `<strong>${match[0]}</strong>`);
      suggestions.innerHTML += `<li>${item}</li>`;
    }
    suggestions.classList.add("has-suggestions");
  } else {
    results = [];
    suggestions.innerHTML = "";
    suggestions.classList.remove("has-suggestions");
  }
}

function useSuggestion(e) {
  input.value = e.target.innerText;
  getAirport(input.value);
  input.focus();
  suggestions.innerHTML = "";
  suggestions.classList.remove("has-suggestions");
}

input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);

function getAirport(country) {
  fetch(`${WEATHER_URL}/weather/autocomplete/${country}`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
    });
}
