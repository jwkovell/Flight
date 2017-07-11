'use strict';

function Hold(options = {}) {

  // Hold is a type of Behavior.
  Behavior.call(this, options);

}

Hold.prototype = Object.create(Behavior.prototype);
Hold.prototype.constructor = Hold;

// Overwrite apply method.
Hold.prototype.apply = function(attributes){

    // Update position to counter offset.
    attributes.x = attributes.x + game.level.offsetSpeedX;
    attributes.y = attributes.y + game.level.offsetSpeedY;

    return attributes;

};
