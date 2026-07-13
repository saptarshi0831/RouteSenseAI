// Registers all socket modeules

// Stage 1: Location socket
// Stage 2: Emergency socket
// Stage 3: Notification socket
// Stage 4: Chat socket

const registerLocationEvents = require("./location.socket");
const registerShareEvents = require("./share.socket");
const registerSOSEvents = require("./sos.socket");

const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {

    const userRoom = `user:${socket.user.id}`;
    socket.join(userRoom);
    console.log(`✅ ${socket.user.email} joined ${userRoom}`);

    if (socket.user.email === "admin@routesense.ai") {
        socket.join("admins");
        console.log(`✅ ${socket.user.email} joined admins room`);
    }

    registerLocationEvents(io, socket);
    registerShareEvents(io, socket);
    registerSOSEvents(io, socket);

    socket.on("disconnect", () => {

      console.log(
        `❌ ${socket.user.email} disconnected`
      );

    });

  });
};

module.exports = registerSocketHandlers;