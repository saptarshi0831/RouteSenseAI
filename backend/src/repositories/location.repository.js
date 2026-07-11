const prisma = require("../config/db");

const upsertLocation = async ({
    userId,
    latitude,
    longitude,
}) => {
    return prisma.liveLocation.upsert({
        where: {
            userId,
        },

        update: {
            latitude,
            longitude,
        },

        create: {
            userId,
            latitude,
            longitude,
        },
    });
};

const getCurrentLocation = async (userId) => {
  return prisma.liveLocation.findUnique({
    where: {
      userId,
    },
  });
};

module.exports = { 
    upsertLocation,
    getCurrentLocation,
 };