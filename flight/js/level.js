'use strict';

function Level() {

  this.dragon = {};
  this.controls = {};
  this.hud = {};

  this.offsetX = 0;
  this.offsetY = 0;
  this.endX = 10000;
  this.endY = 0;
  this.offsetSpeedX = 4;
  this.offsetSpeedY = 0;

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level.prototype = {

  // Prepare level.
  prepare: function() {

    // Instantiate controls.
    this.controls = new Controls();
    this.controls.prepare();

    // Instantiate dragon.
    this.dragon = new Dragon();

    // Instantiate HUD.
    this.hud = new Hud();
    this.hud.prepare();

    // Loop through the enemies.
    this.enemies.forEach(function(enemy){

      // Prepare enemy.
      enemy.prepare();

    });

  },

  // Update level.
  update: function() {

    // If game state is default...
    if (game.state == 'default') {
      this.updateDefaultState();
    }

    // Else, if game state is paused...
    else if (game.state == 'paused') {
      this.updatePauseState();
    }

    // Else, if game state is victory...
    else if (game.state == 'victory') {
      this.updateVictoryState();
    }

    // Else, if game state is defeat...
    else if (game.state == 'defeat') {
      this.updateDefeatState();
    }

  },

  // Update level default state.
  updateDefaultState: function() {

    // Increment stage offset by offset speed.
    this.offsetX = this.offsetX + this.offsetSpeedX;
    this.offsetY = this.offsetY + this.offsetSpeedY;

    // Update controls.
    this.controls.update();

    // Update dragon.
    this.dragon.update();

    // Update HUD.
    this.hud.update();

    // Loop through enemies.
    this.enemies.forEach(function(enemy){

      // Update enemy.
      enemy.update();

    });

    // Loop through flames.
    this.flames.forEach(function(flame){

      // Update flame.
      flame.update();

    });

    // Loop through fireballs.
    this.fireballs.forEach(function(fireball){

      // Update fireball.
      fireball.update();

    });

    // Check for collisions.
    this.checkCollisions();

    // Perform cleanup.
    this.cleanup();

    // If game return/enter is pressed...
    if (game.level.controls.pause) {

      // Pause game.
      game.state = 'paused';

      // Inactivate pause control.
      game.level.controls.pause = false;

    } else {

      // If game has reached end point.
      if (this.offsetX >= this.endX) {

        // Advance to victory screen.
        game.state = 'victory';

      }

    }

  },

  // Update level pause state.
  updatePauseState: function() {

    // If game return/enter is pressed...
    if (game.level.controls.pause) {

      // Resume game.
      game.state = 'default';

      // Inactivate pause control.
      game.level.controls.pause = false;

    }

  },

  // Update level victory state.
  updateVictoryState: function() {
    
  },

  // Update level defeat state.
  updateVictoryState: function() {
    
  },

  checkCollisions: function() {

    // Loop through enemies.
    for (var enemyIndex = 0; enemyIndex < this.enemies.length; enemyIndex++) {

      // Loop through flames.
      for (var flameIndex = 0; flameIndex < this.flames.length; flameIndex++) {

        // Check collision between this enemy and this flame.
        var flameCollision = game.checkCollision(this.flames[flameIndex],this.enemies[enemyIndex]);

        // If collision is detected...
        if (flameCollision) {

          // Fire enemy collision method.
          this.enemies[enemyIndex].collision(this.flames[flameIndex]);

          // Don't check for any more flame/enemy collisions.
          break;

        }

      }

      // Loop through fireballs.
      for (var FireballIndex = 0; FireballIndex < this.fireballs.length; FireballIndex++) {

        // Check collision between this enemy and this fireball.
        var fireballCollision = game.checkCollision(this.fireballs[FireballIndex],this.enemies[enemyIndex]);

        // If collision is detected...
        if (fireballCollision) {

          // Fire enemy collision method.
          this.enemies[enemyIndex].collision(this.fireballs[FireballIndex], {forceCollision: true});

          // Don't check for any more fireball/enemy collisions.
          break;

        }

      }

      // Check collision between this enemy and dragon.
      var enemyCollision = game.checkCollision(this.enemies[enemyIndex], this.dragon);

      // If collision is detected...
      if (enemyCollision) {

        // Fire dragon collision method.
        this.dragon.collision(this.enemies[enemyIndex]);

        // Don't check for any more enemy/dragon collisions.
        break;

      }

    }

  },

  cleanup: function() {

    // Loop through flames in reverse order.
    for (var flameIndex = this.flames.length - 1; flameIndex >= 0; flameIndex--) {

      // If this flame has expired...
      if (this.flames[flameIndex].isExpired()) {

        // Remove the flame.
        this.flames.splice(flameIndex, 1);

      }

    }

    // Loop through fireballs in reverse order.
    for (var fireballIndex = this.fireballs.length - 1; fireballIndex >= 0; fireballIndex--) {

      // If this fireball has expired...
      if (this.fireballs[fireballIndex].isExpired()) {

        // Remove the fireball.
        this.fireballs.splice(fireballIndex, 1);

      }

    }

    // Loop through enemies in reverse order.
    for (var enemyIndex = this.enemies.length - 1; enemyIndex >= 0; enemyIndex--) {

      // If this enemy is no longer active...
      if (this.enemies[enemyIndex].active === false) {

        // Remove the enemy.
        this.enemies.splice(enemyIndex, 1);

      }

    }

  },

  // Draw level.
  draw: function() {

    // If game state is default...
    if (game.state == 'default') {
      this.drawDefaultState();
    }

    // Else, if game state is paused...
    else if (game.state == 'paused') {
      this.drawPauseState();
    }

    // Else, if game state is victory...
    else if (game.state == 'victory') {
      this.drawVictoryState();
    }

    // Else, if game state is defeat...
    else if (game.state == 'defeat') {
      this.drawDefeatState();
    }

  },

  // Draw level default state.
  drawDefaultState: function() {

    // Draw controls.
    this.controls.draw();

    // Draw dragon.
    this.dragon.draw();

    // Draw HUD.
    this.hud.draw();

    // Loop through the enemies.
    this.enemies.forEach(function(enemy){

      // Draw enemy.
      enemy.draw();

    });

    // Loop through flames.
    this.flames.forEach(function(flame){

      // Draw flame.
      flame.draw();

    });

    // Loop through fireballs.
    this.fireballs.forEach(function(fireball){

      // Draw fireball.
      fireball.draw();

    });

  },

  // Draw level pause state.
  drawPauseState: function() {

    this.drawDefaultState();

    // Reset transformations and styles
    game.resetStage();

    // Draw pause screen.
    game.stage.beginPath();
    game.stage.globalAlpha = .5;
    game.stage.rect(0, 0, game.width, game.height);
    game.stage.fill();
    game.stage.closePath();

  },

  // Draw level victory state.
  drawVictoryState: function() {

    // Draw victory screen.
    game.stage.beginPath();
    game.stage.fillStyle="#eeeeff";
    game.stage.rect(0, 0, game.width, game.height);
    game.stage.fill();
    game.stage.closePath();

  },

  // Draw level defeat state.
  drawDefeatState: function() {

    // Draw defeat screen.
    game.stage.beginPath();
    game.stage.fillStyle="#ffeeee";
    game.stage.rect(0, 0, game.width, game.height);
    game.stage.fill();
    game.stage.closePath();

  },

}