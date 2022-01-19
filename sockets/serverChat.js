const { createUser } = require('../utils');
const usersModel = require('../models/users');

const onlineUsers = {};

function chatSocket(io) {
  io.on('connection', async (socket) => {
    onlineUsers[socket.id] = createUser();
    io.emit('refreshOnlineUsers', Object.values(onlineUsers));
    
    socket.on('disconnect', () => {
      delete onlineUsers[socket.id];
      io.emit('refreshOnlineUsers', Object.values(onlineUsers));
    });
  });
}

module.exports = chatSocket;
