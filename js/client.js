
// Define Client, Client Socket connection to Server
Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function(){
  Client.socket.emit('newPlayer', PlayerObj);
}

Client.healFighter = function(hitPoints){
  Client.socket.emit('healFighter', hitPoints);
}

Client.socket.on('newPlayer', function(data){
  Game.addNewPlayer(data);
});

Client.socket.on('allplayers', function(data){
  cl(data);
  for(var i = 0;i < data.length;i++){
    Game.addNewPlayer(data[i].id);
  }
})

Client.socket.on('remove', function(id){
  Game.removePlayer(id);
});

Client.socket.on('updateUI', function(playerClass){
  PlayerObj.updateUI(playerClass);
})

Client.socket.on('heal', function(hitPoints){
  PlayerObj.hitPoints ++;
})
