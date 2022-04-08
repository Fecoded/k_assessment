const express = require("express");
const router = express.Router();
const {
  getWeatherReport,
  getAirportAutoComplete,
} = require("../controllers/weather.controller");

router.route("/").get(getWeatherReport);
router.route("/autocomplete/:country").get(getAirportAutoComplete);

module.exports = router;
