'use strict';

function Level() {

  this.dragon = {};
  this.hud = {};
  this.controls = {};

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

    // Prepare controls.
    this.controls.prepare();

  },

  // Update level.
  update: function() {



  },

  // Draw level.
  draw: function() {


  }

}