const { Server } = require("socket.io");
const {
  listMessage,
  addMessage,
} = require("../../components/groupChat/groupChat.service");
module.exports = function (server) {
  const io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    socket.on("JOIN_GROUP", async (data) => {
      const { groupId } = data;
      socket.join(groupId);
      const messages = await listMessage();
      socket.send(`join chat room with ${groupId}`);
      socket.emit("ALL_MESSAGES", messages);
    });

    socket.on("SEND_MESSAGE", async (data) => {
      const { groupId, message, senderId } = data;
      await addMessage(senderId, groupId, message);
      io.to(groupId).emit("ALL_MESSAGES", message);
    });
    socket.on("disconnect", function (data) {
      console.log("socket disconnected", data);
    });
  });
  return io;
};
