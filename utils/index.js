const moment = require('moment');

function randomizeAlphabetic(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function createNickname() {
  const randomizedNameLength = 16;
  const nickname = randomizeAlphabetic(randomizedNameLength);
  return nickname;
}

function getTimeAndFormat() {
  const actualDate = new Date();
  const timeFormat = 'DD-MM-YYYY HH:MM:SS A';
  const timeStamp = moment(actualDate).format(timeFormat);
  return timeStamp;
}

function createMessage(chatMessage, nickname) {
  const createdAt = getTimeAndFormat();
  const messageObject = { createdAt, chatMessage, nickname };
  return messageObject;
}

module.exports = {
  createMessage,
  createNickname,
  getTimeAndFormat,
  randomizeAlphabetic,
};
