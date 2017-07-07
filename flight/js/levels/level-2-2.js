'use strict';

function Level_2_2(options = {}) {

  // Level_2_2 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_2_2.prototype = Object.create(Level.prototype);
Level_2_2.prototype.constructor = Level_2_2;

// Overwrite prepare method.
Level_2_2.prototype.prepare = function(){

  Level.prototype.prepare();

}

// Overwrite prepare method.
Level_2_2.prototype.draw = function(){

}

// Overwrite draw method.
Level_2_2.prototype.draw = function(){

}