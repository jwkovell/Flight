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

  this.mouse = false;

  this.dpadEnabled = true;
  this.dpadActive = false;
  this.dpadType = options['dpadType'] || 'full'; //vertical
  this.dpadLocation = 'left';
  this.dpadIgnoreRadius = 10;

  this.pause = false;
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

    // Reference level controls.
    var controls = game.level.controls;  

    //On key press...
    document.addEventListener('keydown', function(event){

      // If key code is 70 (F key)...
      if (event.keyCode == 70) {
        controls.action = true;
      }

      // If key code is 13 (enter/return key)...
      else if (event.keyCode == 13) {
        controls.pause = true;
      }

      // If key code is 38 (up key)...
      else if (event.keyCode == 38) {
        controls.keyUp = true;
      }

      // If key code is 39 (right key)...
      else if (event.keyCode == 39) {
        controls.keyRight = true;
      }

      // If key code is 40 (down key)...
      else if (event.keyCode == 40) {
        controls.keyDown = true;
      }

      // If key code is 37 (left key)...
      else if (event.keyCode == 37) {
        controls.keyLeft = true;
      }

    }, false);

    //On key release...
    document.addEventListener('keyup', function(event){

      // If key code is 70 (f key)...
      if (event.keyCode == 70) {
        controls.action = false;
      }

      // If key code is 13 (enter/return key)...
      else if (event.keyCode == 13) {
        controls.pause = false;
      }

      // If key code is 39 (right key)...
      else if (event.keyCode == 39) {
        controls.keyRight = false;
      }

      // If key code is 37 (left key)...
      else if (event.keyCode == 37) {
        controls.keyLeft = false;
      }

      // If key code is 38 (up key)...
      else if (event.keyCode == 38) {
        controls.keyUp = false;
      }

      // If key code is 40 (down key)...
      else if (event.keyCode == 40) {
        controls.keyDown = false;
      }

    }, false);

  },

  // Set mouse handlers.
  setMouseHandlers: function() {

    // Reference level controls.
    var controls = game.level.controls;

    // On mouse click start...
    document.addEventListener('mousedown', function(event){

      // Indicate the start of a mouse action.
      controls.mouse = true;

      // Process event start.
      controls.pointerStart(event['clientX'], event['clientY']);

    }, {passive: true});

    // On mouse click release...
    document.addEventListener('mouseup', function(event){

      // Indicate the end of a mouse action.
      controls.mouse = false;

      // Process event end.
      controls.pointerEnd(event['clientX'], event['clientY']);

    }, {passive: true});

    // On mouse move...
    document.addEventListener('mousemove', function(event){

      // If mouse action is in progress...
      if (controls.mouse) {

        // Process event move.
        controls.pointerMove(event['clientX'], event['clientY']);

      }

    }, {passive: true});

  },

  // Set touch handlers.
  setTouchHandlers: function() {

    // Reference level controls.
    var controls = game.level.controls;

    //On touch start...
    document.body.addEventListener('touchstart', function(event){

      // Prevent scrolling.
      //event.preventDefault();

      var touchCount = event['touches'].length;

      // Loop through touch points.
      for (var index = 0; index < event['touches'].length; index++) {

        var x = event['touches'][index]['clientX'];
        var y = event['touches'][index]['clientY'];

        // Process event start.
        controls.pointerStart(x, y);

      }

    }, {passive: true});

    // If touch end...
    document.body.addEventListener('touchend', function(event){

      // Prevent scrolling.
      //event.preventDefault();

      var touchCount = event['changedTouches'].length;

      // Loop through touch points.
      for (var index = 0; index < touchCount; index++) {

        var x = event['changedTouches'][index]['clientX'];
        var y = event['changedTouches'][index]['clientY'];

        // Process event end.
        controls.pointerEnd(x, y);

      }

    }, {passive: true});

    // If touch move...
    document.body.addEventListener('touchmove', function(event){

      // Prevent scrolling.
      //event.preventDefault();

      // Get touch count.
      var touchCount = event['touches'].length;

      // Loop through touch points.
      for (var index = 0; index < touchCount; index++) {

        var x = event['touches'][index]['clientX'];
        var y = event['touches'][index]['clientY'];

        // Process event move.
        controls.pointerMove(x, y);

      }

    }, {passive: true});

  },

  update: function() {

    // If dpad is not active...
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

  pointerStart: function(x, y) {

    // If dpad is enabled and touch point is inside dpad location...
    if (this.dpadEnabled && (this.dpadLocation == 'left' && x < game.screenWidth / 2 || this.dpadLocation == 'right' && x > game.screenWidth / 2)) {

      // If dpad is already active...
      if (this.dpadActive) {

        // Update action values.
        this.action = true;
        this.actionX = x;
        this.actionY = y;

      } else {

        // Update dpad values.
        this.dpadActive = true;
        this.originX = x;
        this.originY = y;
        this.offsetX = 0;
        this.offsetY = 0;

      }

    } else {

      // Update action values.
      this.action = true;
      this.actionX = x;
      this.actionY = y;

    }

  },

  pointerEnd: function(x, y) {

    // If dpad is enabled and touch point is inside dpad location...
    if (this.dpadEnabled && (this.dpadLocation == 'left' && x < game.screenWidth / 2 || this.dpadLocation == 'right' && x > game.screenWidth / 2)) {

      // Reset dpad values.
      this.dpadActive = false;
      this.originX = 0;
      this.originY = 0;
      this.offsetX = 0;
      this.offsetY = 0;

    } else {

      // Update action values.
      this.action = false;
      this.actionX = 0;
      this.actionY = 0;

    }

  },

  pointerMove: function(x, y) {

    // If dpad is enabled...
    if (this.dpadEnabled) {

      // Get canvas/screen pixel ratio.
      //var screenRatio = game.width / game.screenWidth;

      // Update offset at canvas scale.
      this.offsetX = x - this.originX;
      this.offsetY = y - this.originY;

      // If dpad type is vertical...
      if (this.dpadType == 'vertical') {

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

      }

      // Else, if dpad type is full...
      else if (this.dpadType == 'full') {

        // If either x or y offsets are greater than dpad ignore radius...
        if (
          Math.abs(this.offsetX) > this.dpadIgnoreRadius ||
          Math.abs(this.offsetY) > this.dpadIgnoreRadius
        ) {

          // Get the precise direction.
          var preciseDirection = Math.atan2(this.offsetY, this.offsetX);

          // Convert precise direction into a 45 degree approximation.
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

      // Set direction indicator to span 45 degrees.
      var directionIndicatorWidth = .25 * Math.PI;

      // If dpad type is vertical...
      if (this.dpadType == 'vertical') {

        // Set direction indicator to span 180 degrees.
        directionIndicatorWidth = Math.PI;

      }

      // Reset transformations and styles
      game.resetStage();

      // Get screen to canvas ratio.
      var screenCanvasRatio = game.width / game.screenWidth;

      // Position canvas for controls.
      game.stage.translate(this.originX * screenCanvasRatio, this.originY * screenCanvasRatio);

      // Draw ignore radius.
      game.stage.beginPath();
      game.stage.arc(0, 0, this.dpadIgnoreRadius, 0, 2 * Math.PI);
      game.stage.stroke();
      game.stage.closePath();

      // If direction is not null...
      if (this.direction !== null) {

        // Draw direction indicator.
        game.stage.beginPath();
        game.stage.lineWidth = 8;
        game.stage.arc(0, 0, this.dpadIgnoreRadius + 8, this.direction - directionIndicatorWidth / 2, this.direction + directionIndicatorWidth / 2);
        game.stage.stroke();
        game.stage.closePath();

      }

    }

  },

}
