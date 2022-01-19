const connection = require('./connection');

async function create(data) {
  const db = await connection();
  const response = await db.collection('messages').insertOne(data);
  return response;
}

async function get() {
  const db = await connection();
  const messages = await db
  .collection('messages')
  .find()
  .toArray();
  return messages;
}

module.exports = {
  create,
  get,
};
