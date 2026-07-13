const prisma = require("../config/db");

const createEmergency = async (data) => {
  return prisma.emergency.create({
    data,
  });
};

const getEmergencyById = async (id) => {
  return prisma.emergency.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

const getActiveEmergencies = async () => {
  return prisma.emergency.findMany({
    where: {
      status: {
        in: ["ACTIVE", "RESPONDING"]
      }
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateEmergencyStatus = async ({
  id,
  status,
}) => {
  return prisma.emergency.update({
    where: { id },
    data: { status },
  });
};

module.exports = {
  createEmergency,
  getEmergencyById,
  getActiveEmergencies,
  updateEmergencyStatus,
};