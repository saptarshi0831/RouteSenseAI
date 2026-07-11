const axios = require("axios");

const getNearbyHospitals = async (
  latitude,
  longitude
) => {
  const radius = 5000; // 5 km

  const url =
    `https://api.geoapify.com/v2/places?` +
    `categories=healthcare.hospital` +
    `&filter=circle:${longitude},${latitude},${radius}` +
    `&bias=proximity:${longitude},${latitude}` +
    `&limit=10` +
    `&apiKey=${process.env.GEOAPIFY_API_KEY}`;

  const response = await axios.get(url);

  return response.data.features.map((hospital) => ({
    id: hospital.properties.place_id,

    name:
      hospital.properties.name ||
      "Unnamed Hospital",

    latitude:
      hospital.properties.lat,

    longitude:
      hospital.properties.lon,

    address:
      hospital.properties.formatted,

    distance:
      hospital.properties.distance,
  }));
};

module.exports = {
  getNearbyHospitals,
};