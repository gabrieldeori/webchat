const { getTimeAndFormat } = require('../utils');

function chatSocket(io) {
  io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('message', ({ chatMessage, nickname }) => {
      const messageTimeStamps = getTimeAndFormat();
      const formattedMessageToFront = `${messageTimeStamps} - ${nickname}: ${chatMessage}`;
      io.emit('message', formattedMessageToFront);
    });
  });
}

module.exports = chatSocket;