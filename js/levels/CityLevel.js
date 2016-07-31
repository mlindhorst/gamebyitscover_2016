function CityLevel(puppy, LevelController) {
	// Setup background
	this.bgFile = "resources/Levels/City/CityBG_01.png";
	var bgTexture = PIXI.Texture.fromImage(this.bgFile);	
	this.bg = new BackgroundScene(
		bgTexture,
		bgTexture.baseTexture.width,
		bgTexture.baseTexture.height,
		0,
		0
	);
	this.bgFile = "resources/Levels/City/CityBG_02.png";
	var bg2Texture = PIXI.Texture.fromImage(this.bgFile);
	this.bg2 = new BackgroundScene(
		bg2Texture,
		bg2Texture.baseTexture.width,
		bg2Texture.baseTexture.height,
		3008,
		0
	);
	this.bg.addChild(this.bg2);
	// this.bgFile = "resources/Levels/City/CityBG_01.png";
	// var bg3Texture = PIXI.Texture.fromImage(this.bgFile);
	// this.bg3 = new BackgroundScene(
		// bg3Texture,
		// bg3Texture.baseTexture.width,
		// bg3Texture.baseTexture.height,
		// 0,
		// 0
	// );
	// this.bg.addChild(this.bg3);
	// this.bgFile = "resources/Levels/City/CityBG_01.png";
	// var bg4Texture = PIXI.Texture.fromImage(this.bgFile);
	// this.bg4 = new BackgroundScene(
		// bg4Texture,
		// bg4Texture.baseTexture.width,
		// bg4Texture.baseTexture.height,
		// 0,
		// 0
	// );
	// this.bg.addChild(this.bg4);
	
	this.setupFerrisWheel();
	
	// Setup puppy
	this.puppy = puppy;
	this.puppyStartX = 330;
	this.puppyStartY = 3000;
	
	this.setupPuppy();
	
	// Setup collidable terrain
	this.clippableObjects = [
		// // Left
		// new Collidable("edge", -10, 0, 10, 6000, this.planeCollisionHandler),
		// // Right
		// new Collidable("edge", 12000, 0, 10, 6000, this.planeCollisionHandler),
		// // Top
		// new Collidable("edge", 0, -10, 6000, 10, this.planeCollisionHandler),
		// // Bottom
		// new Collidable("edge", 0, 6000, 12000, 10, this.planeCollisionHandler),
		// Ground
		new Collidable("floor", 142, 4000, 6000, 10, this.planeCollisionHandler)
		];
};

CityLevel.constructor = CityLevel;

CityLevel.prototype.setupFerrisWheel = function() {
	
};

CityLevel.prototype.setupPuppy = function() {
	this.puppy.ddx = 0;
	this.puppy.sprite.position.x = this.puppyStartX;
	this.puppy.sprite.position.y = this.puppyStartY;	
	
	this.bg.addChild(this.puppy.sprite);
};

CityLevel.prototype.update = function(dt, now) {
	this.puppy.update(dt, now);
	this.updateBackgroundAnimations();
};

CityLevel.prototype.loadLevel = function() {
	for(var i = 0; i < this.clippableObjects.length; i++) {
		this.bg.addChild(this.clippableObjects[i].graphics);
	}
};

CityLevel.prototype.clearLevel = function() {
	for(var i = 0; i < this.clippableObjects.length; i++) {
		this.bg.removeChild(this.clippableObjects[i].graphics);
	}
};

CityLevel.prototype.updateBackgroundAnimations = function() {	

};

CityLevel.prototype.planeCollisionHandler = function(spriteA, spriteB) {
	// TODO: Get rid of this??
	//console.log("Ground Collision");	
};