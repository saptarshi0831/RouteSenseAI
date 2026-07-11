const shareService = require("../services/share.service");
const locationService = require("../services/location.service");

const registerShareEvents = (io, socket) => {
  console.log(`🔗 Share events registered for ${socket.user.email}`);

  socket.on("share:join", async ({ shareCode }) => {
    try {
      const session = await shareService.joinShareSession({
        shareCode,
        userId: socket.user.id,
      });

      const room = `share:${shareCode}`;

      socket.join(room);

      // Get creator's latest location
      const latestLocation = await locationService.getCurrentLocation(
        session.creatorId
      );

      if (latestLocation) {
        socket.emit("location:current", {
          userId: latestLocation.userId,
          latitude: latestLocation.latitude,
          longitude: latestLocation.longitude,
          updatedAt: latestLocation.updatedAt,
        });
      }

      // Save active room on socket
      socket.currentShareRoom = room;

      socket.emit("share:joined", {
        success: true,
        shareCode,
      });

      console.log(`✅ ${socket.user.email} joined ${room}`);
    } catch (error) {
      socket.emit("share:error", {
        success: false,
        message: error.message,
      });
    }
  });

  socket.on("share:leave", () => {
    if (!socket.currentShareRoom) return;

    socket.leave(socket.currentShareRoom);

    console.log(
      `❌ ${socket.user.email} left ${socket.currentShareRoom}`
    );

    socket.currentShareRoom = null;
  });
};

module.exports = registerShareEvents;