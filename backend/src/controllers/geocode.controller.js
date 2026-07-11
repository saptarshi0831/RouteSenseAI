const axios = require("axios");

const searchLocation = async (req, res) => {
  try {
    const query = req.query.q;

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "json",
          limit: 5,
        },
        headers: {
          "User-Agent": "RouteSense-AI",
        },
      }
    );

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Location search failed.",
    });
  }
};

module.exports = {
  searchLocation,
};