
//Define Game, Game State
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');

game.state.add('Game',Game);
game.state.start('Game');

//Focus on Name Input
document.getElementById("player-name").focus();

//Define New PLayer Form Elements
var newPlayerContainer = document.getElementById("new-player");
var newPlayerForm = document.getElementById("player-info");

//New Player Form Submit, Connect, Remove Form, Restore Pointer Events to Top Window
newPlayerForm.addEventListener('submit', function(event){
  event.preventDefault();
  Player.name = document.getElementById("player-name").value;
  Player.playerClass = document.getElementById("player-class").value;
  newPlayerContainer.parentNode.removeChild(newPlayerContainer);
  Client.askNewPlayer();
});
