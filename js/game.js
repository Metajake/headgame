var Game = {
  preload: function(){

  },
  init: function(){
    game.stage.disableVisabilityChange = true;
  },
  render: function(){
    // console.log("rendering");
    game.debug.text("Game", 32, 32);
  }
};
