function GameController(stage) {	
	this.stage = stage;	
	this.viewportX = 0;
	
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
		0.09
	);
	
	this.stage.addChild(this.bg);
};

GameController.prototype.setupPuppy = function() {
	var texture = PIXI.Texture.fromImage("resources/Puppy Stuff/Dogsmall.png");
	var puppy = new PIXI.Sprite(texture);
	
	// This puts the anchor at the bottom left-hand corner of the PNG.
	puppy.anchor.x = 0.0;
	puppy.anchor.y = 1.0;

	puppy.position.x = 10;
	puppy.position.y = 495;

	this.stage.addChild(puppy);
};

GameController.prototype.setViewportX = function(viewportX) {
	this.viewportX = viewportX;
	this.bg.setViewportX(viewportX);
};

GameController.prototype.getViewportX = function() {
	return this.viewportX;
};

GameController.prototype.moveViewportXBy = function(currTime, units) {	
	var newViewportX = this.viewportX + units;
	this.setViewportX(newViewportX);
};