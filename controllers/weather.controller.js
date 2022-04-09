const request = require("request");
const { Order } = require("../models");
const parse = require("csv-parse");
const fs = require("fs");
const path = require("path");
const stripe = require("stripe")("sk_test_G7Fs3ZR43m1DPlEaZm4Lpa9a00NmEzJ8DW");

let data = [
  {
    id: 6523,
    ident: "00A",
    type: "heliport",
    name: "Total Rf Heliport",
    latitude_deg: 40.07080078125,
    longitude_deg: -74.9336013793945311,
    elevation_ft: "NA",
    continent: "US",
    iso_country: "US-PA",
    iso_region: "Bensalem",
    country: "London",
    municipality: "no",
    scheduled_service: "00A",
    gps_code: "00A",
    iata_code: 323361,
    local_code: "00AA",
    home_link: "small_airport",
    wikipedia_link: "Aero B Ranch Airport",
    keywords: "words",
  },
  {
    id: 6524,
    ident: "00A",
    type: "heliport",
    name: "Lowell Field",
    latitude_deg: 59.947733,
    longitude_deg: -151.692524,
    elevation_ft: "NA",
    continent: "AFRICA",
    iso_country: "US-PA",
    iso_region: "Bensalem",
    country: "Nigeria",
    municipality: "no",
    scheduled_service: "00A",
    gps_code: "00A",
    iata_code: 323361,
    local_code: "00AA",
    home_link: "small_airport",
    wikipedia_link: "Aero B Ranch Airport",
    keywords: "words",
  },
  {
    id: 6525,
    ident: "00A",
    type: "heliport",
    name: "Epps Airpark",
    latitude_deg: 35.6087,
    longitude_deg: -91.254898,
    elevation_ft: "NA",
    continent: "AFRICA",
    iso_country: "US-PA",
    iso_region: "Bensalem",
    country: "Ghana",
    municipality: "no",
    scheduled_service: "00A",
    gps_code: "00A",
    iata_code: 323361,
    local_code: "00AA",
    home_link: "small_airport",
    wikipedia_link: "Aero B Ranch Airport",
    keywords: "words",
  },
  {
    id: 6526,
    ident: "00A",
    type: "heliport",
    name: "Cordes Airport",
    latitude_deg: 34.305599212646484,
    longitude_deg: -112.16500091552734,
    elevation_ft: "NA",
    continent: "EUROPE",
    iso_country: "US-PA",
    iso_region: "Bensalem",
    country: "Germany",
    municipality: "no",
    scheduled_service: "00A",
    gps_code: "00A",
    iata_code: 323361,
    local_code: "00AA",
    home_link: "small_airport",
    wikipedia_link: "Aero B Ranch Airport",
    keywords: "words",
  },
];

// @desc      GET WEATHER FOR CURRENT
// @route     GET api/v1/weather
// @access    Public
exports.getWeatherReport = async (req, res, next) => {
  try {
    const options = {
      uri: `${process.env.WEATHER_URL}/current.json?key=${process.env.API_KEY}&q=Nigeria`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "Error" });
      }

      return res.status(200).json({
        success: true,
        data: JSON.parse(body),
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc      GET AUTOCOMPLETE
// @route     GET api/v1/weather/autocomplete/:country
// @access    Public
exports.getAirportAutoComplete = async (req, res, next) => {
  try {
    const { country } = req.params;
    let result = data.find((data) => data.country === country);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc      POST
// @route     POST api/v1/weather/strip
// @access    Public
exports.makeStripePayment = async (req, res, next) => {
  const {
    total,
    stripe_id,
    from_airport,
    from_country,
    to_airport,
    to_country,
  } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: total,
      currency: "usd",
      description: "Example charge",
      source: stripe_id,
    });

    const body = {
      total,
      stripe_id: charge.id,
      from_airport,
      from_country,
      to_airport,
      to_country,
      status: "paid",
    };
    let order = await Order.create(body);
    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// @desc      GET PAYMENT
// @route     GET api/v1/weather/payment/
// @access    Public
exports.getPayment = async (req, res, next) => {
  try {
    let result = await Order.findAll();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
