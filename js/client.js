// var Client = {};
var Player = {};

Client.socket = io.connect();

Client.askNewPlayer = function(){
  Client.socket.emit('newplayer', Player);
}

Client.healFighter = function(hitPoints){
  Client.socket.emit('healFighter', hitPoints);
}

Client.socket.on('newplayer', function(data){
  Game.addNewPlayer(data.id);
});

Client.socket.on('allplayers', function(data){
  console.log(data);
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
