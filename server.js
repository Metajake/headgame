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

// Enemy ID default value
var lastEnemyID = 0;

// Define Game Specific Elements
var fighter;
var GAME = {
  playerMap : {},
  enemyMap : {}
};

// On Client Connection
io.on('connection', function(socket){
  // On Client.NewPlayer
  socket.on('newPlayer', function(data){
    // Define Player Object Properties
    socket.player = {
      id: socket.id,
      name: data.name,
      playerClass: data.playerClass,
      hitPoints: data.hitPoints,
      x: data.x,
      y: data.y
    }

    // Define Fighter ID (for healer reference)
    if(data.playerClass == 'fighter'){
      fighter = socket.id;
    }

    // Add New Player to Player Map
    GAME.playerMap[socket.id] = socket.player;

    // Update Client Player Map
    io.emit('allplayers', GAME.playerMap);

    // Create New Player
    socket.emit('newPlayer', socket.player);

    // If Players Ready, Start Game
    checkPlayersReady(io);

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

      // Remove All Enemies if All Players Disconnect
      if(Object.keys(GAME.playerMap).length == 0){
        GAME.enemyMap = {};
      }

      // To Client: Disconnect Player
      socket.emit('disconnectPlayer');
    })

    // On Healer Heal
    socket.on('healFighter', function(data){
      if(fighter){
        io.sockets.connected[fighter].emit("heal", data);
      }
    });

    // On Fighter attack
    socket.on('attackEnemy', function(data){
      GAME.enemyMap[0].hitPoints -= data;
      io.emit('attackEnemy', GAME.enemyMap[0].hitPoints);
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

    // If Server Enemies Exist Create them on Client
    socket.on('askIfEnemy', function(data){
      if(Object.keys(GAME.enemyMap).length){
        Object.keys(GAME.enemyMap).forEach(function(enemy){
          socket.emit('newEnemy', GAME.enemyMap[enemy]);
        });
      }else{
        enemyID = lastEnemyID++;
        enemy = {
          id: enemyID,
          hitPoints: data.hitPoints,
          x: data.x,
          y: data.y,
          landscapeX: data.landscapeX,
          landscapeY: data.landscapeY
        }
        // Update Game Enemy Map
        GAME.enemyMap[enemyID] = enemy;

        // Update Client Enemy Map
        io.emit('allEnemies', GAME.enemyMap);

        // Create New Enemy on Client
        io.emit('newEnemy', enemy);
      }
    });
  }); // END Socket On 'newPlayer'
});

// If 2 Players, Start Game
function checkPlayersReady(connection){
  if(Object.keys(GAME.playerMap).length == 2){
    connection.emit('startGame');
  }
}
