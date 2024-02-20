const Boom = require("boom");
const axios = require("axios");

const API_KEY = process.env.GOOGLE_API_KEY;

async function addressToCoordinates(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw Boom.badData(`Could not find coordinates for address ${address}`);
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = { addressToCoordinates };
