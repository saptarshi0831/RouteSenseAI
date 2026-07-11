const registerSOSEvents = (io, socket) => {

  console.log(
    `🚨 SOS events registered for ${socket.user.email}`
  );

  socket.on("sos:subscribe", () => {
    socket.join("admins");
    console.log(
        `${socket.user.email} subscribed to SOS updates`
    );
  });
};

module.exports = registerSOSEvents;