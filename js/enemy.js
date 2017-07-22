function Enemy(x, y){
  this.hitPoints = 10;
  this.x = x;
  this.y = y;
  this.sprite = BMDSprite('#00ff00', "rect", this.x, this.y, 80, 80);
  this.HPDisplay = game.add.text(this.x, this.y, this.hitPoints, { font: "20px Arial", fill: "#000000", align: "left" });
  this.damage = function(damage){
    this.hitPoints -= damage;
    this.HPDisplay.setText(this.hitPoints);
  };
  this.attackPlayer = function(){
    Client.attackPlayer(5);
  }
};
