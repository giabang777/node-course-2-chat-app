var socket = io();
socket.on('connect', function() {
  console.log("connected to server!");
});
socket.on('disconnect', function() {
  console.log("disconnected to server!");
});
socket.on('newMessage',(mess) => {
  // console.log(mess);
  var li = $('<li></li>');
  li.text(`${mess.from}: ${mess.text}`);
  $("#messages").append(li);
});

$('#message-form').on('submit',function (e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {from:'User',text:$("[name=message]").val()},
    function (data) {});
});
