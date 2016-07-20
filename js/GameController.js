function GameController(stage) {	
	this.stage = stage;	
	this.viewportX = 0;
	this.viewportY = 0;
	
	this.levelController = new LevelController(stage);
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
	this.levelController.puppy.update(vx, vy);
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

GameController.prototype.checkCollisions = function() {
	this.levelController.checkCollision();
};