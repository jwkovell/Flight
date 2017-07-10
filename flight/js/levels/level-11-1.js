'use strict';

function Level_11_1(options = {}) {

  // Level_11_1 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_11_1.prototype = Object.create(Level.prototype);
Level_11_1.prototype.constructor = Level_11_1;

/*

// Overwrite prepare method.
Level_11_1.prototype.prepare = function(){

  Level.prototype.prepare();

}

// Overwrite update method.
Level_11_1.prototype.update = function(){

  Level.prototype.update();

}

// Overwrite draw method.
Level_11_1.prototype.draw = function(){

  Level.prototype.draw();

}

*/
