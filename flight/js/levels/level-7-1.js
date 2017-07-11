'use strict';

function Level_7_1(options = {}) {

  // Level_7_1 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_7_1.prototype = Object.create(Level.prototype);
Level_7_1.prototype.constructor = Level_7_1;
