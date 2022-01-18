// const somemodel = require('../models/somemodel');

const chat = async (_req, res) => {
  const users = ['userA', 'userB', 'userC'];
  const messages = [
    '09-10-2020 2:35:09 PM - userA: Olá meu caros amigos!',
    '09-10-2020 2:35:09 PM - userB: Baum?!',
    '09-10-2020 2:35:09 PM - userC: Fala ê :D',
  ];
  res.status(200).render('chat', { users, messages });
};

module.exports = chat;
