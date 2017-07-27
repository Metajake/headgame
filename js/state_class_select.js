var ClassSelect = {
  init: function(){
    // Keep Game AnimationRequestFrame running when "tabbed" away
    game.stage.disableVisabilityChange = true;

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
    playerObj = new PlayerObj(player.id, player.hitPoints, player.playerClass, player.x, player.y);
  },
}
