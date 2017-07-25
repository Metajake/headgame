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

// Begin Server "Listening"
server.listen(process.env.PORT || 8081, function(){
  cl('Listening on ' + server.address().port);
})

// Player ID default value
server.lastPlayerID = 0;

// Define Game Specific Elements
var fighter;
var GAME = {
  playerMap : {}
};

// On Client Connection
io.on('connection', function(socket){
  // On Client.NewPlayer
  socket.on('newPlayer', function(data){
    // Define Player Object Properties
    socket.player = {
      id: socket.id,
      name: data.name,
      playerClass: data.playerClass
    }

    // Define Conditional Player Properties
    if(data.playerClass == 'fighter'){
      socket.player.hitPoints = 40;
      // Define Fighter ID (for healer reference)
      fighter = socket.id;
    }else{
      socket.player.hitPoints = 20;
    }

    // Add New Player to Player Map
    GAME.playerMap[socket.id] = socket.player;

    // Update Client Player Map
    io.emit('allplayers', GAME.playerMap);

    // Create New Player
    socket.emit('newPlayer', socket.player);

    // If Players Ready, Start Game
    checkPlayersReady();

    // On Player Disconnect
    socket.on('disconnect', function(){
      // If Fighter Disconnects, Remove Fighter ID Key
      if(GAME.playerMap[socket.id].playerClass == "fighter"){
        fighter = undefined;
      }

      // Remove Disconnected Player from Player Map
      GAME.playerMap[socket.id] = null;
      delete GAME.playerMap[socket.id];

      // Update Client Player Map
      io.emit('allplayers', GAME.playerMap);
    })

    // On Healer Heal
    socket.on('healFighter', function(data){
      if(fighter){
        io.sockets.connected[fighter].emit("heal", data);
      }
    });

    // On Fighter attack
    socket.on('attackEnemy', function(data){
      io.emit('attackEnemy', data);
    });

    // On Enemy attack
    socket.on('attackPlayer', function(data){
      if(fighter){
        io.sockets.connected[fighter].emit('attackPlayer', data);
      }
    });

    // On Player Dead
    socket.on('playerDead', function(){
      io.emit('playerDead');
    })
  });
})

// If 2 Players, Start Game
function checkPlayersReady(){
  if(Object.keys(GAME.playerMap).length == 2){
    io.emit('startGame');
  }
}
