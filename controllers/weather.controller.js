const request = require("request");
const parse = require("csv-parse");
const fs = require("fs");
const path = require("path");

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
    country: "USA",
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
    name: "Total Rf Heliport",
    latitude_deg: 40.07080078125,
    longitude_deg: -74.9336013793945311,
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
    name: "Total Rf Heliport",
    latitude_deg: 40.07080078125,
    longitude_deg: -74.9336013793945311,
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
