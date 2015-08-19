var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
	socket.on('chat_message', function (msg){
		socket.broadcast.emit('chat_message', msg);
	});
	socket.on('user name set', function(name){
		socket.broadcast.emit('chat_message', {'name':'Admin', 'message': name + ' joined the conversation'});
	})
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

