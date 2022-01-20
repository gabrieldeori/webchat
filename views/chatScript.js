const client = window.io();

function randomizeAlphabetic(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const sSNickKey = 'sessionStorageNicknameKeyFromWebChat';
const userNickName = sessionStorage.getItem(sSNickKey) || randomizeAlphabetic(16);

if (!sessionStorage.getItem(sSNickKey) || sessionStorage.getItem(sSNickKey) === undefined) {
  sessionStorage.setItem(sSNickKey, userNickName);
}

function setNick(nickname) {
  const onlineUser = document.querySelector('#onlineUser');
  onlineUser.innerHTML = nickname;
}

setNick(userNickName);
