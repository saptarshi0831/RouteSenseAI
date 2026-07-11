const locationRepository = require("../repositories/location.repository");

const updateLocation = async ({ userId, latitude, longitude }) => {
    try {
        const location = await locationRepository.upsertLocation({
            userId,
            latitude,
            longitude,
        });

        return location;

    } catch (error) {
        throw error;
    }
};

const getCurrentLocation = async (userId) => {
  return locationRepository.getCurrentLocation(userId);
};

module.exports = {
    updateLocation,
    getCurrentLocation,
};