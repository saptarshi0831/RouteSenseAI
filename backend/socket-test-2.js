require("dotenv").config({
    path: ".env.test",
});

const { io } = require("socket.io-client");

const socket = io("http://localhost:5000", {
    auth: {
        token: process.env.TEST_JWT,
    },
});

socket.on("connect", () => {
    console.log("✅ Connected");
    console.log("Socket ID:", socket.id);

    socket.emit("location:update", {
        latitude: 22.6000,
        longitude: 88.4000,
    });
});

socket.on("location:updated", (data) => {
    console.log("\n📍 Location Updated");
    console.log(data);
});

socket.on("location:error", (data) => {
    console.log("\n❌ Location Error");
    console.log(data);
});

socket.on("disconnect", (reason) => {
    console.log("❌ Disconnected:", reason);
});

socket.on("connect_error", (err) => {
    console.log("❌ Connection Error:", err.message);
});