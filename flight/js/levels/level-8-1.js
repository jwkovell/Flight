'use strict';

function Level_8_1(options = {}) {

  // Level_8_1 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_8_1.prototype = Object.create(Level.prototype);
Level_8_1.prototype.constructor = Level_8_1;
