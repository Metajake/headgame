function PlayerObj(id, hitPoints, playerClass, x, y){
  this.id = id;
  this.x = x;
  this.y = y;
  this.hitPoints = hitPoints;
  this.playerClass = playerClass;
  this.updateUI = function(){
    if(this.playerClass == "heal-slut"){
      // Make "Heal Button" Sprite
      this.sprite = BMDSprite("#ff0000", "rect", game.width * this.x, game.height * this.y, 128, 128);
      this.sprite.inputEnabled = true;
      this.sprite.events.onInputDown.add(this.healFighter, this)
      this.sprite.specialName = "healer";
    } else if (this.playerClass = "fighter"){
      // Make "Heal Button" Sprite
      this.sprite = BMDSprite("#0000ff", "circle", game.width * this.x, game.height * this.y, game.width, game.height);
      this.sprite.inputEnabled = true;
      this.sprite.events.onInputDown.add(this.attackEnemy, this)
      this.sprite.specialName = "fighter";
    }
  };
  this.healFighter = function(){
    Client.healFighter(1);
  };
  this.attackEnemy = function(){
    game.rnd.integerInRange(0,1) ? Client.attackEnemy(1) : (function(){cl("Missed!")})();
  };
  this.takeDamage = function(damage){
    this.hitPoints -= damage;
  };
}
