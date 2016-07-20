function LevelController(stage) {	
	this.stage = stage;
	this.levels = [new FactoryLevel()];
	
	this.setupBG(0);
	this.setupPuppy();	
}

LevelController.prototype.setupBG = function(levelNumber) {
	this.currentLevel = this.levels[levelNumber]
	this.bg = this.currentLevel.bg;
	this.stage.addChild(this.bg);	
};

LevelController.prototype.setupPuppy = function() {
	var texture = PIXI.Sprite.fromFrame("resources/Puppy Stuff/Dogsmall.png");
	this.puppy = new PuppySprite(texture);
	
	this.puppy.sprite.position.x = 10;
	this.puppy.sprite.position.y = 400;	
	
	this.bg.addChild(this.puppy.sprite);	
	
	// this.graphics = new PIXI.Graphics();
	// this.graphics.lineStyle(1, 0xFF0000);	
	// this.graphics.drawRect(0, 0, this.puppy.sprite.width, this.puppy.sprite.height);
	// this.graphics.position.x = this.puppy.sprite.position.x;
	// this.graphics.position.y = this.puppy.sprite.position.y;
	// this.stage.addChild(this.graphics);
};

LevelController.prototype.checkCollision = function() {
	var ydist = this.puppy.sprite.position.y - this.levels[0].startFloorPiece.position.y;
	console.log("puppyYPosition: " + this.puppy.sprite.position.y)
	console.log("floorYPosition: " + this.currentLevel.startFloorPiece.position.y)
	console.log("ydist: " + ydist);
	if(ydist > -this.currentLevel.startFloorPiece.height/2 && ydist > this.currentLevel.startFloorPiece/2)
		console.log("Collide!");
};