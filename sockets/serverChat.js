const messagesHandler = require('./messages');
const usersHandler = require('./users');

function chatSocket(io) {
  io.on('connection', (socket) => {
    messagesHandler(io, socket);
    usersHandler(io, socket);
  });
}

module.exports = chatSocket;