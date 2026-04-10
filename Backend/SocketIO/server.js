import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const users = {};

const io = new Server(server, {
  cors: {
    origin: "https://chatapp-8-hobb.onrender.com",
    methods: ["GET", "POST"],
  },
});


export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    users[userId] = socket.id;
  }

  
  io.emit("getOnline", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);

    if (userId) {
      delete users[userId];
    }

    io.emit("getOnline", Object.keys(users));
  });
});

export { app, io, server };
