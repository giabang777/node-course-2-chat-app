var socket = io();
socket.on('connect', function() {
  console.log("connected to server!");
});
socket.on('disconnect', function() {
  console.log("disconnected to server!");
});
socket.on('newMessage',(mess) => {
  console.log(mess);
});

// socket.emit('createMessage',{from:'user1',to:'all',text:'Hi there!'})
