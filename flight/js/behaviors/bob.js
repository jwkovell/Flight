'use strict';

function Bob(options = {}) {

  // Bob is a type of Circle Behavior.
  Circle.call(this, options);

  this.radiusX = options['radiusX'] || 0;
  this.radiusY = options['radiusY'] || 50;

  this.direction = options['direction'] || 0;
  this.rotationSpeed = options['rotationSpeed'] || Math.PI / 10;

}

Bob.prototype = Object.create(Circle.prototype);
Bob.prototype.constructor = Bob;
