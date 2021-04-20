import { io } from "socket.io-client";

const URL = "http://127.0.0.1:5000";
const socket = io(URL, { autoConnect: false, withCredentials: true  });

export default socket;