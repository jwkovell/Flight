'use strict';

function Level() {

  this.dragon = {};
  this.controls = {};
  this.hud = {};

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level.prototype = {

  // Prepare level.
  prepare: function() {

    console.log('prepare level');

    // Instantiate controls.
    this.controls = new Controls();
    this.controls.prepare();

    // Instantiate dragon.
    this.dragon = new Dragon();

    // Instantiate HUD.
    this.hud = new Hud();
    this.hud.prepare();

  },

  // Update level.
  update: function() {

    // Update controls.
    this.controls.update();

    // Update dragon.
    this.dragon.update();

    // Update HUD.
    this.hud.update();

  },

  // Draw level.
  draw: function() {

    // Draw controls.
    this.controls.draw();

    // Draw dragon.
    this.dragon.draw();

    // Draw HUD.
    this.hud.draw();

  }

}