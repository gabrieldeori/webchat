const connection = require('./connection');

async function create(data) {
  const db = await connection();
  const response = await db.collection('users').insertOne(data);
  return response;
}

async function get() {
  const db = await connection();
  const messages = await db
  .collection('users')
  .find()
  .toArray();
  return messages;
}

module.exports = {
  create,
  get,
};
