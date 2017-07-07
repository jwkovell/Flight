'use strict';

function Menu(options = {}) {

  this.selectedLevel = 0;
  this.labelX = 20;
  this.labelY = 480;
  
  this.levels = [
    {
      id: '1_1',
      x: 50,
      y: 150,
      radius: 10,
      name: 'Green'
    },{
      id: '1_2',
      x: 100,
      y: 50,
      radius: 10,
      name: 'Blue'
    },{
      id: '1_3',
      x: 150,
      y: 100,
      radius: 10,
      name: 'Red'
    },{
      id: '2_1',
      x: 800,
      y: 50,
      radius: 10,
      name: 'Yellow'
    },{
      id: '2_2',
      x: 850,
      y: 75,
      radius: 10,
      name: 'Orange'
    },{
      id: '2_3',
      x: 875,
      y: 150,
      radius: 10,
      name: 'Purple'
    },{
      id: '3_1',
      x: 425,
      y: 275,
      radius: 10,
      name: 'Lime'
    },{
      id: '3_2',
      x: 450,
      y: 225,
      radius: 10,
      name: 'Teal'
    },{
      id: '3_3',
      x: 500,
      y: 250,
      radius: 10,
      name: 'Slate'
    },{
      id: '4_1',
      x: 50,
      y: 375,
      radius: 10,
      name: 'Wheat'
    },{
      id: '4_2',
      x: 125,
      y: 325,
      radius: 10,
      name: 'Black'
    },{
      id: '4_3',
      x: 150,
      y: 400,
      radius: 10,
      name: 'White'
    },{
      id: '5_1',
      x: 700,
      y: 375,
      radius: 10,
      name: 'Tan'
    },{
      id: '5_2',
      x: 750,
      y: 350,
      radius: 10,
      name: 'Gray'
    },{
      id: '5_3',
      x: 800,
      y: 400,
      radius: 10,
      name: 'Peach'
    },
  ]

}

// Overwrite prepare method.
Menu.prototype.prepare = function(){

  // Instantiate controls.
  this.controls = new MenuControls();

  // Prepare controls.
  this.controls.prepare();

}

// Overwrite update method.
Menu.prototype.update = function(){

  // Update controls.
  this.controls.update();

  // If up or right keys are active...
  if (this.controls.keyUp || this.controls.keyLeft) {

    // Deactivate keys.
    this.controls.keyUp = false;
    this.controls.keyLeft = false;

    // Decrement selected level.
    this.selectedLevel--;
  }

  // If down or left keys are active...
  else if (this.controls.keyDown || this.controls.keyRight) {

    // Deactivate keys.
    this.controls.keyDown = false;
    this.controls.keyRight = false;

    // Increment selected level.
    this.selectedLevel++;

  }

  // If selected level is less than 0...
  if (this.selectedLevel < 0) {

    // Select last level.
    this.selectedLevel = this.levels.length - 1;

  }
  
  // Else, if selected level is more than level count...
  else if (this.selectedLevel > this.levels.length - 1) {

    // Select first level.
    this.selectedLevel = 0;

  }

  // Get canvas/screen pixel ratio.
  var screenRatio = game.width / game.screenWidth;

  // Define action coordinates at canvas scale.
  var actionX = this.controls.actionX * screenRatio;
  var actionY = this.controls.actionY * screenRatio;

  // If action coordinates were provided...
  if (actionX && actionY) {

    // Reset action.
    this.controls.action = false;
    this.controls.actionX = null;
    this.controls.actionY = null;

    // Loop through levels.
    for (var levelIndex = 0; levelIndex < this.levels.length; levelIndex++) {

      var level = this.levels[levelIndex];

      // If action coordinates fall within the level area...
      if (
        actionX > level.x - level.radius && 
        actionX < level.x + level.radius && 
        actionY > level.y - level.radius && 
        actionY < level.y + level.radius
      ) {

        // If this level is already selected...
        if (levelIndex == this.selectedLevel) {

          // Get level ID
          var selectedLevelID = this.levels[this.selectedLevel].id;

          // Load level.
          game.loadLevel(selectedLevelID);

        } else {

          // Select level.
          this.selectedLevel = levelIndex;

        }

      }

    }

  }

  if (this.controls.action) {

    // Reset action.
    this.controls.action = false;

    // Get level ID
    var selectedLevelID = this.levels[this.selectedLevel].id;

    // Load level.
    game.loadLevel(selectedLevelID);

  }

}

// Overwrite draw method.
Menu.prototype.draw = function(){

  // Reset transformations and styles
  game.resetStage();

  // Loop through levels.
  for (var levelIndex = 0; levelIndex < this.levels.length; levelIndex++) {

    var level = this.levels[levelIndex];

    if (levelIndex == this.selectedLevel) {
      game.stage.strokeStyle="rgba(0, 0, 0, .2)";
      level.radius = 15;
    } else {
      game.stage.strokeStyle="rgba(0, 0, 0, .1)";
      level.radius = 10;
    }

    // Position stage.
    game.stage.translate(level.x, level.y);

    // Draw stage.
    game.stage.beginPath();
    game.stage.arc(0, 0, level.radius, 0, 2 * Math.PI);
    game.stage.lineWidth = 4;
    game.stage.stroke();
    game.stage.closePath();

    // Reset transformations and styles
    game.resetStage();

  }

  // Draw stage label.
  game.stage.font = '30px Arial';
  game.stage.fillText(this.levels[this.selectedLevel].name, this.labelX, this.labelY);

  // Draw controls.
  this.controls.draw();

}