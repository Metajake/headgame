var enemy;

var Game = {
  init: function(){
    // Keep Game AnimationRequestFrame running when "tabbed" away
    game.stage.disableVisabilityChange = true;
  },
  preload: function(){

  },
  create: function(){
    game.time.advancedTiming = true;

    enemy = new Enemy(100, 300);

    // Create Player Update
    PlayerObj.updateUI();
  },
  update: function(){
    // Game Over If Player Hit Points < 1
    if(PlayerObj.hitPoints < 1){
      Client.playerDead();
    }

    // Game Over if Enemy Hit Points < 1
    if(enemy.hitPoints < 1){
      game.state.start("GameOver");
    }
  },
  render: function(){
    game.debug.text(game.time.fps, 16, 16, "#00ff00");
    game.debug.text("Game " + PlayerObj.playerClass + PlayerObj.hitPoints, 16, 32);
  }
};
