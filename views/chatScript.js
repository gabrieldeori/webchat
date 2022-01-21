const client = window.io();
// Messages
const msgBtn = document.querySelector('#msgBtn');
const msgInput = document.querySelector('#msgInput');
const msgBox = document.querySelector('#msgBox');

function createListMessage(message) {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerHTML = message;
  return li;
}

msgBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const chatMessage = msgInput.value;
  if (chatMessage && chatMessage !== '') {
    const sSNickKey = 'sessionStorageNicknameKeyFromWebChat';
    const nickname = sessionStorage.getItem(sSNickKey);
    client.emit('message', { chatMessage, nickname });
  }
});

client.on('message', (message) => msgBox.appendChild(createListMessage(message)));

// Nickname
function nickGenerator(nickLength) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let randomNickname = '';
    const charactersLength = characters.length;
    for (let i = 0; i < nickLength; i += 1) {
        randomNickname += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  return randomNickname;
}

function setNick(key, nickname) {
  const nick = document.querySelector('#nickBox');
  nick.innerHTML = nickname;
  sessionStorage.setItem(key, nickname);
}

function createListUser(nickname) {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerHTML = nickname;
  return li;
}

const sSNickKey = 'sessionStorageNicknameKeyFromWebChat';
const sessionNickInfo = sessionStorage.getItem(sSNickKey);
const userNickName = sessionNickInfo || nickGenerator(16);

if (!sessionNickInfo || sessionNickInfo === undefined) {
  sessionStorage.setItem(sSNickKey, userNickName);
}

setNick(sSNickKey, userNickName);

const nickBtn = document.querySelector('#nickBtn');
const nickInput = document.querySelector('#nickInput');
const nickBox = document.querySelector('#nickBox');

nickBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const newNick = nickInput.value;
  if (newNick && newNick !== '') {
    setNick(sSNickKey, newNick);
  }
  client.emit('reNicknamed', newNick);
});

client.emit('connected', userNickName);

client.on('updateUsers', ({ users, socketId }) => {
  nickBox.innerHTML = '';
  const thisNickName = users[socketId];
  const thisLi = createListUser(thisNickName);
  nickBox.appendChild(thisLi);
  
  const nicknames = Object.values(users);
  nicknames.forEach((nickname) => {
    if (thisNickName !== nickname) {
      const newUser = createListUser(nickname);
      nickBox.appendChild(newUser);
    }
  });
});
