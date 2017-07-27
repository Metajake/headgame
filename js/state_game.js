var enemy;

var Game = {
  init: function(){
    // Keep Game AnimationRequestFrame running when "tabbed" away
    game.stage.disableVisabilityChange = true;
  },
  preload: function(){

  },
  create: function(){
    // Set Advanced Timing for FPS debugging
    game.time.advancedTiming = true;

    // Add One Enemy
    Client.askIfEnemy({hitPoints: 50, x:0.1, y:0.1, landscapeX: 0.01, landscapeY: 0.01});

    // Create Player Update
    playerObj.updateUI();

  },
  update: function(){
    // Game Over If Player Hit Points < 1
    if(PlayerObj.hitPoints < 1){
      // Client.playerDead();
    }

    // Game Over if Enemy Hit Points < 1
    // if(enemy.hitPoints < 1){
    //   game.state.start("GameOver");
    // }
  },
  render: function(){
    game.debug.text(game.time.fps, 16, 16, "#00ff00");
    game.debug.text("Game " + playerObj.playerClass + playerObj.hitPoints, 16, 32);
  },
  addNewEnemy: function(enemy){
    // Add New Enemy to Game Enemy Map
    GAME.enemyMap[enemy.id] = new Enemy(enemy.hitPoints, enemy.x, enemy.y, enemy.landscapeX, enemy.landscapeY);
    // cl(GAME.enemyMap);
  }
};
