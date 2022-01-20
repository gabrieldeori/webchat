function nickGenerator(nickLength) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let randomNickname = '';
    const charactersLength = characters.length;
    for (let i = 0; i < nickLength; i += 1) {
        randomNickname += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  return randomNickname;
}

function setNick(nickname) {
  const onlineUser = document.querySelector('#onlineUser');
  onlineUser.innerHTML = nickname;
}

const sSNickKey = 'sessionStorageNicknameKeyFromWebChat';
const sessionNickInfo = sessionStorage.getItem(sSNickKey);
const userNickName = sessionNickInfo || nickGenerator(16);

if (!sessionNickInfo || sessionNickInfo === undefined) {
  sessionStorage.setItem(sSNickKey, userNickName);
}

setNick(userNickName);
