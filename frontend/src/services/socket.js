import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

/* =========================
   DEBUG EVENTS
========================= */

socket.on("connect", () => {
  console.log("🟢 Socket Connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("🔴 Socket Disconnected");
});

socket.on("connect_error", (err) => {
  console.log("❌ Socket Error:", err.message);
});

socket.on("sos:new", (data)=>{
    console.log("🚨 New Emergency");
    console.log(data);
});

export default socket;