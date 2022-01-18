const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

const { chatController } = require('./controllers');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/views'));

app.get('/', chatController);

require('./sockets/serverChat')(io);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
