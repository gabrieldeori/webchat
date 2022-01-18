const { createUser } = require('../utils');

function chatSocket(io) {
  io.on('connection', (socket) => {
    // console.log(socket.id);
    const user = createUser();
    socket.emit('connected', user);
  });
}

module.exports = chatSocket;
