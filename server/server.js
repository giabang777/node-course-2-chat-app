require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname,'../public')))

io.on('connection',(socket) => {
  console.log('Client connected!');

  socket.emit('newMessage',{
    from:'Admin',
    text:'Hello, do you need help?',
    createAt:12131
  })
  socket.on('createMessage',(mess) => {
    console.log(mess);
  })

  socket.on('disconnect',() => {
    console.log('Client has disconnect!');
  });

});

server.listen(port,() => {
  console.log(`Server is ready on port ${port}`);
});

module.exports = {app};
