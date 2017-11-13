require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT;
const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname,'../public')))

io.on('connection',(socket) => {
  console.log('Client connected!');

  // socket.emit('newMessage',{from:'Admin',text:'Welcome to our site!'});
  // socket.broadcast.emit('newMessage',{from:'Admin',text:'User 1 had join chat!'});
  socket.emit('newMessage',generateMessage("Admin","Welcome to our site!"));
  socket.broadcast.emit('newMessage',generateMessage("System",`${socket.id} is joined`));

  socket.on('createMessage',(mess, callback) => {
    io.emit('newMessage',generateMessage(mess.from,mess.text));
    callback("This is from server.");
    // io.emit('newMessage',{
    //   from:mess.from,
    //   text:mess.text,
    //   createAt:new Date().getTime()
    // });

    // socket.broadcast.emit('newMessage',{
    //   frome:mess.from,
    //   text:mess.text,
    //   createAt:new Date().getTime()
    // })
  });

  socket.on('disconnect',() => {
    console.log('Client has disconnect!');
  });

});

server.listen(port,() => {
  console.log(`Server is ready on port ${port}`);
});

module.exports = {app};
