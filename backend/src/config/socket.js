// Creates and configure Socket.IO
const { Server } = require("socket.io");
const socketAuth = require("../middleware/socketAuth.middleware");

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    // Auth middleware
    io.use(socketAuth);

    // Connection handler
    io.on("connection", (socket) => {
        console.log("✅ Socket connected:", socket.id);
        console.log("👤 User:", socket.user);

        socket.on("disconnect", () => {
            console.log("❌ Socket disconnected:", socket.id);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized");
    }
    return io;
};

module.exports = {
    initializeSocket,
    getIO
};