'use strict';

function Dragon(options = {}) {

  this.x = options['x'] || 100;
  this.y = options['y'] || game.height / 2;

  this.width = options['width'] || 120;
  this.height = options['height'] || 60;

  this.rotation = 0;
  this.rotationIncrement = 5 * Math.PI / 180;
  this.minRotation = -15 * Math.PI / 180;
  this.maxRotation = 15 * Math.PI / 180;
  
  this.speed = 10;

  this.invincibilityFrames = 0;
  this.maxInvincibilityFrames = 30;

  this.health = 100;
  this.maxHealth = 100;

  this.stamina = 100;
  this.maxStamina = 100;

  this.flameCost = 2;
  this.flameDurration = 0;
  this.flameDelay = 4;
  this.fireballCost = 20;

  this.collisionBox = {};

  this.prepare();

}

Dragon.prototype = {

  prepare: function() {

    // Generate collision box.
    this.collisionBox = new CollisionBox();

  },

  update: function() {

    // Reference level.
    var level = game.level;

    // Reference controls.
    var controls = level.controls;

    // Decrement invincibility frames.
    this.invincibilityFrames--;

    // If action is in progress...
    if (controls.action) {

      // Increment flame duration.
      this.flameDuration++;

      // If action has been active for more frames than the flame delay...
      if (this.flameDuration >= this.flameDelay) {

        // If dragon has enough stamina to breath flames...
        if (this.stamina > this.flameCost) {

          // If this is the 3rd frame...
          if (this.flameDuration % 1 === 0) {

            // Update dragon's stamina.
            this.stamina = this.stamina - this.flameCost;

            // Add a new flame to the stage.
            level.flames.push(new Flame());

          }

        }

      }

    } else {

      // If fire was active for fewer frames than the flame delay...
      if (this.flameDuration < this.flameDelay && this.flameDuration > 0) {

        // If dragon has enough stamina to breath a fireball...
        if (this.stamina > this.fireballCost) {

          // Update dragon's stamina.
          this.stamina = this.stamina - this.fireballCost;

          // Add a new fireball to the stage.
          level.fireballs.push(new Fireball());

        }

      }

      // Reset flame duration.
      this.flameDuration = 0;

    }

    // If stamina has not maxed out...
    if (this.stamina < this.maxStamina) {

      // controls action is not in progress...
      if (controls.action == false) {

        // Increment stamina.
        this.stamina++;

      }

    }

    // If control direction is mostly upward...
    if (controls.direction <= -.25 * Math.PI && controls.direction >= -.75 * Math.PI) {

      // If current rotation is greater than minimum rotation.
      if (this.rotation > this.minRotation) {

        // Reduce current rotation by rotation increment.
        this.rotation = this.rotation - this.rotationIncrement;

      } else {

        // Set current rotation to minimum rotation.
        this.rotation = this.minRotation;

      }

    }

    // Else, if control direction is mostly downward...
    else if (controls.direction >= .25 * Math.PI && controls.direction <= .75 * Math.PI) {

      // If current rotation is less than maximum rotation.
      if (this.rotation < this.maxRotation) {

        // Reduce current rotation by rotation increment.
        this.rotation = this.rotation + this.rotationIncrement;

      } else {

        // Set current rotation to minimum rotation.
        this.rotation = this.maxRotation;

      }

    }

    // Else, assume control direction is flat.
    else {

      // If current rotation is more than 0 by rotation increment...
      if (this.rotation > this.rotationIncrement) {

        // Reduce rotation by rotation increment.
        this.rotation = this.rotation - this.rotationIncrement;

        // Nudge vertical position up.
        this.y = this.y + this.speed;

      }

      // Else, if current rotation is less than 0 by rotation increment...
      else if (this.rotation < -this.rotationIncrement) {

        // Increase rotation by rotation increment.
        this.rotation = this.rotation + this.rotationIncrement;

        // Nudge vertical position down.
        this.y = this.y - this.speed;

      }

      // Else, if current rotation is not 0...
      else if (this.rotation !== 0) {

        // Set current rotation to 0.
        this.rotation = 0;

      }

    }

    // If direction is defined.
    if (controls.direction !== null) {

      // Update Y coordinates based on current control direction.
      this.y = this.y + (this.speed * Math.sin( controls.direction ));

      // If dpad type is full...
      if (controls.dpadType == 'full') {

        // Update X coordinates based on current control direction.
        this.x = this.x + (this.speed * Math.cos( controls.direction ));

      }

    }

    // Prevent dragon from falling off screen.
    if (this.x - this.width/2 < 0) {
      this.x = this.width/2;
    }
    else if (this.x + this.width/2 > game.width) {
      this.x = game.width - this.width/2;
    }
    if (this.y - this.height/2 < 0) {
      this.y = this.height/2;
    }
    else if (this.y + this.height/2 > game.height) {
      this.y = game.height - this.height/2;
    }

    // Update collision box.
    this.updateCollisionBox();

  },

  // Update collision box.
  updateCollisionBox: function() {

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

  },

  collision: function(object) {

    // If dragon is not currently invincible...
    if (this.invincibilityFrames <= 0) {

      // If object has a damage property...
      if ('damage' in object) {

        // Reset invincibility frames.
        this.invincibilityFrames = this.maxInvincibilityFrames;
  
        // Reduce health of dragon by given damage.
        this.health = this.health - object.damage;
  
      }
  
      // If health is 0 or less...
      if (this.health <= 0) {

        // Limit health to no less than 0.
        this.health = 0;

      }

    }

  },

  draw: function() {

    // Reset transformations and styles
    game.resetStage();

    // Draw collision box.
    game.stage.globalAlpha = .25;
    game.stage.beginPath();
    game.stage.lineWidth = 4;
    if (this.invincibilityFrames > 0) {
      game.stage.strokeStyle="#0000ff";
    } else {
      game.stage.strokeStyle="#ff0000";
    }
    game.stage.rect(this.collisionBox['x'], this.collisionBox['y'], this.collisionBox['width'], this.collisionBox['height']);
    game.stage.stroke();
    game.stage.closePath();

    // Reset transformations and styles.
    game.resetStage();

    // Position.
    game.stage.translate(this.x, this.y);
    game.stage.rotate(this.rotation);

    // Draw dragon.
    game.stage.beginPath();
    game.stage.rect(-(this.width / 2), -(this.height / 2), this.width, this.height);
    game.stage.stroke();
    game.stage.closePath();

  },

}
