const loggedUsers = {};

function usersHandler(io, socket) {
  socket.on('connected', (nickname) => {
    loggedUsers[socket.id] = nickname;
    const users = Object.values(loggedUsers);
    const socketId = socket.id;
    io.emit('updateUsers', { users, socketId });
  });
  socket.on('reNicknamed', (newNickname) => {
    loggedUsers[socket.id] = newNickname;
    const users = Object.values(loggedUsers);
    const socketId = socket.id;
    io.emit('updateUsers', { users, socketId });
  });
  socket.on('disconnect', () => {
    delete loggedUsers[socket.id];
    const users = Object.values(loggedUsers);
    const socketId = socket.id;
    io.emit('updateUsers', { users, socketId });
  });
}

module.exports = usersHandler;