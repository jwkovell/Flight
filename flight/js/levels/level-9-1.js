'use strict';

function Level_9_1(options = {}) {

  // Level_9_1 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_9_1.prototype = Object.create(Level.prototype);
Level_9_1.prototype.constructor = Level_9_1;

