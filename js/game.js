function cl(toLog){
  console.log(toLog);
};

var Game = {
  init: function(){
    game.stage.disableVisabilityChange = true;
  },
  preload: function(){

  },
  create: function(){
    Game.playerMap = {};
    game.inputEnabled = true;
    // game.onInput...
  },
  update: function(){

  },
  render: function(){
    // console.log("rendering");
    game.debug.text("Game" + PlayerObj.playerClass, 32, 32);
  },
  addNewPlayer: function(id){
    Game.playerMap[id] = id;
  },
  removePlayer: function(id){
    Game.playerMap[id] = null;
    delete Game.playerMap[id];
  },
};

var PlayerObj = {
  updateUI: function(playerClass){
    PlayerObj.playerClass = playerClass;
    if(playerClass == "heal-slut"){
      // create a new bitmap data object
      var bmd = game.add.bitmapData(128,128);

      // draw to the canvas context like normal
      bmd.ctx.beginPath();
      bmd.ctx.rect(0,0,128,128);
      bmd.ctx.fillStyle = '#ff0000';
      bmd.ctx.fill();

      // use the bitmap data as the texture for the sprite
      var sprite = game.add.sprite(200, 200, bmd);
    }
  }
}
