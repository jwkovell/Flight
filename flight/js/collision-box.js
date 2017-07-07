'use strict';

function CollisionBox(options = {}) {

  this.x = options['x'] || 0;
  this.y = options['y'] || 0;
  this.width = options['width'] || 0;
  this.height = options['height'] || 0;

}

CollisionBox.prototype = {

  set: function(options = {}) {

    this.x = options['x'] || 0;
    this.y = options['y'] || 0;
    this.width = options['width'] || 0;
    this.height = options['height'] || 0;

  }

}
