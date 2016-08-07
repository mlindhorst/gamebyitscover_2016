//use debug to run in debug mode (draw collision rectangles, etc...)
var debug = false;
var moveViewPort = true;

var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 500;
var YAXISADJUST = 250;
var XAXISADJUST = -350;

function GameController(stage) {	
	this.stage = stage;	
	this.viewportX = 0;
	this.viewportY = 0;
	
	this.levelController = new LevelController(stage);
	this.keyEventListener = new KeyEventListener(this.levelController);
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
	this.levelController.updateLevel(dt, now);
	this.levelController.checkCollision(dt);
	
	if(moveViewPort) {
		var moveByX = this.levelController.currentLevel.puppy.getX() - this.viewportX + XAXISADJUST;
		var moveByY = this.levelController.currentLevel.puppy.getY() - this.viewportY - YAXISADJUST;

		this.moveViewportXBy(dt, moveByX);
		this.moveViewportYBy(dt, moveByY);
	}
};

GameController.prototype.getClippableObjects = function() {
	return this.levelController.currentLevel.clippableObjects;
};