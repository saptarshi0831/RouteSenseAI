const aiService = require("../services/ai.service");
const notificationService = require("../services/notification.service");

const chat = async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await aiService.askAI(message);

    res.json({
      success: true,
      data: reply,
    });

    // Send Socket.IO notification
    notificationService.sendNotification({
      userId: req.user.id,
      title: "AI Assistant",
      message: "AI generated a response.",
      type: "ai",
    });
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Unable to generate AI response.",
      });
    }
  }
};

module.exports = {
  chat,
};