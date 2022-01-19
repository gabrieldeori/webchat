const client = window.io();
const onlinesBox = document.querySelector('#onlinesBox');
const saveNick = document.querySelector('#nickSaveBtn');
const nickInput = document.querySelector('#nickInput');
const messagesBox = document.querySelector('#messagesBox');
const msgSendButton = document.querySelector('#msgSendButton');
const messageInput = document.querySelector('#messageInput');

function createListUser(nickname) {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerHTML = nickname;
  return li;
}
function createListMessage(formated) {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerHTML = formated;
  return li;
}

let frontNickName = '';

client.emit('firstConnect');
client.on('updateNickname', (newNick) => {
  frontNickName = newNick;
});

saveNick.addEventListener('click', (event) => {
  event.preventDefault();
  if (nickInput.value) {
    const newNick = nickInput.value;
    client.emit('changeNick', newNick);
  }
});

msgSendButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (messageInput.value !== '') {
    const chatMessage = messageInput.value;
    client.emit('message', { chatMessage, nickname: frontNickName });
  }
});

client.on('refreshOnlineUsers', (onlineUsersData) => {
  onlinesBox.innerHTML = '';
  onlineUsersData.forEach(({ nickname }) => {
    const newUser = createListUser(nickname);
    onlinesBox.appendChild(newUser);
  });
});

client.on('refreshMessages', (everyMessage) => {
  messagesBox.innerHTML = '';
  everyMessage.forEach(({ createdAt, nickname, chatMessage }) => {
    const newMessage = createListMessage(`${createdAt} ${nickname} ${chatMessage}`);
    messagesBox.appendChild(newMessage);
  });
});
