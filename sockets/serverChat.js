const { createUser, createMessage } = require('../utils');
const messagesModels = require('../models/messages');

const onlineUsers = {};

function chatSocket(io) {
  io.on('connection', async (socket) => {
    onlineUsers[socket.id] = createUser();
    io.emit('refreshOnlineUsers', Object.values(onlineUsers));
    
    const everyMessage = await messagesModels.get();
    io.emit('refreshMessages', everyMessage);

    socket.on('disconnect', () => {
      delete onlineUsers[socket.id];
      io.emit('refreshOnlineUsers', Object.values(onlineUsers));
    });
    socket.on('sendMessage', async (message) => {
      const { nickname } = onlineUsers[socket.id];
      const newMessage = createMessage(message, nickname);
      await messagesModels.create(newMessage);
    }); // retirar isso daqui, não esqueceeeeeeeeeeeeeeeeeeeerr
  });
}

module.exports = chatSocket;
