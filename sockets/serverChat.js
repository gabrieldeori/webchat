const { createUser, createMessage } = require('../utils');
const messagesModels = require('../models/messages');

const onlineUsers = {};

async function firstConnect(socket) {
    onlineUsers[socket.id] = await createUser();
    const firstEveryMessage = await messagesModels.get();
    return firstEveryMessage;
}

function disconnect(io, socket) {
  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
    io.emit('refreshOnlineUsers', Object.values(onlineUsers));
  });
}

function sendMessage(io, socket) {
  socket.on('sendMessage', async (message) => {
    const newMessage = createMessage(message, onlineUsers[socket.id].nickname);
    await messagesModels.create(newMessage);
    const everyMessage = await messagesModels.get();
    io.emit('refreshMessages', everyMessage);
  });
}

function chatSocket(io) {
  io.on('connection', async (socket) => {
    firstConnect(socket);
    disconnect(io, socket);
    sendMessage(io, socket);
  });
}

module.exports = chatSocket;
