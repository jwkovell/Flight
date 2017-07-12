'use strict';

function Level_4_1(options = {}) {

  // Level_4_1 is a type of Level.
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
      spawnX: 50
    },{
      states: {
        'default': [
          new Sphere({
            direction: Math.PI * 1 / 3,
            rotationSpeedY: Math.PI / 30
          })
        ]
      }
    }),
    new FancyBee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Sphere({
            direction: Math.PI * 2 / 3,
            rotationSpeedY: Math.PI / 30
          })
        ]
      }
    }),
    new FancyBee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Sphere({
            direction: Math.PI,
            rotationSpeedY: Math.PI / 30
          })
        ]
      }
    }),
    new FancyBee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Sphere({
            direction: Math.PI * 4 / 3,
            rotationSpeedY: Math.PI / 30
          })
        ]
      }
    }),
    new FancyBee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Sphere({
            direction: Math.PI * 5 / 3,
            rotationSpeedY: Math.PI / 30
          })
        ]
      }
    }),
    new FancyBee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Sphere({
            direction: Math.PI * 2,
            rotationSpeedY: Math.PI / 30
          })
        ]
      }
    }),
  ];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_4_1.prototype = Object.create(Level.prototype);
Level_4_1.prototype.constructor = Level_4_1;
