var socket = io();
socket.on('connect', function() {
  console.log("connected to server!");
});
socket.on('disconnect', function() {
  console.log("disconnected to server!");
});
socket.on('newMessage',(mess) => {
  var formattedTime = moment(mess.createdAt).format('hh:mm');
  var template = $("#message-template").html()
  var html = Mustache.render(template,{
    text:mess.text,
    from:mess.from,
    createdAt:formattedTime
  });
  $("#messages").append(html);
});
socket.on('newLocationMessage',function (message) {
  var formattedTime = moment(message.createdAt).format('hh:mm');
  var template = $("#location-message-template").html();
  var html = Mustache.render(template,{
    url:message.url,
    from:message.from,
    createdAt:formattedTime
  });
  $("#messages").append(html);
});

$('#message-form').on('submit',function (e) {
  e.preventDefault();
  var messageTextBox = $("[name=message]");
  if (messageTextBox.val()) {
    socket.emit(
      'createMessage',
      {from:'User',text:messageTextBox.val()},
      function (data) {
        messageTextBox.val("").focus();
      }
    );
  }
});

var locationButton = $("#send-location");
locationButton.on('click',function () {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.")
  }
  locationButton.attr("disabled","disabled").text("Sending location...")

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr("disabled").text("Send location!");
    socket.emit('createLocationMessage',{
      "lat":position.coords.latitude,
      "long":position.coords.longitude
    });
  },function () {
    locationButton.removeAttr("disabled").text("Send location!");
    alert('Unable to fetch location.')
  });
})
