//use debug to run in debug mode (draw collision rectangles, etc...)
var debug = true;

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

GameController.prototype.update = function(dt) {
	this.levelController.puppy.update(dt);
	this.levelController.checkCollision(dt);
};