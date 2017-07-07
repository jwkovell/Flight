'use strict';

function Level_1(options = {}) {

  // Level_1 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_1.prototype = Object.create(Level.prototype);
Level_1.prototype.constructor = Level_1;

// Overwrite prepare method.
Level_1.prototype.prepare = function(){

}

// Overwrite prepare method.
Level_1.prototype.draw = function(){

}

// Overwrite draw method.
Level_1.prototype.draw = function(){

}