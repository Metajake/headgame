// Shorthand Console Log
function cl(toLog){console.log(toLog);};

// Import Express, Define App, Import and define Server
var express = require('express');
var app = express();
var server = require('http').Server(app);

// Define Server "Listener"
var io = require('socket.io').listen(server);

// Define Express Static Asset Folders
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static('js'));
app.use('/assets', express.static(__dirname + '/assets'));

// Serve App Homepage
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})

// Player ID default value
server.lastPlayerID = 0;

// Begin Server "Listening"
server.listen(8081, function(){
  cl('Listening on ' + server.address().port);
})

// Define Game Specific Elements
var fighter;

// On Client Connection
io.on('connection', function(socket){
  // On Client.NewPlayer
  socket.on('newPlayer', function(data){
    socket.player = {
      id: server.lastPlayerID++,
      name: data.name,
      playerClass: data.playerClass
    }
    if(data.playerClass == 'fighter'){
      socket.player.hitPoints = 40;
      // Set Fighter ID (for healer reference)
      fighter = socket.id;
    }else{
      socket.player.hitPoints = 20;
    }

    // Broadcast All Players
    socket.emit('allplayers', getAllPlayers());

    // Updating New Player
    socket.emit('newPlayer', socket.player);

    // Update Player UI, depending on Player Class
    socket.emit('updateUI', socket.player.playerClass);

    // On Player Disconnect
    socket.on('disconnect', function(){
      io.emit('remove', socket.player.id);
    })

    // On Healer Heal
    socket.on('healFighter', function(data){
      io.sockets.connected[fighter].emit("heal", data);
    });

    // On Fighter attack
    socket.on('attackEnemy', function(data){
      io.emit('attackEnemy', data);
    });

    // On Enemy attack
    socket.on('attackPlayer', function(data){
      if(socket.player.playerClass == 'fighter'){
        io.sockets.connected[fighter].emit('attackPlayer', data);
      }
    });

    // On Player Dead
    socket.on('playerDead', function(){
      io.emit('playerDead');
    })
  });
})

// Get, Log, Return All Players
function getAllPlayers(){
  var players = [];
  Object.keys(io.sockets.connected).forEach(function(socketID){
    var player = io.sockets.connected[socketID].player;
    if(player){
      players.push(player);
    }
  });
  // cl(players);
  return players;
}
