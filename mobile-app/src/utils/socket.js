// Soeckt.io
import io from "socket.io-client";
const socket = io("http://18.184.129.69", { 'transports': ['websocket'] });
socket.on("connection", () => console.log("socket conncted"))
socket.emit("login", { id: "userID" });

export default socket;
