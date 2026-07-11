require("dotenv").config();

const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const { initializeSocket } = require("./config/socket");
const registerSocketHandlers = require("./sockets");

const server = http.createServer(app);

const io = initializeSocket(server);

// Make io available throughout the Express app
app.set("io", io);

registerSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});