var ClassSelect = {
  init: function(){
    // Add New Client Player to Server
    Client.askNewPlayer();
  },
  preload: function(){

  },
  create: function(){

  },
  update: function(){

  },
  render: function(){
    game.debug.text(game.state.current, 16, 16);
  },
  addNewPlayer: function(player){
    
    // Define Player Properties
    PlayerObj.id = player.id;
    PlayerObj.hitPoints = player.hitPoints;
    PlayerObj.playerClass = player.playerClass;
  },
}
