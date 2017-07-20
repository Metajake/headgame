var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('Game',Game);
game.state.start('Game');
