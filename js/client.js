// Define Client, Client Socket connection to Server
Client = {};
Client.socket = io.connect();

// To Server: Register New Player
Client.askNewPlayer = function(){
  Client.socket.emit('newPlayer', PlayerObj);
}

// To Server: Healer Healing Fighter
Client.healFighter = function(hitPoints){
  Client.socket.emit('healFighter', hitPoints);
}

// To Server: Fighter Attacking Enemy
Client.attackEnemy = function(damage){
  Client.socket.emit('attackEnemy', damage);
}

// To Server: Enemy Attacking Player
Client.attackPlayer = function(damage){
  Client.socket.emit('attackPlayer', damage)
}

// To Server: Fighter Dead
Client.playerDead = function(){
  Client.socket.emit('playerDead');
}

// To Client: Add New Player
Client.socket.on('newPlayer', function(data){
  Game.addNewPlayer(data);
});

// To Client: List All Players
Client.socket.on('allplayers', function(data){
  cl(data);
  for(var i = 0;i < data.length;i++){
    Game.addNewPlayer(data[i].id);
  }
})

// To Client: Remove Player
Client.socket.on('remove', function(id){
  Game.removePlayer(id);
});

// To Client: Update Player UI
Client.socket.on('updateUI', function(playerClass){
  PlayerObj.updateUI(playerClass);
})

// To Client: Heal Fighter
Client.socket.on('heal', function(hitPoints){
  PlayerObj.hitPoints ++;
})

// To Client: Attack Enemy
Client.socket.on('attackEnemy', function(damage){
  enemy.damage(damage);
})

// To Client: Attack Player
Client.socket.on('attackPlayer', function(damage){
  PlayerObj.takeDamage(damage);
})

// To Client: Player Dead
Client.socket.on('playerDead', function(){
  game.state.start("GameOver");
})
