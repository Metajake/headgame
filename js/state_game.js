var enemy;

var Game = {
  init: function(){
    // Keep Game AnimationRequestFrame running when "tabbed" away
    game.stage.disableVisabilityChange = true;

    // Add New Client Player to Server
    Client.askNewPlayer();
  },
  preload: function(){

  },
  create: function(){
    Game.playerMap = {};
    game.time.advancedTiming = true;

    enemy = new Enemy(100, 300);
  },
  update: function(){
    if(PlayerObj.hitPoints < 1){
      Client.playerDead();
    }
  },
  render: function(){
    game.debug.text(game.time.fps, 16, 16, "#00ff00");
    game.debug.text("Game " + PlayerObj.playerClass + PlayerObj.hitPoints, 16, 32);
  },
  addNewPlayer: function(player){
    Game.playerMap[player.id] = player.id;
    PlayerObj.hitPoints = player.hitPoints;
  },
  removePlayer: function(id){
    Game.playerMap[id] = null;
    delete Game.playerMap[id];
  },
};
