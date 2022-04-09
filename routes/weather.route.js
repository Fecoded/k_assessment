const express = require("express");
const router = express.Router();
const {
  getWeatherReport,
  getAirportAutoComplete,
  makeStripePayment,
  getPayment,
} = require("../controllers/weather.controller");

router.route("/").get(getWeatherReport);
router.route("/autocomplete/:country").get(getAirportAutoComplete);
router.route("/payment/").get(getPayment);
router.route("/stripe/payment").post(makeStripePayment);

module.exports = router;
