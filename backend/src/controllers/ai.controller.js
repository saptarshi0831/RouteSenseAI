const aiService = require("../services/ai.service");
const notificationService = require("../services/notification.service");

const chat = async (req, res) => {
  try {
    const {
      message,
      context = {},
    } = req.body;

    const reply =
        await aiService.askAI(
          message,
          context
        );

    res.json({
      success: true,
      data: reply,
    });

    // Send Socket.IO notification
    notificationService.sendNotification({
      userId: req.user.id,
      title: "RouteSense AI",
      message: "AI assistant responded to your request.",
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