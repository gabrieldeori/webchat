const { getTimeAndFormat } = require('../utils');
const messagesModels = require('../models/messages');

function messagesHandler(io, socket) {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = getTimeAndFormat();
    const formattedMessageToFront = `${timestamp} - ${nickname}: ${chatMessage}`;
    await messagesModels.create({ message: chatMessage, nickname, timestamp });
    io.emit('message', formattedMessageToFront);
  });
}

module.exports = messagesHandler;