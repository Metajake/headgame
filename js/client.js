// Define Client, Client Socket connection to Server
Client = {};

Client.init = function(){
  Client.socket = io.connect();

  // To Server: Register New Player
  Client.askNewPlayer = function(){
    Client.socket.emit('newPlayer', classSelection);
  }

  Client.askIfEnemy = function(data){
    Client.socket.emit('askIfEnemy', data);
  }

  // To Server: Add Enemy
  Client.addEnemy = function(data){
    Client.socket.emit('newEnemy', data)
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

  // To Client: Mirror Game Player Map to Server Player Map
  Client.socket.on('allplayers', function(data){
    GAME.playerMap = data;
  });

  // To Client: Add New Player
  Client.socket.on('newPlayer', function(data){
    ClassSelect.addNewPlayer(data); // Plans to make this state agnostic
  });

  // To Client: Mirror Game Enemy Map to Server Enemy Map
  Client.socket.on('allEnemies', function(data){
    GAME.enemyMap = data;
    // Game.addNewEnemy(data[1]); // Plans to make this state agnostic
  });

  // To Client: Add New Enemy
  Client.socket.on('newEnemy', function(data){
    Game.addNewEnemy(data); // Plans to make this state agnostic
  });

  // To Client: Heal Fighter
  Client.socket.on('heal', function(hitPoints){
    playerObj.hitPoints ++;
  })

  // To Client: Attack Enemy
  Client.socket.on('attackEnemy', function(damage){
    GAME.enemyMap[0].damage(damage);
  })

  // To Client: Attack Player
  Client.socket.on('attackPlayer', function(damage){
    playerObj.takeDamage(damage);
  })

  // Disconnect Client
  Client.socket.on('disconnectPlayer', function(){
    io.socket.disconnect();
  })

  // To Client: Start Game
  Client.socket.on('startGame', function(){
    game.state.start('Game');
  })

  // To Client: Player Dead, Game Over
  Client.socket.on('playerDead', function(){
    game.state.start("GameOver");
  })
}
