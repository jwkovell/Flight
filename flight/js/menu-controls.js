'use strict';

function MenuControls(options = {}) {

  this.action = false;
  this.actionX = 0;
  this.actionY = 0;

  this.keyUp = false;
  this.keyRight = false;
  this.keyDown = false;
  this.keyLeft = false;

}

MenuControls.prototype = {

  // Prepare controls.
  prepare: function() {

    // Set key handlers.
    this.setKeyHandlers();

    // Set mouse handlers.
    this.setMouseHandlers();

    // Set touch handlers.
    this.setTouchHandlers();

  },

  // Set key handlers.
  setKeyHandlers: function() {

    // Reference level controls.
    var controls = game.level.controls;

    // On key press...
    document.addEventListener('keydown', function(event){

      // If key code is 13 (Enter/Return key)...
      if (event.keyCode == 13) {
        controls.action = true;
        controls.actionX = null;
        controls.actionY = null;
      }

      // If key code is 38 (up key)...
      else if (event.keyCode == 38) {
        controls.keyUp = true;
        controls.actionX = null;
        controls.actionY = null;
      }

      // If key code is 39 (right key)...
      else if (event.keyCode == 39) {
        controls.keyRight = true;
        controls.actionX = null;
        controls.actionY = null;
      }

      // If key code is 40 (down key)...
      else if (event.keyCode == 40) {
        controls.keyDown = true;
        controls.actionX = null;
        controls.actionY = null;
      }

      // If key code is 37 (left key)...
      else if (event.keyCode == 37) {
        controls.keyLeft = true;
        controls.actionX = null;
        controls.actionY = null;
      }

    });

    //On key release...
    document.addEventListener('keyup', function(event){

      // If key code is 13 (Enter/Return key)...
      if (event.keyCode == 13) {
        controls.action = false;
        controls.actionX = null;
        controls.actionY = null;
      }

      // If key code is 39 (right key)...
      else if (event.keyCode == 39) {
        controls.keyRight = false;
        controls.actionX = null;
        controls.actionY = null;
      }

      // If key code is 37 (left key)...
      else if (event.keyCode == 37) {
        controls.keyLeft = false;
        controls.actionX = null;
        controls.actionY = null;
      }

      // If key code is 38 (up key)...
      else if (event.keyCode == 38) {
        controls.keyUp = false;
        controls.actionX = null;
        controls.actionY = null;
      }

      // If key code is 40 (down key)...
      else if (event.keyCode == 40) {
        controls.keyDown = false;
        controls.actionX = null;
        controls.actionY = null;
      }

    });

  },

  // Set mouse handlers.
  setMouseHandlers: function() {

    // Reference level controls.
    var controls = game.level.controls;

    // On mouse click release...
    document.addEventListener('mouseup', function(event){

      controls.action = true;
      controls.actionX = event['clientX'];
      controls.actionY = event['clientY'];

    });

  },

  // Set touch handlers.
  setTouchHandlers: function() {

    // Reference level controls.
    var controls = game.level.controls;

    // If touch start...
    document.body.addEventListener('touchstart', function(event){

      // Prevent scrolling.
      event.preventDefault();

      // Loop through touch points.
      for (var index = 0; index < event['touches'].length; index++) {

        controls.action = true;
        controls.actionX = event['touches'][index]['clientX'];
        controls.actionY = event['touches'][index]['clientY'];

      }

    }, {passive: true});

  },

  update: function() {},
  draw: function() {},

}
