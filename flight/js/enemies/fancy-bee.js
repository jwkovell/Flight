'use strict';

function FancyBee(options = {}, overrides = {}) {

  // FancyBee is a type of Enemy.
  Enemy.call(this, options, overrides);

  this.states = {
    'default': [
      new Sphere()
    ],
    'dead': [
      new Hold(),
      new Fall()
    ]
  };

  this.timeline = {
    0: 'default',
  };

}

FancyBee.prototype = Object.create(Enemy.prototype);
FancyBee.prototype.constructor = FancyBee;

// Overwrite update method.
FancyBee.prototype.update = function(){

  Enemy.prototype.update.call(this);

};
