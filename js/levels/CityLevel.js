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
		4000,
		0
	);
	this.bg.addChild(this.bg2);
	this.bgFile = "resources/Levels/City/CityBG_03.png";
	var bg3Texture = PIXI.Texture.fromImage(this.bgFile);
	this.bg3 = new BackgroundScene(
		bg3Texture,
		bg3Texture.baseTexture.width,
		bg3Texture.baseTexture.height,
		8000,
		0
	);
	this.bg.addChild(this.bg3);
	
	this.setupFerrisWheel();
	
	// Setup puppy
	this.puppy = puppy;
	this.puppyStartX = 330;
	this.puppyStartY = 3090;
	
	this.setupPuppy();
	
	// Setup collidable terrain
	this.clippableObjects = [
		// Left
		new Collidable("edge", -10, 0, 10, 6000, this.planeCollisionHandler),
		// Right
		new Collidable("edge", 12000, 0, 10, 6000, this.planeCollisionHandler),
		// Top
		new Collidable("edge", 0, -10, 6000, 10, this.planeCollisionHandler),
		// Bottom
		new Collidable("edge", 0, 6000, 12000, 10, this.planeCollisionHandler),
		//Ground
		new Collidable("floor", 142, 4000, 3458, 10, this.planeCollisionHandler),
		new Collidable("floor", 3810, 4000, 6485, 10, this.planeCollisionHandler),
		new Collidable("floor", 10504, 4000, 1000, 225, this.planeCollisionHandler),
		// Sewer Floor & Ledges
		new Collidable("floor", 3806, 4265, 250, 10, this.planeCollisionHandler),
		new Collidable("floor", 3400, 4583, 200, 10, this.planeCollisionHandler),
		new Collidable("floor", 3600, 5500, 6905, 10, this.planeCollisionHandler),
		new Collidable("floor", 10550, 5072, 330, 100, this.planeCollisionHandler),
		new Collidable("floor", 10087, 4796, 220, 10, this.planeCollisionHandler),
		new Collidable("floor", 10502, 4595, 300, 100, this.planeCollisionHandler),
		new Collidable("floor", 10050, 4297, 240, 170, this.planeCollisionHandler),
		// Sewer Ceiling		
		new Collidable("floor", 3806, 4990, 6498, 10, this.planeCollisionHandler),
		// Left Sewer Walls		
		new Collidable("wall", 3400, 4010, 200, 300, this.planeCollisionHandler),
		new Collidable("wall", 3390, 4210, 10, 400, this.planeCollisionHandler),
		new Collidable("wall", 4056, 4010, 10, 265, this.planeCollisionHandler),
		new Collidable("wall", 3806, 4265, 10, 735, this.planeCollisionHandler),
		new Collidable("wall", 3590, 4583, 10, 917, this.planeCollisionHandler),
		// Right Sewer Walls		
		new Collidable("wall", 10505, 5085, 40, 428, this.planeCollisionHandler),
		new Collidable("wall", 10290, 4796, 10, 204, this.planeCollisionHandler),
		new Collidable("wall", 10722, 4225, 10, 400, this.planeCollisionHandler),
		new Collidable("wall", 10100, 4010, 10, 300, this.planeCollisionHandler),
		new Collidable("wall", 10802, 4695, 10, 370, this.planeCollisionHandler),
		new Collidable("wall", 10067, 4477, 10, 315, this.planeCollisionHandler),
		// End Level
		new Collidable("end", 11270, 3500, 10, 500, function() {LevelController.nextLevelCollisionHandler.apply(LevelController, ["CityLevel"])})
	];
};

CityLevel.constructor = CityLevel;

CityLevel.prototype.setupFerrisWheel = function() {
	var ferrisWheelTexture = "resources/Levels/City/FerrisWheel.png";
	this.ferrisWheel = PIXI.Sprite.fromFrame(ferrisWheelTexture);	
	this.ferrisWheel.anchor.x = 0.5;
	this.ferrisWheel.anchor.y = 0.5;
	this.ferrisWheel.position.x = 2050;
	this.ferrisWheel.position.y = 3000;
	this.bg.addChild(this.ferrisWheel);
};

CityLevel.prototype.setupPuppy = function() {
	this.puppy.ddx = 0;
	this.puppy.sprite.position.x = this.puppyStartX;
	this.puppy.sprite.position.y = this.puppyStartY;	
	this.puppy.setBehavior(this.puppy.DEFAULT_BEHAVIOR);
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
	this.bg.removeChild(this.ferrisWheel);
};

CityLevel.prototype.updateBackgroundAnimations = function() {	
	this.ferrisWheel.rotation += 0.785;
};

CityLevel.prototype.planeCollisionHandler = function(spriteA, spriteB) {
	// TODO: Get rid of this??
	//console.log("Ground Collision");	
};