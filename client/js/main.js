let degree = document.getElementById("degree");
let weather_type = document.getElementById("weather_type");
let humidity = document.getElementById("humdity");
let name = document.getElementById("name");
let airport_type = document.getElementById("airport_type");
let coun = document.getElementById("country");
let name2 = document.getElementById("name2");
let airport_type2 = document.getElementById("airport_type2");
let coun2 = document.getElementById("country2");
let show = document.getElementById("show");
let show2 = document.getElementById("show2");
let dist_ance = document.getElementById("distance");
let amount = document.getElementById("amount");
const input = document.getElementById("location");
const input2 = document.getElementById("location2");
const show_btn = document.getElementById("show-btn");
const show_form = document.getElementById("payment-form");
const suggestions = document.querySelector(".suggestions ul");
const suggestions2 = document.querySelector(".suggestions2 ul");

show.style.display = "none";
show2.style.display = "none";
show_btn.style.display = "none";
show_form.style.display = "none";
amount.style.display = "none";

let lat1, lat2, lon1, lon2;

function checkCardDisplay() {
  if (show.style.display === "block" && show2.style.display === "block") {
    show_btn.style.display = "block";
  }
}

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
  show.style.display = "none";
  show_btn.style.display = "none";
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

function getAirport(country, num) {
  if (num === "2") {
    show2.style.display = "block";
  } else {
    show.style.display = "block";
  }

  checkCardDisplay();

  fetch(`${WEATHER_URL}/weather/autocomplete/${country}`)
    .then((data) => data.json())
    .then((data) => {
      if (num === "2") {
        name2.innerHTML = data.data.name;
        airport_type2.innerHTML = data.data.type;
        coun2.innerHTML = data.data.country;
        lat2 = data.data.latitude_deg;
        lon2 = data.data.longitude_deg;
      } else {
        name.innerHTML = data.data.name;
        airport_type.innerHTML = data.data.type;
        coun.innerHTML = data.data.country;
        lat1 = data.data.latitude_deg;
        lon1 = data.data.longitude_deg;
      }
    });
}

function searchHandler2(e) {
  show2.style.display = "none";
  show_btn.style.display = "none";
  const inputVal = e.currentTarget.value;
  let results = [];
  if (inputVal.length > 0) {
    results = search(inputVal);
  }
  showLocations2(results, inputVal);
}

function showLocations2(results, inputVal) {
  suggestions2.innerHTML = "";

  if (results.length > 0) {
    for (i = 0; i < results.length; i++) {
      let item = results[i];
      // Highlights only the first match
      // TODO: highlight all matches
      const match = item.match(new RegExp(inputVal, "i"));
      item = item.replace(match[0], `<strong>${match[0]}</strong>`);
      suggestions2.innerHTML += `<li>${item}</li>`;
    }
    suggestions2.classList.add("has-suggestions2");
  } else {
    results = [];
    suggestions2.innerHTML = "";
    suggestion2s.classList.remove("has-suggestions2");
  }
}

function useSuggestion2(e) {
  input2.value = e.target.innerText;
  getAirport(input2.value, "2");
  input2.focus();
  suggestions2.innerHTML = "";
  suggestions2.classList.remove("has-suggestions2");
}

input2.addEventListener("keyup", searchHandler2);
suggestions2.addEventListener("click", useSuggestion2);

function calculate() {
  const dist = distance(lat1, lat2, lon1, lon2);
  dist_ance.innerText = Math.floor(dist);
  show_form.style.display = "block";
  amount.innerText = Math.floor(dist * 10);
}
