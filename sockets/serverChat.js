const { createUser } = require('../utils');
const models = require('../models');

function chatSocket(io) {
  io.on('connection', async (socket) => {
    const user = createUser();
    const response = await models.users.create(user);
    console.log(response);
    io.emit('insertOnlineUser', user);
  });
}

module.exports = chatSocket;
