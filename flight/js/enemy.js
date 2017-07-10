'use strict';

function Enemy(options = {}) {

  this.x = options['x'] || 0;
  this.y = options['y'] || 0;
  this.z = options['z'] || 0;

  this.rotation = options['rotation'] || 0;
  this.direction = options['direction'] || Math.PI;
  
  this.width = options['width'] || 20;
  this.height = options['height'] || 20;

  this.regionStart = options['regionStart'] || 0;
  this.regionEnd = options['regionEnd'] || Infinity;

  this.opacity = options['opacity'] || 1;
  this.damage = options['damage'] || 5;

  this.invincibilityFrames = 0;
  this.maxInvincibilityFrames = 10;

  var defaultStates = {
    default: [],
    dead: [],
  };

  this.states = options['states'] || defaultStates;
  this.currentBehaviors = options['currentBehaviors'] || [];

  this.health = options['health'] || 5;

  this.collisionBox = {};
  this.active = false;
  this.frame = 0;

  var defaultTimeline = {
    0: 'default'
  };

  this.timeline = options['timeline'] || defaultTimeline;
  this.useTimeline = true;

}

Enemy.prototype = {

  prepare: function() {

    // Generate collision box.
    this.collisionBox = new CollisionBox();

  },

  collision: function(object, options = {}) {

    // If enemy is not currently invincible, or forceCollision is true...
    if (this.invincibilityFrames <= 0 || options['forceCollision'] == true) {

      // If object has a damage property...
      if ('damage' in object) {

        // Reset invincibility frames.
        this.invincibilityFrames = this.maxInvincibilityFrames;

        // Reduce the health of this enemy by the given damage.
        this.health = this.health - object.damage;

      }

      // If health is 0 or less...
      if (this.health <= 0) {

        // If current state is not already "dead"...
        if (this.currentState !== 'dead') {

          // Update current state to "dead".
          this.currentState = 'dead';

          // Update behaviors.
          this.updateBehaviors(this.currentState);

        }

      }

    }

  },

  updateBehaviors: function(state) {

    // Update current behaviors to those from this state.
    this.currentBehaviors = this.states[state];

  },

  applyTimeline: function() {

    // Loop through timeline.
    for (var timestamp in this.timeline) {

      // Restrict loop to own properties.
      if (this.timeline.hasOwnProperty(timestamp)) {

        // If timestamp has passed...
        if (timestamp <= this.frame) {

          // Get state from this timestamp.
          var state = this.timeline[timestamp];

          // Remove this timestamp.
          delete this.timeline[timestamp]

          // Update current behaviors to those from this state.
          this.updateBehaviors(state);

          // Stop looping through the timeline.
          break;

        }

      }

    }

  },

  applyBehavior: function(behavoirID) {

    var behaviorResuts = this.currentBehaviors[behavoirID].apply({
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      direction: this.direction
    });

    // Loop through result attributes.
    for (var property in behaviorResuts) {

      // Restrict loop to own properties.
      if (behaviorResuts.hasOwnProperty(property)) {

        // If this property is "fire"...
        if (property == 'fire') {

          // If fire is true...
          if (behaviorResuts[property] === true) {

            // Run this enemies fire command.
            this.fire();

          }

        } else {

          // Update enemy property.
          this[property] = behaviorResuts[property];

        }

      }

    }

  },

  update: function() {

    // Reference level.
    var level = game.level;

    // If level has scrolled into this object's region...
    if (level.offsetX >= this.regionStart) {

      // Object is active.
      this.active = true;

      // If level has not scrolled out of this object's region...
      if (level.offsetX <= this.regionEnd) {

        // Update frame count;
        this.frame++;

        // Update invincibilityFrames;
        this.invincibilityFrames--;

        // If enemy is set to use the timeline...
        if (this.useTimeline) {

          // Apply timeline.
          this.applyTimeline();

        }

        // Update position to move with the screen.
        this.x = this.x - level.offsetSpeedX;

        // Loop through current behaviors.
        for (var behavoirID in this.currentBehaviors) {

          // Apply behavior.
          this.applyBehavior(behaviorID);

        }

        // Update collision box.
        this.updateCollisionBox();

      }

      // Else, level has scrolled past this object's region...
      else {

        // Object is not active.
        this.active = false;

      }

    }

  },

  // Fire.
  fire: function() {

    game.enemies.push(new Thorn({
      'x': this.x,
      'y': this.y,
      'direction': this.rotation + Math.PI,
      'rotation': this.rotation,
    }));

  },

  // Update collision box.
  updateCollisionBox: function() {

    // If the enemy is dead...
    if (this.status == 'dead') {

      // Shrink collision box.
      this.collisionBox.set();

    } else {

      // Calculate sin and cos for current rotation.
      var rotationSin = Math.abs(Math.sin(this.rotation));
      var rotationCos = Math.abs(Math.cos(this.rotation));

      // Calculate collision box width and height.
      var boxWidth = this.height * rotationSin + this.width * rotationCos;
      var boxHeight = this.height * rotationCos + this.width * rotationSin;

      // Set updated collision box values.
      this.collisionBox.set({
        x: this.x - boxWidth / 2,
        y: this.y - boxHeight / 2,
        width: boxWidth,
        height: boxHeight
      });

    };

  },

  draw: function() {

    // If object is active...
    if (this.active) {

      // Reset transformations and styles
      game.resetStage();

      // Draw collision box.
      game.stage.globalAlpha = .25;
      game.stage.beginPath();
      game.stage.lineWidth = 4;
      game.stage.strokeStyle="#ff0000";
      game.stage.rect(this.collisionBox['x'], this.collisionBox['y'], this.collisionBox['width'], this.collisionBox['height']);
      game.stage.stroke();
      game.stage.closePath();
      game.stage.lineWidth = 1;

      // Reset styles.
      game.stage.strokeStyle="#000000";
      game.stage.globalAlpha = 1;
  
      // Position.
      game.stage.translate(this.x, this.y);
      game.stage.rotate(this.rotation);

      if (this.invincibilityFrames > 0) {
        game.stage.globalAlpha = .5;
      }

      // Draw
      game.stage.beginPath();
      game.stage.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      game.stage.stroke();
      game.stage.closePath();
      game.stage.beginPath();
      game.stage.moveTo(0, 0);
      game.stage.lineTo(-this.width / 2, 0);
      game.stage.stroke();

    }

  },

}
