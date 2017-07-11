'use strict';

function Level_2_1(options = {}) {

  // Level_2_1 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [
    new Enemy({
      x: 1000,
      y: 250,
      spawnX: 50,
    }),
    new FancyBee({
      x: 1000,
      y: 250,
      spawnX: 50,
      sphereBehaviorOverride: {
        direction: Math.PI * 2 * (1 / 6)
      }
    }),
  ];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_2_1.prototype = Object.create(Level.prototype);
Level_2_1.prototype.constructor = Level_2_1;
