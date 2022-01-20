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
  const nick = document.querySelector('#onlineUser');
  nick.innerHTML = nickname;
  sessionStorage.setItem(key, nickname);
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
// const nickBox = document.querySelector('#nickBox');

nickBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (nickInput.value && nickInput.value !== '') {
    setNick(sSNickKey, nickInput.value);
  }
});
