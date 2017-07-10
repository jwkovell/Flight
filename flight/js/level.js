'use strict';

function Level() {

  this.dragon = {};
  this.controls = {};
  this.hud = {};

  this.offsetX = 0;
  this.offsetY = 0;
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

    // Increment stage offset by offset speed.
    this.offsetX = this.offsetX + this.offsetSpeedX;
    this.offsetY = this.offsetY + this.offsetSpeedY;

    // Update controls.
    this.controls.update();

    // Update dragon.
    this.dragon.update();

    // Update HUD.
    this.hud.update();

    // Loop through the enemies.
    this.enemies.forEach(function(enemy){

      // Update enemy.
      enemy.update();

    });    

  },

  // Draw level.
  draw: function() {

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

  }

}