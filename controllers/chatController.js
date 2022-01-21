const messagesModels = require('../models/messages');

async function chat(_req, res) {
  const messages = await messagesModels.get();
  res.status(200).render('chat', { messages });
}

module.exports = chat;
