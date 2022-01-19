const models = require('../models');

async function chat(_req, res) {
  try {
    const users = await models.users.get();
    const messages = await models.messages.get();
    const dataToRender = { users, messages };
    res.status(200).render('chat', { dataToRender });
  } catch (e) {
    console.log(e);
  }
}

module.exports = chat;
