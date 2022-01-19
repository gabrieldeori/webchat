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

saveNick.addEventListener('click', (event) => {
  event.preventDefault();
  if (nickInput) {
    const newNick = nickInput.value;
    client.emit('changeNick', newNick);
  }
});

msgSendButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (messageInput.value !== '') {
    const messageToSend = messageInput.value;
    client.emit('sendMessage', messageToSend); 
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
  everyMessage.forEach(({ createdAt, nickname, message }) => {
    const newMessage = createListMessage(`${createdAt} ${nickname} ${message}`);
    messagesBox.appendChild(newMessage);
  });
});
