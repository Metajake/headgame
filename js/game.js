function cl(toLog){
  console.log(toLog);
};

var Client = {};

var Game = {
  init: function(){
    game.stage.disableVisabilityChange = true;
  },
  preload: function(){

  },
  create: function(){
    Game.playerMap = {};
    game.time.advancedTiming = true;
  },
  update: function(){

  },
  render: function(){
    game.debug.text(game.time.fps, 16, 16, "#00ff00");
    game.debug.text("Game" + PlayerObj.playerClass + PlayerObj.hitPoints, 16, 32);
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
  hitPoints: 0,
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
      var sprite = game.add.sprite(100, 100, bmd);
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(PlayerObj.healFighter, this)
    }
  },
  healFighter: function(){
    Client.healFighter(1);
  }
}
