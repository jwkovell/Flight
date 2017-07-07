'use strict';

function Level_0(options = {}) {

  // Level_0 is a type of Level.
  Level.call(this, options);

  this.frame = 0;
  this.frameDelay = 5;
  this.lock = false;
  
  this.levels = [
    {
      id: 1,
      name: 'Green'
    },{
      id: 2,
      name: 'Blue'
    },{
      id: 3,
      name: 'Red'
    },{
      id: 4,
      name: 'Yellow'
    },{
      id: 5,
      name: 'Orange'
    },{
      id: 6,
      name: 'Purple'
    },{
      id: 7,
      name: 'Lime'
    },{
      id: 8,
      name: 'Teal'
    },{
      id: 9,
      name: 'Slate'
    },{
      id: 10,
      name: 'Sky'
    },{
      id: 11,
      name: 'Wheat'
    },{
      id: 12,
      name: 'Black'
    },{
      id: 13,
      name: 'White'
    },{
      id: 14,
      name: 'Tan'
    },{
      id: 15,
      name: 'Gray'
    },{
      id: 16,
      name: 'Peach'
    },
  ]

  this.selectedLevel = 1;

  this.columns = 4;

}

Level_0.prototype = Object.create(Level.prototype);
Level_0.prototype.constructor = Level_0;

// Overwrite prepare method.
Level_0.prototype.prepare = function(){

  // Instantiate controls.
  this.controls = new MenuControls();

  // Prepare controls.
  this.controls.prepare();

}

// Overwrite update method.
Level_0.prototype.update = function(){

  var self = this;

  // Update controls.
  self.controls.update();

  if (self.controls.keyUp) {
    self.controls.keyUp = false;
    self.selectedLevel = self.selectedLevel - self.columns;
  }

  else if (self.controls.keyDown) {
    self.controls.keyDown = false;
    self.selectedLevel = self.selectedLevel + self.columns;
  }

  else if (self.controls.keyLeft) {
    self.controls.keyLeft = false;
    self.selectedLevel--;
  }

  else if (self.controls.keyRight) {
    self.controls.keyRight = false;
    self.selectedLevel++;
  }

  if (self.selectedLevel > self.levels.length) {
    self.selectedLevel = self.selectedLevel - self.levels.length;
  }

  else if (self.selectedLevel < 0) {
    self.selectedLevel = self.selectedLevel + self.levels.length;
  }

  // define canvas/screen pixel ratio.
  var screenRatio = game.width / game.screenWidth

  var actionX = self.controls.actionX * screenRatio;
  var actionY = self.controls.actionY * screenRatio;

  if (actionX && actionY) {

    var row = 1;
    var column = 1;
    var thumbnailWidth = game.width / self.columns;
    var thumbnailHeight = thumbnailWidth / 2;

    // Loop through levels.
    this.levels.forEach(function(level){

      if (
        actionY >= thumbnailHeight * row - thumbnailHeight &&
        actionY <= thumbnailHeight * row
      ) {

        if (
          actionX >= thumbnailWidth * column - thumbnailWidth &&
          actionX <= thumbnailWidth * column
        ) {

          self.selectedLevel = level.id;

        }

      }

      // Increment column and row counts.
      if (column < self.columns) {
        column++;
      } else {
        column = 1;
        row++;
      }
      
    });

  }

  if (self.controls.action) {

self.controls.action = false;
console.log('selected level ' + self.selectedLevel);

  }

}

// Overwrite draw method.
Level_0.prototype.draw = function(){

  // Reset transformations and styles
  game.resetStage();

  var thumbnailWidth = game.width / this.columns;
  var thumbnailHeight = thumbnailWidth / 2;
  var thumbnailColumn = 0;
  var thumbnailRow = 0;
  var columnIndex = 1;
  var self = this;

  // Loop through levels.
  this.levels.forEach(function(level){

    game.stage.strokeStyle="#cccccc";

    if (level.id == self.selectedLevel) {
      game.stage.strokeStyle="#000000";
    }

    game.stage.beginPath();
    game.stage.rect(thumbnailHeight * .1, thumbnailHeight * .1, thumbnailWidth - thumbnailHeight * .2, thumbnailHeight * .8);
    game.stage.lineWidth = 4;
    game.stage.stroke();
    game.stage.closePath();

    if (columnIndex < self.columns) {
      game.stage.translate(thumbnailWidth, 0);
      columnIndex++;
    }
    else {
      game.stage.translate(-game.width + thumbnailWidth, thumbnailHeight);
      columnIndex = 1;
    }

  });

  // Draw controls.
  this.controls.draw();

}