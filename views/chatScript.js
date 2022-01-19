const client = window.io();

const onlineUsersList = document.querySelector('#onlineUsers');

function createListUser(nickname) {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerHTML = nickname;
  return li;
}
client.on('refreshOnlineUsers', (onlineUsersData) => {
  onlineUsersList.innerHTML = '';
  console.log(onlineUsersData);
  onlineUsersData.forEach(({ nickname }) => {
    const newUser = createListUser(nickname);
    onlineUsersList.appendChild(newUser);
  });
});
