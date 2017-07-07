function Loop() {

  this.maxFPS = 24;
  this.lastFrame = 0;
  this.timePassed = 1;

}

Loop.prototype = {

  mainLoop: function(timestamp) {

    // If insufficient time has passed...
    if (timestamp < game.loop.lastFrame + (1000 / game.loop.maxFPS)) {

      // Restart loop.
      requestAnimationFrame(game.loop.mainLoop);

    } else {

      // Update time passed.
      game.loop.timePassed = (timestamp - game.loop.lastFrame) / 100;

      // Update last frame.
      game.loop.lastFrame = timestamp;

      // If a lot of time has passed...
      if (game.loop.timePassed > 1000) {

        // Reset the time passed counter.
        game.loop.timePassed = 0;

      }

      // Update game.
      game.update();

      // Redraw game.
      game.draw();

      // Restart loop.
      requestAnimationFrame(game.loop.mainLoop);

    }

  }

}