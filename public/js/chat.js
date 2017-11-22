var socket = io();

function scrollToBottom() {
  //selectors
  var messages = $("#messages");
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  // console.log(`clientHeight : ${clientHeight}`);
  // console.log(`scrollTop : ${scrollTop}`);
  // console.log(`scrollHeight : ${scrollHeight}`);
  // console.log(`newMessageHeight : ${newMessageHeight}`);
  // console.log(`lastMessageHeight : ${lastMessageHeight}`);

  if (clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight) {
    messages.scrollTop(scrollHeight);
    // console.log(messages.scrollTop());
  }

}

socket.on('connect', function() {
  // console.log("connected to server!");
  var params = $.deparam(window.location.search);

  socket.emit('join',params,function (err) {
    if (err) {
      var msg = $.param({error:err})
      window.location.href = '/?'+msg;
    } else {
      console.log("No Err");
    }
  })
});
socket.on('disconnect', function() {
  console.log("disconnected to server!");
});
socket.on('updateUserList',function (users) {
  // console.log(users);
  var ol = $('<ol></ol>');
  users.forEach(function (user) {
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
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
