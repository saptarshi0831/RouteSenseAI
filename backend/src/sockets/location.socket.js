// Contains only location events

const locationService = require("../services/location.service");

const registerLocationEvents = (io, socket) => {
  console.log(`📍 Location events registered for ${socket.id}`);

  socket.on("location:update", async (data) => {
    try {
      const { latitude, longitude } = data;

      // Get authenticated user
      const { id: userId, email } = socket.user;

      const location = await locationService.updateLocation({
        userId,
        latitude,
        longitude,
      });

      const payload = {
        userId: location.userId,
        latitude: location.latitude,
        longitude: location.longitude,
        updatedAt: location.updatedAt,
      };

      console.log(
        `📍 ${email} updated location (${latitude}, ${longitude})`
      );

      // Broadcast to users in the current share room
      if (socket.currentShareRoom) {
        socket.to(socket.currentShareRoom).emit("location:updated", {
          userId,
          latitude,
          longitude,
          updatedAt: new Date(),
        });
      }

      // Broadcast to the user's personal room
      socket.to(`user:${userId}`).emit("location:updated", payload);
    } catch (error) {
      console.error("📍 Location Update Error:", error.message);

      // Inform the sender that something went wrong
      socket.emit("location:error", {
        message: error.message,
      });
    }
  });
};

module.exports = registerLocationEvents;