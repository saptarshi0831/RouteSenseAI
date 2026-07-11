const hospitalService = require("../services/hospital.service");
const notificationService = require("../services/notification.service");

const getNearbyHospitals = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const hospitals = await hospitalService.getNearbyHospitals(
      latitude,
      longitude
    );

    res.json({
      success: true,
      data: hospitals,
    });

    // Send Socket.IO notification
    notificationService.sendNotification({
      userId: req.user.id,
      title: "Hospitals Updated",
      message: "Nearby hospitals loaded.",
      type: "hospital",
    });
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Unable to fetch nearby hospitals.",
      });
    }
  }
};

module.exports = {
  getNearbyHospitals,
};