// OPTION 2: Change Orientation Updates Game Layout
$(window).on("orientationchange", reorientScreen);

//Define Phaser Game, Game State
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');
game.state.add('Game',Game);
game.state.add('GameOver',GameOver);
game.state.add('ClassSelect',ClassSelect);

//Focus on Name Input
document.getElementById("player-name").focus();

//Define New PLayer Form Elements
var newPlayerContainer = document.getElementById("new-player");
var newPlayerForm = document.getElementById("player-info");

// Player Class Selection
var classSelection = {};

//New Player Form Submit
newPlayerForm.addEventListener('submit', function(event){
  // Prevent Default Page Reloading
  event.preventDefault();

  // Initialize Client, Connect Client to Server
  Client.init();

  // Remove New Player Form
  classSelection.name = document.getElementById("player-name").value;
  classSelection.playerClass = document.getElementById("player-class").value;
  if(classSelection.playerClass == "fighter"){
    classSelection.x = .5;
    classSelection.y = .5;
    classSelection.hitPoints = 40;
  }else{
    classSelection.x = .2;
    classSelection.y = .2;
    classSelection.hitPoints = 20;
  }
  newPlayerContainer.parentNode.removeChild(newPlayerContainer);

  // Start Game State
  game.state.start('ClassSelect');
});
