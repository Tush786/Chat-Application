const { Server } = require("socket.io");
const http = require("http");
const { Message } = require("../model/message.model");

const userSocketMap = {};

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Mark messages as seen
    socket.on("markMessagesAsSeen", async ({ senderId, receiverId }) => {
      try {
        await Message.updateMany(
          { senderId: senderId, receiverId: receiverId, seen: false },
          { $set: { seen: true } }
        );
        io.to(userSocketMap[receiverId]).emit("messagesSeen", {
          senderId,
          receiverId,
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

module.exports = {
  initSocket,
};
