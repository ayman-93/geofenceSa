// Soeckt.io
import io from "socket.io-client";
const socket = io("http://localhost:3001");
socket.emit("login", { id: "userID" });

export default socket;
