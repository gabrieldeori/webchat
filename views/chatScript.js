const client = window.io();
const onlinesBox = document.querySelector('#onlinesBox');
const messagesBox = document.querySelector('#messagesBox');

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
// const messageToSend = 'Teste Message';
// client.emit('sendMessage', messageToSend);
