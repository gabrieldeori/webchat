const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });

const { chatController } = require('./controllers');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, '/views')));

app.get('/', chatController);

require('./sockets/serverChat')(io);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
