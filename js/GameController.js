//use debug to run in debug mode (draw collision rectangles, etc...)
var debug = true;

var YAXISADJUST = 250;

function GameController(stage) {	
	this.stage = stage;	
	this.viewportX = 0;
	this.viewportY = 0;
	
	this.levelController = new LevelController(stage);
	this.keyEventListener = new KeyEventListener(this.levelController.puppy);
}

// TODO: Consolidate these methods for both x and y?
GameController.prototype.setViewportX = function(viewportX) {
	this.viewportX = viewportX;
	this.levelController.bg.setViewportX(viewportX);
};

GameController.prototype.getViewportX = function() {
	return this.viewportX;
};

GameController.prototype.moveViewportXBy = function(currTime, units) {	
	var newViewportX = this.viewportX + units;	
	this.setViewportX(newViewportX);
};

GameController.prototype.setViewportY = function(viewportY) {
	this.viewportY = viewportY;
	this.levelController.bg.setViewportY(viewportY);
};

GameController.prototype.getViewportY = function() {
	return this.viewportY;
};

GameController.prototype.moveViewportYBy = function(currTime, units) {	
	var newViewportY = this.viewportY + units;
	this.setViewportY(newViewportY);
};


GameController.prototype.update = function(dt, now) {
	this.levelController.updateLevel();
	this.levelController.puppy.update(dt, now);
	this.levelController.checkCollision(dt);
	var moveByX = this.levelController.puppy.getX() - this.viewportX;
	var moveByY = this.levelController.puppy.getY() - this.viewportY - YAXISADJUST;

	console.log("moving x by " + moveByX);
	console.log("moving y by " + moveByY);
	this.moveViewportXBy(dt, moveByX);
	this.moveViewportYBy(dt, moveByY);
};

GameController.prototype.getClippableObjects = function() {
	return this.levelController.currentLevel.clippableObjects;
};