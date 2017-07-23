//Define Phaser Game, Game State
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');
game.state.add('Game',Game);
game.state.add('GameOver',GameOver);

//Focus on Name Input
document.getElementById("player-name").focus();

//Define New PLayer Form Elements
var newPlayerContainer = document.getElementById("new-player");
var newPlayerForm = document.getElementById("player-info");

//New Player Form Submit
newPlayerForm.addEventListener('submit', function(event){
  // Prevent Default Page Reloading
  event.preventDefault();

  // Remove New Player Form
  PlayerObj.name = document.getElementById("player-name").value;
  PlayerObj.playerClass = document.getElementById("player-class").value;
  newPlayerContainer.parentNode.removeChild(newPlayerContainer);

  // Start Game State
  game.state.start('Game');
});
