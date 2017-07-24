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
  ClassSelect.addNewPlayer(data); // Plans to make this state agnostic
});

// To Client: Mirror Game Player Map to Server Player Map
Client.socket.on('allplayers', function(data){
  GAME.playerMap = data;
})

// To Client: Start Game
Client.socket.on('startGame', function(){
  game.state.start('Game');
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

// To Client: Player Dead, Game Over
Client.socket.on('playerDead', function(){
  game.state.start("GameOver");
})
