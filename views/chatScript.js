const msgBtn = document.querySelector('#msgBtn');
const msgInput = document.querySelector('#msgInput');
const onlinesBox = document.querySelector('#onlinesBox');

// function createListUser(nickname) {
//   const li = document.createElement('li');
//   li.setAttribute('data-testid', 'online-user');
//   li.innerHTML = nickname;
//   return li;
// }

function createListMessage(message) {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerHTML = message;
  return li;
}

msgBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (msgInput.value && msgInput.value !== '') {
    onlinesBox.appendChild(createListMessage(msgInput.value));
  }
});
