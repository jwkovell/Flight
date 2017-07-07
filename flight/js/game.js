'use strict';

function Game() {

  this.canvas = document.getElementById('canvas');
  this.stage = this.canvas.getContext('2d');

  this.width = 1000;
  this.height = 500;

  this.screenWidth = window.innerWidth;
  this.screenHeight = window.innerHeight;

  this.offsetX = 0;
  this.offsetY = 0;

  this.offsetSpeedX = 4;
  this.offsetSpeedY = 0;

  this.parallaxRate = 1.1;

  this.levelIndex = 0;
  this.level = {};

  this.loop = {};

}

Game.prototype = {

  // Reset stage defaults.
  resetStage: function() {

    this.stage.setTransform(1, 0, 0, 1, 0, 0);
    this.stage.globalAlpha = 1;
    this.stage.lineWidth = 1;
    this.stage.strokeStyle = "#000000";
    this.stage.fillStyle = "#000000";

  },

  // Prepare game.
  prepare: function() {

    // Instantiate menu.
    this.level = new Menu();

    // Prepare level.
    this.level.prepare();

    // Instantiate Loop.
    this.loop = new Loop();

    // Start loop.
    requestAnimationFrame(this.loop.mainLoop);

  },

  // Update game.
  update: function() {

    // Update level.
    this.level.update();

  },

  // Load level.
  loadLevel: function(level) {

    // Instantiate level.
    this.level = new window['Level_' + level]();

    // Prepare level.
    this.level.prepare();

  },

  draw: function() {

    // Reset transformations and styles
    this.resetStage();

    // Clear canvas.
    this.stage.clearRect(0, 0, this.canvas.width, this.height);

    // Draw level.
    this.level.draw();

  }

};
