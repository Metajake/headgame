var Game = {
  preload: function(){

  },
  create: function(){
    Game.playerMap = {};
    Client.askNewPlayer();
  },
  init: function(){
    game.stage.disableVisabilityChange = true;
  },
  render: function(){
    // console.log("rendering");
    game.debug.text("Game", 32, 32);
  },
  addNewPlayer: function(id){
    Game.playerMap[id] = id;
  },
  removePlayer: function(id){
    Game.playerMap[id] = null;
    delete Game.playerMap[id];
  }
};
