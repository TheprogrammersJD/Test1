var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clickx = [];
var clicky = [];

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  for(var n = 0; n < clickx.length; n++){
		socket.emit('click', clickx[n], clicky[n]);
  }
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('click', function(x, y){
    console.log('Somebody clicked at: ' + x + ", " + y);
	clickx.push(x);
	clicky.push(y);
	socket.broadcast.emit('click', x, y);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

