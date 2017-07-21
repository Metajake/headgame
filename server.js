function cl(toLog){
  console.log(toLog);
}

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static('js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})

server.lastPlayerID = 0;

server.listen(8081, function(){
  cl('Listening on ' + server.address().port);
})

clients = [];

io.on('connection', function(socket){
  clients.push(socket.id);
  socket.on('newplayer', function(data){
    socket.player = {
      id: server.lastPlayerID++,
      name: data.name,
      playerClass: data.playerClass
    }
    socket.emit('allplayers', getAllPlayers());
    socket.emit('updateUI', socket.player.playerClass);
    socket.broadcast.emit('newplayer', socket.player); // send message from client to all other clients

    socket.on('disconnect', function(){
      io.emit('remove', socket.player.id);
    })
  })
})


function getAllPlayers(){
  var players = [];
  Object.keys(io.sockets.connected).forEach(function(socketID){
    var player = io.sockets.connected[socketID].player;
    if(player){
      players.push(player);
    }
  });
  cl(players);
  return players;
}
