require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

const port = process.env.PORT;
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(path.join(__dirname,'../public')))

io.on('connection',(socket) => {
  console.log('Client connected!');

  // socket.emit('newMessage',{from:'Admin',text:'Welcome to our site!'});
  // socket.broadcast.emit('newMessage',{from:'Admin',text:'User 1 had join chat!'});

  socket.on('join',(params,callback) => {
    if (!isRealString(params.name)||!isRealString(params.room)) {
      return callback("Name or room name are required.")
    }

    if (_.findIndex(users.users,(u) => u.name===params.name && u.room===params.room)!==-1) {
      return callback("This name has been taken!")
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    socket.emit('newMessage',generateMessage("Admin","Welcome to our site!"));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage("System",`${params.name} has joined`));

    callback();
  });

  socket.on('createMessage',(mess, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(mess.text)) {
      io.to(user.room).emit('newMessage',generateMessage(user.name,mess.text));
    }
    callback("This is from server.");
  });

  socket.on('createLocationMessage',(pos) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,pos.lat,pos.long));
    }
  })

  socket.on('disconnect',() => {
    // console.log('Client has disconnect!');
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('System',`${user.name} has left!`));
    }
  });

});

server.listen(port,() => {
  console.log(`Server is ready on port ${port}`);
});

module.exports = {app};
