function Scenery(options = {}) {

  // Basic properties.
  this.x = options['x'] || 0;
  this.y = options['y'] || 0;
  this.z = options['z'] || 0;

  this.width = options['width'] || 50;
  this.height = options['height'] || 50;

  this.rotation = options['rotation'] || 0;
  this.opacity = options['opacity'] || 1;

  this.spawnX = options['spawnX'] || 0;
  this.removeX = options['removeX'] || Infinity;

  // Properties with processed attributes.
  this.active = false;
  this.frame = 0;
  this.parallaxScale = 1;

}

Scenery.prototype = {

  prepare: function() {

    // Update parallax scale.
    this.parallaxScale = Math.pow(game.parallaxRate, this.z);

    // Apply parallax.
    this.x = this.x * this.parallaxScale;
    this.width = this.width * this.parallaxScale;
    this.height = this.height * this.parallaxScale;

  },

  update: function() {

    // Reference level.
    var level = game.level;

    // If level has scrolled into this object's region...
    if (level.offsetX >= this.spawnX) {

      // Update parallax scale.
      this.parallaxScale = Math.pow(game.parallaxRate, this.z);

      // Object is active.
      this.active = true;

      // If level has not scrolled out of this object's region...
      if (level.offsetX <= this.removeX) {

        // Update frame count;
        this.frame++;

        // Update position to move with the screen.
        this.x = this.x - level.offsetSpeedX * this.parallaxScale;

      }

      // Else, game has scrolled past this object's region...
      else {

        // Object is not active.
        this.active = false;

      }

    }

  },

  draw: function() {

    // If object is active...
    if (this.active) {

      // Reset transformations and styles
      game.resetStage();

      // Position.
      game.stage.translate(this.x, this.y);
      game.stage.rotate(this.rotation * Math.PI / 180);

      // Set opacity.
      game.stage.globalAlpha = this.opacity;

      // Draw.
      game.stage.beginPath();
      game.stage.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      game.stage.stroke();
      game.stage.closePath();

    }

  }

}
