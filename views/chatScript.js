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
  const message = msgInput.value;
  if (message && message !== '') {
    const sSNickKey = 'sessionStorageNicknameKeyFromWebChat';
    const nickname = sessionStorage.getItem(sSNickKey);
    msgBox.appendChild(createListMessage(`${nickname} - ${message}`));
  }
});
