var PlayerObj = {
  updateUI: function(playerID){
    if(this.playerClass == "heal-slut"){
      // Make "Heal Button" Sprite
      sprite = BMDSprite("#ff0000", "rect", 100, 100, 128, 128);
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(PlayerObj.healFighter, this)
    } else if (this.playerClass = "fighter"){
      // Make "Heal Button" Sprite
      sprite = BMDSprite("#0000ff", "circle", game.width/2, game.height/2, game.width, game.height);
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(PlayerObj.attackEnemy, this)
    }
  },
  healFighter: function(){
    Client.healFighter(1);
  },
  attackEnemy: function(){
    game.rnd.integerInRange(0,1) ? Client.attackEnemy(1) : (function(){cl("false")})();
  },
  takeDamage: function(damage){
    this.hitPoints -= damage;
  }
}
