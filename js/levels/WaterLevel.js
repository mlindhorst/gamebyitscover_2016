function WaterLevel(puppy, LevelController) {
	var bgTexture = PIXI.Texture.fromImage("resources/Levels/Water/WaterBG_Water.png");
	this.bg = new BackgroundScene(
		bgTexture,
		bgTexture.baseTexture.width,
		bgTexture.baseTexture.height,
		0,
		0,
		0.09,
		0.09
	);
	
	var fgTexture = PIXI.Texture.fromImage("resources/Levels/Water/WaterBG_Foreground.png");
	this.fg = new BackgroundScene(
		fgTexture,
		fgTexture.baseTexture.width,
		fgTexture.baseTexture.height,
		0,
		0,
		0.09,
		0.09
	);
	this.bg.addChild(this.fg);
	
	this.octopi = [];
	
	for(var i = 0; i < 5; i++) {
		this.octopi.push(new OctopusSprite());
	}
	
	this.setupOctopi();
	
	this.puppy = puppy;
	this.puppyStartX = 260;
	this.puppyStartY = 2755;
	
	this.setupPuppy();
	
	var barrel = PIXI.Texture.fromImage("resources/Levels/Water/Barrel.png");
	var bubble_1 = PIXI.Texture.fromImage("resources/Levels/Water/Bubble_01.png");
	var bubble_2 = PIXI.Texture.fromImage("resources/Levels/Water/Bubble_02.png");
	var fish_1 = PIXI.Texture.fromImage("resources/Levels/Water/Fish_01.png");
	var fish_2 = PIXI.Texture.fromImage("resources/Levels/Water/Fish_02.png");
	var fish_3 = PIXI.Texture.fromImage("resources/Levels/Water/Fish_03.png");
	var ooze_1 = PIXI.Texture.fromImage("resources/Levels/Water/Ooze_01.png");
	var ooze_2 = PIXI.Texture.fromImage("resources/Levels/Water/Ooze_02.png");
	var puppyBone = PIXI.Texture.fromImage("resources/Puppy Stuff/Bone.png");
	
	this.environmentCollisionHandler = function(){
		
	};
	
	this.clippableObjects = [
	//type, x, y, width, height, collisionHandler
	new Collidable("leftEdge", 0, 0, 10, 3500, this.environmentCollisionHandler),
	new Collidable("rightEdge", 6450, 100, 10, 3500, this.environmentCollisionHandler),
	new Collidable("finish", 6450, 0, 10, 100, this.environmentCollisionHandler),
	new Collidable("ground", 0, 2940, 6500, 40, this.environmentCollisionHandler),
	new Collidable("shipLeftLowerBorder1", 620, 2500, 445, 145, this.environmentCollisionHandler),
	new Collidable("shipLeftLowerBorder2", 770, 2645, 400, 145, this.environmentCollisionHandler),
	new Collidable("shipLeftLowerBorder3", 890, 2790, 440, 130, this.environmentCollisionHandler),
	new Collidable("shipRightLowerBorder1", 3735, 2500, 1000, 430, this.environmentCollisionHandler),
	new Collidable("shipRightLowerBorder2", 4735, 2500, 425, 240, this.environmentCollisionHandler),
	new Collidable("shipRightLowerBorder3", 4795, 2250, 300, 250, this.environmentCollisionHandler),
	new Collidable("shipRightLowerBorder4", 5090, 2000, 300, 250, this.environmentCollisionHandler),
	new Collidable("shipRightLowerBorder5", 5180, 1890, 250, 100, this.environmentCollisionHandler),
	new Collidable("shipRightLowerBorder6", 5335, 1365, 200, 515, this.environmentCollisionHandler),
	new Collidable("shipLeftUpperBorder1", 335, 1030, 300, 85, this.environmentCollisionHandler),
	new Collidable("shipLeftUpperBorder2", 335, 1115, 160, 890, this.environmentCollisionHandler),
	new Collidable("shipLeftUpperBorder3", 390, 2000, 300, 90, this.environmentCollisionHandler),
	new Collidable("shipUpperBorder1", 330, 600, 5265, 430, this.environmentCollisionHandler),
	new Collidable("shipUpperBorder2", 4075, 115, 1380, 495, this.environmentCollisionHandler),
	new Collidable("shipInnerBlock1", 1810, 1435, 240, 565, this.environmentCollisionHandler),
	new Collidable("shipInnerBlock2", 1835, 2345, 280, 345, this.environmentCollisionHandler),
	new Collidable("shipInnerBlock3", 3765, 1010, 290, 115, this.environmentCollisionHandler),
	new Collidable("shipInnerBlock4", 3835, 1415, 200, 565, this.environmentCollisionHandler),
	new Collidable("shipInnerBlock5", 3775, 2005, 190, 120, this.environmentCollisionHandler),
	new Collidable("firstDeck1", 875, 2500, 780, 10, this.environmentCollisionHandler),
	new Collidable("firstDeck2", 2150, 2500, 1315, 10, this.environmentCollisionHandler),
	new Collidable("secondDeck1", 700, 2000, 795, 10, this.environmentCollisionHandler),
	new Collidable("secondDeck2", 2320, 2000, 2860, 10, this.environmentCollisionHandler),
	new Collidable("thirdDeck1", 550, 1500, 2365, 10, this.environmentCollisionHandler),
	new Collidable("thirdDeck2", 3370, 1500, 1705, 10, this.environmentCollisionHandler),
	new Collidable("wall1", 1950, 1280, 10, 150, this.environmentCollisionHandler),
	new Collidable("wall2", 1950, 2000, 10, 335, this.environmentCollisionHandler),
	new Collidable("end", 6400, 0, 55, 370, function(){LevelController.nextLevelCollisionHandler.apply(LevelController, ["WaterLevel"])})
	];
	
	this.puppyStartX = 52;
	this.puppyStartY = 2800;
		
	this.updateBackgroundAnimations = function() {
		
	};
	
	this.groundCollisionHandler = function(spriteA, spriteB) {
		console.log("Ground Collision");
		spriteA.setY(spriteB.getY() - spriteA.getHeight());
		spriteA.falling = false;
		spriteA.jumping = false;
		spriteA.velY = 0;
	};
	
	this.loadLevel = function() {
		this.bg.addChild(this.fg);
		for(var i = 0; i < this.clippableObjects.length; i++) {
			this.bg.addChild(this.clippableObjects[i].graphics);
		}
	};
}

WaterLevel.prototype.setupOctopi = function() {
	this.octopi[0].setup(1870, 1120);
	this.octopi[1].setup(1920, 2755);
	this.octopi[2].setup(2870, 2175);
	this.octopi[3].setup(3060, 1620);
	this.octopi[4].setup(3845, 2270);
	
	for(var i = 0; i < this.octopi.length; i++){
		this.fg.addChild(this.octopi[i].sprite);
	}
};
	
WaterLevel.prototype.setupPuppy = function() {
	this.puppy.ddx = 0;
	this.puppy.sprite.position.x = this.puppyStartX;
	this.puppy.sprite.position.y = this.puppyStartY;
	this.puppy.setBehavior(PuppySprite.SWIMMING);
	this.fg.addChild(this.puppy.sprite);
};

WaterLevel.prototype.update = function(dt, now) {
	this.puppy.update(dt, now);
	for(var i = 0; i < this.octopi.length; i++){
		this.octopi[i].update(dt, now);
	}
};

WaterLevel.prototype.loadLevel = function() {
	for(var i = 0; i < this.clippableObjects.length; i++) {
		this.bg.addChild(this.clippableObjects[i].graphics);
	}
};

WaterLevel.prototype.clearLevel = function() {
	for(var i = 0; i < this.clippableObjects.length; i++) {
		this.bg.removeChild(this.clippableObjects[i].graphics);
	}
};

WaterLevel.prototype.onRelease = function(containerSprite) {
	//removes the sprite object from the bg
	gameController.levelController.currentLevel.bg.removeChild(containerSprite.sprite);
}

WaterLevel.prototype.updateBackgroundAnimations = function() {	
	this.fanBlades1.rotation += 0.1;
	this.fanBlades2.rotation -= 0.1;
};