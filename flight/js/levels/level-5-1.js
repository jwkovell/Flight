'use strict';

function Level_5_1(options = {}) {

  // Level_5_1 is a type of Level.
  Level.call(this, options);

  this.background = [];
  this.enemies = [
    new Enemy({
      x: 1000,
      y: 250,
      spawnX: 50,
    },{
      states: {
        'default': [
          new Bob()
        ]
      }
    }),
  ];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

}

Level_5_1.prototype = Object.create(Level.prototype);
Level_5_1.prototype.constructor = Level_5_1;
