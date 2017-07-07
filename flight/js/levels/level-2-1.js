'use strict';

function Level_2_1(options = {}) {

  // Level_2_1 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_2_1.prototype = Object.create(Level.prototype);
Level_2_1.prototype.constructor = Level_2_1;

// Overwrite prepare method.
Level_2_1.prototype.prepare = function(){

  Level.prototype.prepare();

}

// Overwrite prepare method.
Level_2_1.prototype.draw = function(){

}

// Overwrite draw method.
Level_2_1.prototype.draw = function(){

}