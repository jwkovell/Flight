'use strict';

function Bee(options = {}, overrides = {}) {

  // Bee is a type of Enemy.
  Enemy.call(this, options, overrides);

  this.states = {
    'default': [
      new Circle()
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

Bee.prototype = Object.create(Enemy.prototype);
Bee.prototype.constructor = Bee;

// Overwrite update method.
Bee.prototype.update = function(){

  Enemy.prototype.update.call(this);

};
