'use strict';

function Level_1_1(options = {}) {

  // Level_1_1 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [
    new Enemy({
      x: 1000,
      y: 250,
      spawnX: 50,
    }),
    new Bee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Circle({
            direction: Math.PI * 1 / 3
          })
        ]
      }
    }),
    new Bee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Circle({
            direction: Math.PI * 2 / 3
          })
        ]
      }
    }),
    new Bee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Circle({
            direction: Math.PI
          })
        ]
      }
    }),
    new Bee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Circle({
            direction: Math.PI * 4 / 3
          })
        ]
      }
    }),
    new Bee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Circle({
            direction: Math.PI * 5 / 3
          })
        ]
      }
    }),
    new Bee({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Circle({
            direction: Math.PI * 2
          })
        ]
      }
    }),
  ];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_1_1.prototype = Object.create(Level.prototype);
Level_1_1.prototype.constructor = Level_1_1;
