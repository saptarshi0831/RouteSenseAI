const sosService = require("../services/sos.service");

const createEmergency = async (req, res) => {
  try {
    const io = req.app.get("io");

    const { latitude, longitude, message } = req.body;

    const emergency = await sosService.createEmergency({
      userId: req.user.id,
      latitude,
      longitude,
      message,
    });

    io.to("admins").emit("sos:new", {
      id: emergency.id,
      userId: emergency.userId,
      latitude: emergency.latitude,
      longitude: emergency.longitude,
      message: emergency.message,
      status: emergency.status,
      createdAt: emergency.createdAt,
    });

    // Send notification
   // Notify current user
  io.to(`user:${req.user.id}`).emit("notification:new", {
    id: emergency.id,
    type: "sos",
    title: "🚨 SOS Sent",
    message: "Your emergency SOS has been sent successfully.",
    createdAt: emergency.createdAt,
  });
  
  // Notify admins
  io.to("admins").emit("notification:new", {
    id: emergency.id,
    type: "sos",
    title: "🚨 New SOS",
    message: "A new emergency SOS has been received.",
    createdAt: emergency.createdAt,
  });

    res.status(201).json({
      success: true,
      data: emergency,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getActiveEmergencies = async (req, res) => {
  try {
    const emergencies = await sosService.getActiveEmergencies();

    return res.json({
      success: true,
      data: emergencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEmergency,
  getActiveEmergencies,
};