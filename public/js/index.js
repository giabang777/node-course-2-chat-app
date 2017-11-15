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
socket.on('newLocationMessage',function (message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>')

  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  $("#messages").append(li);
});

$('#message-form').on('submit',function (e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {from:'User',text:$("[name=message]").val()},
    function (data) {});
});

var locationButton = $("#send-location");
locationButton.on('click',function () {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.")
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit('createLocationMessage',{
      "lat":position.coords.latitude,
      "long":position.coords.longitude
    });
  },function () {
    alert('Unable to fetch location.')
  });
})
