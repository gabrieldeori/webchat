const { createUser, createMessage } = require('../utils');
const messagesModels = require('../models/messages');

const onlineUsers = {};

async function firstConnect(io, socket) {
    onlineUsers[socket.id] = await createUser();
    const everyMessage = await messagesModels.get();
    io.emit('refreshMessages', everyMessage);
    io.emit('refreshOnlineUsers', Object.values(onlineUsers));
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

function changeNick(io, socket) {
  socket.on('changeNick', (newNick) => {
    onlineUsers[socket.id].nickname = newNick;
    io.emit('refreshOnlineUsers', Object.values(onlineUsers));
  });
}

async function chatSocket(io) {
  io.on('connection', async (socket) => {
    firstConnect(io, socket);
    disconnect(io, socket);
    sendMessage(io, socket);
    changeNick(io, socket);
  });
}

module.exports = chatSocket;
