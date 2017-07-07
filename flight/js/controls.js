'use strict';

function Controls(options = {}) {

  this.action = false;
  this.actionDuration = 0;
  this.actionX = 0;
  this.actionY = 0;
  this.originX = 0;
  this.originY = 0;
  this.offsetX = 0;
  this.offsetY = 0;

  this.direction;

  this.keyUp = false;
  this.keyRight = false;
  this.keyDown = false;
  this.keyLeft = false;

  this.touch = false;
  this.mouse = false;

  this.dpadEnabled = true;
  this.dpadActive = false;
  this.dpadType = options['dpadType'] || 'slider';
  this.dpadLocation = 'left';
  this.dpadIgnoreRadius = 20;

}

Controls.prototype = {

  // Prepare controls.
  prepare: function() {

    // Set key related handlers.
    this.setKeyHandlers();

    // Set mouse related handlers.
    this.setMouseHandlers();

    // Set touch related handlers.
    this.setTouchHandlers();

  },

  // Set key handlers.
  setKeyHandlers: function() {

    //On key press...
    document.addEventListener('keydown', function(event){

      var self = game.level.controls;

      // If key code is 70 (f key)...
      if (event.keyCode == 70) {
        self.action = true;
      }

      // If key code is 38 (up key)...
      else if (event.keyCode == 38) {
        self.keyUp = true;
      }

      // If key code is 39 (right key)...
      else if (event.keyCode == 39) {
        self.keyRight = true;
      }

      // If key code is 40 (down key)...
      else if (event.keyCode == 40) {
        self.keyDown = true;
      }

      // If key code is 37 (left key)...
      else if (event.keyCode == 37) {
        self.keyLeft = true;
      }

    });

    //On key release...
    document.addEventListener('keyup', function(event){

      var self = game.level.controls;

      // If key code is 70 (f key)...
      if (event.keyCode == 70) {
        self.action = false;
      }

      // If key code is 39 (right key)...
      else if (event.keyCode == 39) {
        self.keyRight = false;
      }

      // If key code is 37 (left key)...
      else if (event.keyCode == 37) {
        self.keyLeft = false;
      }

      // If key code is 38 (up key)...
      else if (event.keyCode == 38) {
        self.keyUp = false;
      }

      // If key code is 40 (down key)...
      else if (event.keyCode == 40) {
        self.keyDown = false;
      }

    });

  },

  // Set mouse handlers.
  setMouseHandlers: function() {

    var self = game.level.controls;

    // On mouse click start...
    document.addEventListener('mousedown', function(event){

      // Indicate the start of a mouse action.
      self.mouse = true;

      // Process event start.
      self.processEventStart(event['clientX'], event['clientY']);

    });

    // On mouse click release...
    document.addEventListener('mouseup', function(event){

      // Indicate the end of a mouse action.
      self.mouse = false;

      // Process event end.
      self.processEventEnd(event['clientX'], event['clientY']);

    });

    // On mouse move...
    document.addEventListener('mousemove', function(event){

      // If mouse action is in progress...
      if (self.mouse) {

        // Process event move.
        self.processEventMove(event['clientX'], event['clientY']);

      }

    });

  },

  // Set touch handlers.
  setTouchHandlers: function() {

    //On touch start...
    document.body.addEventListener('touchstart', function(event){

      event.preventDefault();

      var self = game.level.controls;
      var touchCount = event['touches'].length;

      // Indicate the start of a touch action.
      self.touch = true;

      // Loop through touch points.
      for (var index = 0; index < event['touches'].length; index++) {

        var x = event['touches'][index]['clientX'];
        var y = event['touches'][index]['clientY'];

        // Process event start.
        self.processEventStart(x, y);

      }

    }, {passive: false});

    // If dpad touch end...
    document.body.addEventListener('touchend', function(event){

      event.preventDefault();

      var self = game.level.controls;
      var touchCount = event['changedTouches'].length;

      // Indicate the end of a touch action.
      self.touch = false;

      // Loop through touch points.
      for (var index = 0; index < touchCount; index++) {

        var x = event['changedTouches'][index]['clientX'];
        var y = event['changedTouches'][index]['clientY'];

        // Process event end.
        self.processEventEnd(x, y);

      }

    }, {passive: false});

    /*
    //On touch move...
    document.addEventListener('touchmove', function(event){

      event.preventDefault();

      var self = game.level.controls;
      var touchCount = event['touches'].length;

      // Loop through touch points.
      for (var index = 0; index < touchCount; index++) {

        // If touch falls within the dpad area...
        if (
          event['touches'][index]['clientX'] > self.dpadStartX &&
          event['touches'][index]['clientX'] < self.dpadEndX
        ) {

          // Get offsets between the start and current location of the touch event.
          self.touchOffsetX = event['touches'][index]['clientX'] - self.touchStartX;
          self.touchOffsetY = event['touches'][index]['clientY'] - self.touchStartY;

          // Get direction direction.
          self.direction = Math.atan2(self.touchOffsetY, self.touchOffsetX);

          // If control mode is basic...
          if (self.mode == 'basic') {

            // If touch offset is significant...
            if (Math.abs(self.touchOffsetY) > self.touchIgnoreRadius) {

              if (self.direction < 0) {
                self.direction = -.5 * Math.PI;
              }
              else {
                self.direction = .5 * Math.PI;
              }

            }
            else {

              // Set direction to null.
              self.direction = null;

            }

          }

          // If control mode is full...
          else if (self.mode == 'full') {

            // If touch offset is significant...
            if (
              Math.abs(self.touchOffsetX) > self.touchIgnoreRadius ||
              Math.abs(self.touchOffsetY) > self.touchIgnoreRadius
            ) {

              if (self.direction < 0) {

                if (self.direction > -.125 * Math.PI) {
                  self.direction = 2 * Math.PI;
                }
                else if (self.direction > -.375 * Math.PI) {
                  self.direction = -.25 * Math.PI;
                }
                else if (self.direction > -.625 * Math.PI) {
                  self.direction = -.5 * Math.PI;
                }
                else if (self.direction > -.875 * Math.PI) {
                  self.direction = -.75 * Math.PI;
                }
                else {
                  self.direction = Math.PI;
                }

              } else {

                if (self.direction < .125 * Math.PI) {
                  self.direction = 2 * Math.PI;
                }
                else if (self.direction < .375 * Math.PI) {
                  self.direction = .25 * Math.PI;
                }
                else if (self.direction < .625 * Math.PI) {
                  self.direction = .5 * Math.PI;
                }
                else if (self.direction < .875 * Math.PI) {
                  self.direction = .75 * Math.PI;
                }
                else {
                  self.direction = Math.PI;
                }

              }

            } else {

              // Set direction to null.
              self.direction = null;

            }

          }

        }

      }

    }, {passive: false});
    */

  },

  update: function() {

    // If action is active...
    if (this.action) {

      // Increment action duration.
      this.actionDuration++;

    } else {

      // Reset action duration to 0.
      this.actionDuration = 0;

    }

    // If direction is not already handled by touch or mouse events...
    if (this.dpadActive === false) {

      // Set direction based on key states.
      if (this.keyUp && this.keyRight) {
        this.direction = -.25 * Math.PI;
      }
      else if (this.keyUp && this.keyLeft) {
        this.direction = -.75 * Math.PI;
      }
      else if (this.keyUp) {
        this.direction = -.5 * Math.PI;
      }
      else if (this.keyDown && this.keyRight) {
        this.direction = .25 * Math.PI;
      }
      else if (this.keyDown && this.keyLeft) {
        this.direction = .75 * Math.PI;
      }
      else if (this.keyDown) {
        this.direction = .5 * Math.PI;
      }
      else if (this.keyRight) {
        this.direction = 2 * Math.PI
      }
      else if (this.keyLeft) {
        this.direction = Math.PI
      }
      else {
        this.direction = null;
      }

    }

  },

  processEventStart: function(x, y) {

    // If dpad is enabled...
    if (this.dpadEnabled) {

      // If origin is inside dpad location...
      if (
        (this.dpadLocation == 'left' && x < game.screenWidth / 2) ||
        (this.dpadLocation == 'right' && x > game.screenWidth / 2)
      ) {

        // If dpad is already active...
        if (this.dpadActive) {

          // Update action.
          this.action = true;
          this.actionX = x;
          this.actionY = y;

        } else {

          // Set dpad to active.
          this.dpadActive = true;

          // Update origin.
          this.originX = x;
          this.originY = y;

          // Reset offset.
          this.offsetX = 0;
          this.offsetY = 0;

        }

      } else {

        // Update action.
        this.action = true;
        this.actionX = x;
        this.actionY = y;

      }

    } else {

      // Update action.
      this.action = true;
      this.actionX = x;
      this.actionY = y;

    }

  },

  processEventEnd: function(x, y) {

    // If dpad is enabled...
    if (this.dpadEnabled) {

      // If touch point is inside dpad location...
      if (
        (this.dpadLocation == 'left' && x < game.screenWidth / 2) ||
        (this.dpadLocation == 'right' && x > game.screenWidth / 2)
      ) {

        // Reset dpad values.
        this.dpadActive = false;
        this.originX = 0;
        this.originY = 0;
        this.offsetX = 0;
        this.offsetY = 0;

      } else {

        // Update action.
        this.action = false;
        this.actionX = 0;
        this.actionY = 0;

      }

    } else {

      // Update action.
      this.action = false;
      this.actionX = 0;
      this.actionY = 0;

    }

  },

  processEventMove: function(x, y) {

    // If dpad is enabled...
    if (this.dpadEnabled) {

      // Update offset.
      this.offsetX = x - this.originX;
      this.offsetY = y - this.originY;

      // If dpad type is slider...
      if (this.dpadType == 'slider') {

        // If y offset is greater than dpad ignore radius...
        if (Math.abs(this.offsetY) > this.dpadIgnoreRadius) {

          // If vertical offset is negative...
          if (this.offsetY < 0) {

            // Set direction to up.
            this.direction = -.5 * Math.PI;

          } else {

            // Set direction to down.
            this.direction = .5 * Math.PI;

          }

        } else {

          // Set direction to null.
          this.direction = null;

        }

      } else {

        // If either x or y offsets are greater than dpad ignore radius...
        if (
          Math.abs(this.offsetX) > this.dpadIgnoreRadius ||
          Math.abs(this.offsetY) > this.dpadIgnoreRadius
        ) {

          // Get the precise direction.
          var preciseDirection = Math.atan2(this.offsetY, this.offsetX);

          // Convert precise direction into an approximate direction.
          if (preciseDirection < 0) {

            if (preciseDirection > -.125 * Math.PI) {
              this.direction = 2 * Math.PI;
            }
            else if (preciseDirection > -.375 * Math.PI) {
              this.direction = -.25 * Math.PI;
            }
            else if (preciseDirection > -.625 * Math.PI) {
              this.direction = -.5 * Math.PI;
            }
            else if (preciseDirection > -.875 * Math.PI) {
              this.direction = -.75 * Math.PI;
            }
            else {
              this.direction = Math.PI;
            }

          } else {

            if (preciseDirection < .125 * Math.PI) {
              this.direction = 2 * Math.PI;
            }
            else if (preciseDirection < .375 * Math.PI) {
              this.direction = .25 * Math.PI;
            }
            else if (preciseDirection < .625 * Math.PI) {
              this.direction = .5 * Math.PI;
            }
            else if (preciseDirection < .875 * Math.PI) {
              this.direction = .75 * Math.PI;
            }
            else {
              this.direction = Math.PI;
            }

          }

        } else {

          // Set direction to null.
          this.direction = null;

        }

      }

    }

  },

  draw: function() {

    // if dpad is active...
    if (this.dpadActive) {

      // Reset transformations and styles
      game.resetStage();

      // Get screen to canvas ratio.
      var screenCanvasRatio = game.width / game.screenWidth;

      // Position canvas for controls.
      game.stage.translate(this.originX * screenCanvasRatio, this.originY * screenCanvasRatio);

      // Draw touch ignore radius.
      game.stage.beginPath();
      game.stage.arc(0, 0, this.dpadIgnoreRadius, 0, 2 * Math.PI);
      game.stage.stroke();
      game.stage.closePath();

      // If direction is not null...
      if (this.direction !== null) {

        // Draw arc indicating touch direction.
        game.stage.beginPath();
        game.stage.lineWidth = 8;
        game.stage.arc(0, 0, this.dpadIgnoreRadius + 8, this.direction - .125 * Math.PI, this.direction + .125 * Math.PI);
        game.stage.stroke();
        game.stage.closePath();

      }

    }

  },

}
