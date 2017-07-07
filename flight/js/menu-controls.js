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

      // If key code is 13 (Enter/Return key)...
      if (event.keyCode == 13) {
        self.action = true;
      }

      // If key code is 38 (up key)...
      else if (event.keyCode == 38) {
        self.keyUp = true;
        self.actionX = null;
        self.actionY = null;
      }

      // If key code is 39 (right key)...
      else if (event.keyCode == 39) {
        self.keyRight = true;
        self.actionX = null;
        self.actionY = null;
      }

      // If key code is 40 (down key)...
      else if (event.keyCode == 40) {
        self.keyDown = true;
        self.actionX = null;
        self.actionY = null;
      }

      // If key code is 37 (left key)...
      else if (event.keyCode == 37) {
        self.keyLeft = true;
        self.actionX = null;
        self.actionY = null;
      }

    });

    //On key release...
    document.addEventListener('keyup', function(event){

      var self = game.level.controls;

      // If key code is 13 (Enter/Return key)...
      if (event.keyCode == 13) {
        self.action = false;
      }

      // If key code is 39 (right key)...
      else if (event.keyCode == 39) {
        self.keyRight = false;
        self.actionX = null;
        self.actionY = null;
      }

      // If key code is 37 (left key)...
      else if (event.keyCode == 37) {
        self.keyLeft = false;
        self.actionX = null;
        self.actionY = null;
      }

      // If key code is 38 (up key)...
      else if (event.keyCode == 38) {
        self.keyUp = false;
        self.actionX = null;
        self.actionY = null;
      }

      // If key code is 40 (down key)...
      else if (event.keyCode == 40) {
        self.keyDown = false;
        self.actionX = null;
        self.actionY = null;
      }

    });

  },

  // Set mouse handlers.
  setMouseHandlers: function() {

    var self = game.level.controls;

    // On mouse click release...
    document.addEventListener('mouseup', function(event){

      self.action = true;
      self.actionX = event['clientX'];
      self.actionY = event['clientY'];

    });

  },

  // Set touch handlers.
  setTouchHandlers: function() {

    // If dpad touch end...
    document.body.addEventListener('touchend', function(event){

      event.preventDefault();

      var self = game.level.controls;
      var touchCount = event['changedTouches'].length;

      // Loop through touch points.
      for (var index = 0; index < touchCount; index++) {

        self.action = true;
        self.actionX = event['changedTouches'][index]['clientX'];
        self.actionY = event['changedTouches'][index]['clientY'];

      }

    }, {passive: false});

  },

  update: function() {},
  draw: function() {},

}
