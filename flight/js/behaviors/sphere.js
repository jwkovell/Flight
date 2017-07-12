'use strict';

function Sphere(options = {}) {

  // Sphere is a type of Circle Behavior.
  Circle.call(this, options);

  this.radiusX = options['radiusX'] || 100;
  this.radiusY = options['radiusY'] || 100;

  this.scaledRadiusX = options['radiusX'] || 100;
  this.scaledRadiusY = options['radiusY'] || 100;

  this.direction = options['direction'] || 0;
  this.directionX = options['directionX'] || 0;
  this.directionY = options['directionY'] || Math.PI / 2;

  this.rotationSpeed = options['rotationSpeed'] || Math.PI / 15;
  this.rotationSpeedX = options['rotationSpeedX'] || Math.PI / 30;
  this.rotationSpeedY = options['rotationSpeedY'] || 0;

}

Sphere.prototype = Object.create(Circle.prototype);
Sphere.prototype.constructor = Sphere;

// Push object out to edge of circle.
Sphere.prototype.pushOut = function(attributes){

  // Scale X and Y radii.
  this.scaleRadii();

  attributes.x = attributes.x + (this.scaledRadiusX * Math.cos( this.direction ));
  attributes.y = attributes.y + (this.scaledRadiusY * Math.sin( this.direction ));

  return attributes;

}

// Pull object into center of circle.
Sphere.prototype.pullIn = function(attributes){

  // Scale X and Y radii.
  this.scaleRadii();

  attributes.x = attributes.x + (this.scaledRadiusX * Math.cos( this.direction + Math.PI ));
  attributes.y = attributes.y + (this.scaledRadiusY * Math.sin( this.direction + Math.PI ));

  return attributes;

}

// Update direction of circle.
Sphere.prototype.updateDirection = function(){

  this.direction = this.direction + this.rotationSpeed;
  this.directionX = this.directionX + this.rotationSpeedX;
  this.directionY = this.directionY + this.rotationSpeedY;

}

// Scale X and Y radii.
Sphere.prototype.scaleRadii = function(){

  this.scaledRadiusX = this.radiusX * Math.cos(this.directionX);
  this.scaledRadiusY = this.radiusY * Math.sin(this.directionY);

}
