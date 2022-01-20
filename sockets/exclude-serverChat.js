const { createMessage, createUser } = require('../utils');
const messagesModels = require('../models/messages');

const onlineUsers = {};

function firstConnect(io, socket) {
  socket.on('firstConnect', async () => {
    const everyMessage = await messagesModels.get();
    onlineUsers[socket.id] = createUser();
    const { nickname } = onlineUsers[socket.id];
    io.emit('refreshOnlineUsers', Object.values(onlineUsers));
    io.emit('message', everyMessage);
    io.emit('updateNickname', nickname);
  });
}

function disconnect(io, socket) {
  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
    io.emit('refreshOnlineUsers', Object.values(onlineUsers));
  });
}

function sendMessage(io, socket) {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const newMessage = createMessage(chatMessage, nickname);
    await messagesModels.create(newMessage);
    const everyMessage = await messagesModels.get();
    io.emit('message', everyMessage);
  });
}

function changeNick(io, socket) {
  socket.on('changeNick', (newNick) => {
    onlineUsers[socket.id] = { nickname: newNick };
    io.emit('refreshOnlineUsers', Object.values(onlineUsers));
    io.emit('updateNickname', newNick);
  });
}

function chatSocket(io) {
  io.on('connection', (socket) => {
    firstConnect(io, socket);
    disconnect(io, socket);
    sendMessage(io, socket);
    changeNick(io, socket);
  });
}

module.exports = chatSocket;
