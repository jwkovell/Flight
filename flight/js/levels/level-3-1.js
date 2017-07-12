'use strict';

function Level_3_1(options = {}) {

  // Level_3_1 is a type of Level.
  Level.call(this, options);

  // This is a fast level!
  this.offsetSpeedX = 8;

  this.background = [
    new Grid({
      x: 2500,
      y: 500,
      z: -15,
      rotation: Math.PI / 4,
      width: 2000,
      height: 2000,
      spawnX: 0,
      color: 'rgba(0, 0, 0, .25)',
    }),
    new Grid({
      x: 3500,
      y: 600,
      z: -15,
      rotation: Math.PI / 4,
      width: 2000,
      height: 2000,
      spawnX: 0,
      color: 'rgba(0, 0, 0, .25)',
    }),
    new Grid({
      x: 500,
      y: 175,
      z: -4,
      width: 200,
      height: 100,
      spawnX: 0,
      color: 'rgba(0, 0, 0, .25)',
    }),
    new Grid({
      x: 1000,
      y: 100,
      z: -4,
      width: 200,
      height: 100,
      spawnX: 0,
      color: 'rgba(0, 0, 0, .25)',
    }),
    new Grid({
      x: 1500,
      y: 150,
      z: -4,
      width: 200,
      height: 100,
      spawnX: 0,
      color: 'rgba(0, 0, 0, .25)',
    }),
    new Grid({
      x: 0,
      y: 250,
      spawnX: 0,
    }),
    new Grid({
      x: 500,
      y: 250,
      spawnX: 0,
    }),
    new Grid({
      x: 1000,
      y: 250,
      spawnX: 0,
    }),
    new Grid({
      x: 1500,
      y: 250,
      spawnX: 0,
    }),
    new Grid({
      x: 2000,
      y: 250,
      spawnX: 0,
    }),
    new Grid({
      x: 2500,
      y: 250,
      spawnX: 0,
    }),
    new Grid({
      x: 3000,
      y: 250,
      spawnX: 0,
    }),
    new Grid({
      x: 3500,
      y: 250,
      spawnX: 0,
    }),
    new Grid({
      x: 4000,
      y: 250,
      spawnX: 0,
    }),
    new Grid({
      x: 4500,
      y: 250,
      spawnX: 0,
    }),
    new Grid({
      x: 5000,
      y: 250,
      spawnX: 0,
    }),
  ];
  this.enemies = [
    new Enemy({
      x: 1000,
      y: 50,
      spawnX: 50,
    }),
    new Enemy({
      x: 1000,
      y: 100,
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
  this.foreground = [
    new Grid({
      x: 0,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
    new Grid({
      x: 500,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
    new Grid({
      x: 1000,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
    new Grid({
      x: 1500,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
    new Grid({
      x: 2000,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
    new Grid({
      x: 2500,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
    new Grid({
      x: 3000,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
    new Grid({
      x: 3500,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
    new Grid({
      x: 4000,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
    new Grid({
      x: 4500,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
    new Grid({
      x: 5000,
      y: 750,
      z: 3,
      color: 'rgba(0, 0, 0, 1)',
      spawnX: 0,
    }),
  ];

}

Level_3_1.prototype = Object.create(Level.prototype);
Level_3_1.prototype.constructor = Level_3_1;
