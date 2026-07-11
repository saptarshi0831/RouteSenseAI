const { getIO } = require("../config/socket");

const sendNotification = ({
  userId,
  title,
  message,
  type = "info",
}) => {
  const io = getIO();

  io.to(`user:${userId}`).emit(
    "notification:new",
    {
      id: Date.now(),
      title,
      message,
      type,
      createdAt: new Date(),
    }
  );
};

module.exports = {
  sendNotification,
};