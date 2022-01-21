const loggedUsers = {};

function usersHandler(io, socket) {
  socket.on('connected', (nickname) => {
    loggedUsers[socket.id] = nickname;
    io.emit('updateUsers', loggedUsers);
  });
  socket.on('reNicknamed', (newNickname) => {
    loggedUsers[socket.id] = newNickname;
    io.emit('updateUsers', loggedUsers);
  });
  socket.on('disconnect', () => {
    delete loggedUsers[socket.id];
    io.emit('updateUsers', loggedUsers);
  });
}

module.exports = usersHandler;