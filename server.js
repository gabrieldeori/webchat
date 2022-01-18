const express = require('express');
const app = express();
const http = require('http').createServer(app);

const controllers = require('./controllers');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }});

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/views'));

app.get('/', controllers.chat);

require('./sockets/chat')(io);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
