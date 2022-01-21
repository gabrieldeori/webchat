const client = window.io();

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
