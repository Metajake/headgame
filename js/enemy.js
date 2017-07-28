function Enemy(hitPoints, x, y, landscapeX, landscapeY){
  this.hitPoints = hitPoints;
  this.x = x;
  this.y = y;
  this.landscapeX = landscapeX;
  this.landscapeY = landscapeY;
  this.sprite = BMDSprite('#00ff00', "rect", game.width * this.x, game.width * this.y, 80, 80);
  this.sprite.specialName = "enemy";
  this.HPDisplay = game.add.text(0,0 , this.hitPoints, { font: "20px uni0553", fill: "#FFFFFF", align: "left" });
  this.sprite.addChild(this.HPDisplay);
  this.attackTimer = game.time.events.loop(Phaser.Timer.SECOND*2, function(){this.attackPlayer()}, this);
  this.damage = function(damage){
    this.hitPoints -= damage;
    this.HPDisplay.setText(this.hitPoints);
  };
  this.attackPlayer = function(){
    Client.attackPlayer(5);
  }
};
