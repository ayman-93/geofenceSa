// Soeckt.io
import io from "socket.io-client";
const socket = io("http://18.184.129.69", { 'transports': ['websocket'] });
socket.emit("login", { id: "adminID" });

export default socket;
