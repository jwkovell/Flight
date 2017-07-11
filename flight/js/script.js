var game;

document.addEventListener('DOMContentLoaded', function(){

  // Instantiate game.
  game = new Game();

  // Prepare game.
  game.prepare();

});

window.addEventListener('resize', function() {

  game.screenWidth = window.innerWidth;
  game.screenHeight = window.innerHeight;

}, true);
