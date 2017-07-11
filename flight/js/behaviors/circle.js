'use strict';

function Circle(options = {}) {

  // Circle is a type of Behavior.
  Behavior.call(this, options);

  this.radiusX = options['radiusX'] || 45;
  this.radiusY = options['radiusY'] || 45;

  this.direction = options['direction'] || 0;
  this.rotationSpeed = options['rotationSpeed'] || Math.PI / 30;

}

Circle.prototype = Object.create(Behavior.prototype);
Circle.prototype.constructor = Circle;

// Push object out to edge of circle.
Circle.prototype.pushOut = function(attributes){

  attributes.x = attributes.x + (this.radiusX * Math.cos( this.direction ));
  attributes.y = attributes.y + (this.radiusY * Math.sin( this.direction ));

  return attributes;

}

// Pull object into center of circle.
Circle.prototype.pullIn = function(attributes){

  // Move object to center of circle.
  attributes.x = attributes.x + (this.radiusX * Math.cos( this.direction + Math.PI ));
  attributes.y = attributes.y + (this.radiusY * Math.sin( this.direction + Math.PI ));

  return attributes;

}

// Update direction of circle.
Circle.prototype.updateDirection = function(){

  this.direction = this.direction + this.rotationSpeed;

}

// Overwrite prepare method.
Circle.prototype.prepare = function(attributes){

    // Push object out to edge of circle.
    attributes =  this.pushOut(attributes);

    return attributes;

}

// Overwrite apply method.
Circle.prototype.apply = function(attributes){

    // Pull object into center of circle.
    attributes =  this.pullIn(attributes);

    // Update direction of circle.
    this.updateDirection();

    // Push object out to edge of circle.
    attributes =  this.pushOut(attributes);

    return attributes;

};
