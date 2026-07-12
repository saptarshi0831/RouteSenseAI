const shareService = require("../services/share.service");

const createShareSession = async (req, res) => {
  try {
    const io = req.app.get("io");

    const result = await shareService.createShareSession({
      creatorId: req.user.id,
      durationHours: req.body.durationHours,
    });

    // Notify current user
    io.to(`user:${req.user.id}`).emit("notification:new", {
      id: result.id,
      type: "share",
      title: "📡 Live Sharing",
      message: "Your live location link has been created.",
      createdAt: result.createdAt,
    });

    res.status(201).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const joinShareSession = async (req, res) => {
  try {
    const result = await shareService.joinShareSession({
      shareCode: req.body.shareCode,
      userId: req.user.id,
    });

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getShareSession = async (req, res) => {

  try {

    const session =
      await shareService.getShareSession(
        req.params.shareCode
      );

    res.json({
      success: true,
      data: session,
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};

const endShareSession = async (req, res) => {
  try {
    const result = await shareService.endShareSession({
      sessionId: req.params.shareCode,
    });

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createShareSession,
  joinShareSession,
  getShareSession,
  endShareSession,
};