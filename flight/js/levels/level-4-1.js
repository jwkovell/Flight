'use strict';

function Level_4_1(options = {}) {

  // Level_4_1 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [
    new Enemy({
      x: 1000,
      y: 50,
      spawnX: 50,
    }),
    new Enemy({
      x: 1000,
      y: 150,
      spawnX: 50,
    }),
    new Enemy({
      x: 1000,
      y: 200,
      spawnX: 50,
    }),
    new Enemy({
      x: 1000,
      y: 250,
      spawnX: 50,
    }),
    new Enemy({
      x: 1000,
      y: 300,
      spawnX: 50,
    }),
    new Enemy({
      x: 1000,
      y: 350,
      spawnX: 50,
    }),
    new Enemy({
      x: 1000,
      y: 400,
      spawnX: 50,
    }),
    new Enemy({
      x: 1000,
      y: 450,
      spawnX: 50,
    }),
  ];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_4_1.prototype = Object.create(Level.prototype);
Level_4_1.prototype.constructor = Level_4_1;
