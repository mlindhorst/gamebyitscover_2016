function GameController(stage) {	
	this.stage = stage;	
	this.viewportX = 0;
	this.viewportY = 0;
	
	// TODO: Move these methods to LevelController.
	this.setupBG();
	this.setupPuppy();
}

GameController.prototype.setupBG = function() {
	var bgTexture = PIXI.Texture.fromImage("resources/Levels/Facility/FacilityBG.png");
	this.bg = new BackgroundScene(
		bgTexture,
		bgTexture.baseTexture.width,
		bgTexture.baseTexture.height,
		0,
		0,
		0.09,
		0.09
	);
	
	this.stage.addChild(this.bg);
};

GameController.prototype.setupPuppy = function() {
	var texture = PIXI.Sprite.fromFrame("resources/Puppy Stuff/Dogsmall.png");
	this.puppy = new PuppySprite(texture);
	
	this.puppy.sprite.position.x = 10;
	this.puppy.sprite.position.y = 400;

	this.stage.addChild(this.puppy.sprite);
};

// TODO: Consolidate these methods for both x and y?
GameController.prototype.setViewportX = function(viewportX) {
	this.viewportX = viewportX;
	this.bg.setViewportX(viewportX);
};

GameController.prototype.getViewportX = function() {
	return this.viewportX;
};

GameController.prototype.moveViewportXBy = function(currTime, units) {	
	var newViewportX = this.viewportX + units;	
	this.puppy.update(vx, vy);
	this.setViewportX(newViewportX);
};

GameController.prototype.setViewportY = function(viewportY) {
	this.viewportY = viewportY;
	this.bg.setViewportY(viewportY);
};

GameController.prototype.getViewportY = function() {
	return this.viewportY;
};

GameController.prototype.moveViewportYBy = function(currTime, units) {	
	var newViewportY = this.viewportY + units;
	this.setViewportY(newViewportY);
};