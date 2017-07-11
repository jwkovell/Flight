'use strict';

function Bob(options = {}) {

  // Bob is a type of Circle Behavior.
  Circle.call(this, options);

  this.radiusX = options['radiusX'] || 0;
  this.radiusY = options['radiusY'] || 30;

}

Bob.prototype = Object.create(Circle.prototype);
Bob.prototype.constructor = Bob;
