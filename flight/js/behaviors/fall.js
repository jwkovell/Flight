'use strict';

function Fall(options = {}) {

  // Fall is a type of Behavior.
  Behavior.call(this, options);

  this.speed = options['speed'] || 10;

}

Fall.prototype = Object.create(Behavior.prototype);
Fall.prototype.constructor = Fall;

// Overwrite apply method.
Fall.prototype.apply = function(attributes){

    attributes.y = attributes.y + this.speed;

    attributes.opacity = attributes.opacity - .1;

    if (attributes.opacity < 0) {
      attributes.opacity = 0;
    }

    return attributes;

};
