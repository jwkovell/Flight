'use strict';

function Level_4_1(options = {}) {

  // Level_4_1 is a type of Level.
  Level.call(this, options);

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

Level_4_1.prototype = Object.create(Level.prototype);
Level_4_1.prototype.constructor = Level_4_1;
