'use strict';

function Level_1_3(options = {}) {

  // Level_1_3 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_1_3.prototype = Object.create(Level.prototype);
Level_1_3.prototype.constructor = Level_1_3;

// Overwrite prepare method.
Level_1_3.prototype.prepare = function(){

  Level.prototype.prepare();

}

// Overwrite prepare method.
Level_1_3.prototype.draw = function(){

}

// Overwrite draw method.
Level_1_3.prototype.draw = function(){

}