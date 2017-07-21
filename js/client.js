var Client = {};
var Player = {};
var newPlayerContainer = document.getElementById("new-player");
var newPlayerForm = document.getElementById("player-info");
var playerName = document.getElementById("player-name");
var playerClass = document.getElementById("player-class");

//New Player Form Submit, Connect, Remove Form
newPlayerForm.addEventListener('submit', function(event){
  event.preventDefault();
  Player.name = playerName.value;
  Player.playerClass = playerClass.value;
  newPlayerContainer.parentNode.removeChild(newPlayerContainer);
  Client.askNewPlayer();
});

Client.socket = io.connect();

Client.askNewPlayer = function(){
  Client.socket.emit('newplayer', Player);
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
