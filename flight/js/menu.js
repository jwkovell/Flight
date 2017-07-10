'use strict';

function Menu(options = {}) {

  this.selectedLevel = 0;
  this.labelX = 20;
  this.labelY = 50;
  
  this.levels = [
    {
      id: '1_1',
      x: 705,
      y: 45,
      radius: 10,
      color: '#e0c271',
      realm: 'Dragonhome',
      name: 'The Pillar of the World'
    },{
      id: '2_1',
      x: 865,
      y: 50,
      radius: 10,
      color: '#71cf29',
      realm: 'The Viridian Labyrinth',
      name: 'The Behemoth'
    },{
      id: '3_1',
      x: 555,
      y: 105,
      radius: 10,
      color: '#993292',
      realm: 'Starfall Isles',
      name: 'The Observatory'
    },{
      id: '4_1',
      x: 650,
      y: 135,
      radius: 10,
      color: '#d02700',
      realm: 'The Scarred Wasteland',
      name: 'The Wyrmwound'
    },{
      id: '5_1',
      x: 745,
      y: 140,
      radius: 10,
      color: '#29165f',
      realm: 'The Tangled Wood',
      name: 'Forum of the Obscured Crescent'
    },{
      id: '6_1',
      x: 900,
      y: 175,
      radius: 10,
      color: '#e7ff3b',
      realm: 'Sunbeam Ruins',
      name: 'Sundial Terrace'
    },{
      id: '7_1',
      x: 730,
      y: 220,
      radius: 10,
      color: '#e5e8db',
      realm: 'The Sea of a Thousand Currents',
      name: 'Fishspine Reef'
    },{
      id: '8_1',
      x: 615,
      y: 305,
      radius: 10,
      color: '#dfe2d4',
      realm: 'The Windswept Plateau',
      name: 'The Twisting Crescendo'
    },{
      id: '9_1',
      x: 715,
      y: 300,
      radius: 10,
      color: '#ff9600',
      realm: 'The Ashfall Waste',
      name: 'The Great Furnace'
    },{
      id: '10_1',
      x: 865,
      y: 330,
      radius: 10,
      color: '#42e7bd',
      realm: 'The Shifting Expanse',
      name: 'Tempest Spire'
    },{
      id: '11_1',
      x: 650,
      y: 415,
      radius: 10,
      color: '#73baec',
      realm: 'The Southern Icefield',
      name: 'The Fortress of Ends'
    }
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

  // Load images.
  /*
  var image = document.getElementById('map');
  game.stage.drawImage(image, 0, 0, game.width, game.height);
  */

  // Loop through levels.
  for (var levelIndex = 0; levelIndex < this.levels.length; levelIndex++) {

    var level = this.levels[levelIndex];

    if (levelIndex == this.selectedLevel) {
      level.radius = 15;
    } else {
      level.radius = 10;
    }

    // Position stage.
    game.stage.translate(level.x, level.y);

    // Draw stage.
    game.stage.beginPath();
    game.stage.arc(0, 0, level.radius, 0, 2 * Math.PI);
    game.stage.lineWidth = 8;
    game.stage.strokeStyle = "rgba(255, 255, 255, 1)";
    game.stage.fillStyle = level.color;
    game.stage.shadowBlur = 5;
    game.stage.shadowColor = "black";
    game.stage.stroke();
    game.stage.shadowBlur = 0;
    game.stage.fill();
    game.stage.closePath();

    // Reset transformations and styles
    game.resetStage();

  }

  // Draw stage label.
  game.stage.fillStyle="rgba(255, 255, 255, 1)";
  game.stage.font = '28px Arial';
  game.stage.fillText(this.levels[this.selectedLevel].realm, this.labelX, this.labelY);
  game.stage.font = '20px Arial';
  game.stage.fillText(this.levels[this.selectedLevel].name, this.labelX, this.labelY + 30);

  // Draw controls.
  this.controls.draw();

}