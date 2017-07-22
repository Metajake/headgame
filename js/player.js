var PlayerObj = {
  hitPoints: 40,
  updateUI: function(playerClass){
    // cl("updating UI");
    PlayerObj.playerClass = playerClass;
    if(playerClass == "heal-slut"){
      // Make "Heal Button" Sprite
      sprite = BMDSprite("#ff0000", "rect", 100, 100, 128, 128);
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(PlayerObj.healFighter, this)
    } else if (playerClass = "fighter"){
      // Make "Heal Button" Sprite
      sprite = BMDSprite("#0000ff", "circle", game.width/2, game.height/2, game.width, game.height);
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(PlayerObj.attack, this)
    }
  },
  healFighter: function(){
    Client.healFighter(1);
  },
  attack: function(){
    Client.attackEnemy(1);
  }
}
