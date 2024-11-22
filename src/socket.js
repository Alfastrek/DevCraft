import { io } from "socket.io-client";

let socket = null; // Single socket instance

export const initSocket = async () => {
  if (socket) {
    // Return existing socket if already initialized
    return socket;
  }

  const options = {
    "force new connection": true,
    reconnectionAttempts: 3,
    timeout: 10000,
    transports: ["websocket"],
  };

  socket = io(
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
    options
  );
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
