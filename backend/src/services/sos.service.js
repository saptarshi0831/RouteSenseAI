const sosRepository = require("../repositories/sos.repository");
const notificationService = require("./notification.service");

const createEmergency = async ({
  userId,
  latitude,
  longitude,
  message,
}) => {

  const emergency =
    await sosRepository.createEmergency({
      userId,
      latitude,
      longitude,
      message,
    });

  notificationService.sendNotification({
    userId,
    title: "SOS Sent",
    message:
      "Emergency alert sent successfully.",
    type: "sos",
  });

  return emergency;
};

const getActiveEmergencies = async () => {
  return sosRepository.getActiveEmergencies();
};

const updateEmergencyStatus = async ({
  id,
  status,
}) => {
  return sosRepository.updateEmergencyStatus({
    id,
    status,
  });
};

module.exports = {
  createEmergency,
  getActiveEmergencies,
  updateEmergencyStatus,
};