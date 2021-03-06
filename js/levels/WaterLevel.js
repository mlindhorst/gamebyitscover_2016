function WaterLevel(puppy, LevelController) {
	this.LevelController = LevelController;
	var backgroundTexture = PIXI.Texture.fromImage("resources/Levels/Water/WaterBG_Flattened.png");
	this.bg = new BackgroundScene(
		backgroundTexture,
		backgroundTexture.baseTexture.width,
		backgroundTexture.baseTexture.height,
		0,
		0,
		0.09,
		0.09
	);
	
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
	new Collidable("shipUpperBorder2", 4075, 0, 1380, 600, this.environmentCollisionHandler),
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
	new Collidable("end", 6400, 0, 55, 370, function(){
		gameController.levelController.currentLevel.clearLevel();
		LevelController.nextLevelCollisionHandler.apply(LevelController, ["WaterLevel"])})
	];
	
	this.setupBarrels();
	this.setupOctopi();
	this.setupPuppyTreats();
	
	this.puppy = puppy;
	
	this.puppyStartX = 52;
	this.puppyStartY = 2800;
	this.setupPuppy();
	
		
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
		for(var i = 0; i < this.clippableObjects.length; i++) {
			this.bg.addChild(this.clippableObjects[i].graphics);
		}
	};
}

WaterLevel.prototype.setupPuppyTreats = function() {
	this.puppyTreats = [
			new PuppyTreat(680, 1845, this.LevelController),
			new PuppyTreat(2185, 1365, this.LevelController),
			new PuppyTreat(3545, 18305, this.LevelController),
			new PuppyTreat(64310, 2365, this.LevelController)
			];
	for(var i = 0; i < this.puppyTreats.length; i++){
		this.bg.addChild(this.puppyTreats[i].sprite);
	}
};

WaterLevel.prototype.setupBarrels = function() {
	this.barrels = [
		new OozingBarrelSprite(1480, 1380),
		new OozingBarrelSprite(1250, 1875),
		new OozingBarrelSprite(2400, 1895),
		new OozingBarrelSprite(2300, 2820),
		new OozingBarrelSprite(2620, 2820),
		new OozingBarrelSprite(3070, 2820),
		new OozingBarrelSprite(4655, 1364),
		new OozingBarrelSprite(4705, 1885)
		];
	
	for(var i = 0; i < this.barrels.length; i++){
		this.bg.addChild(this.barrels[i].sprite);
		this.bg.addChild(this.barrels[i].oozeSprite.sprite);
		this.clippableObjects.push(this.barrels[i]);
	}
};

WaterLevel.prototype.setupOctopi = function() {
	this.octopi = [];
	for(var i = 0; i < 5; i++) {
		this.octopi.push(new OctopusSprite());
	}
	
	this.octopi[0].setup(1870, 1120);
	this.octopi[1].setup(1920, 2755);
	this.octopi[2].setup(2870, 2175);
	this.octopi[3].setup(3060, 1620);
	this.octopi[4].setup(3845, 2270);
	
	for(var j = 0; j < this.octopi.length; j++){
		this.bg.addChild(this.octopi[j].sprite);
		this.clippableObjects.push(this.octopi[j]);
	}
};
	
WaterLevel.prototype.setupPuppy = function() {
	this.puppy.ddx = 0;
	this.puppy.sprite.position.x = this.puppyStartX;
	this.puppy.sprite.position.y = this.puppyStartY;
	this.puppy.setBehavior(PuppySprite.SWIMMING);
	this.bg.addChild(this.puppy.sprite);
};

WaterLevel.prototype.update = function(dt, now) {
	this.puppy.update(dt, now);
	for(var i = 0; i < this.octopi.length; i++){
		if(this.octopi[i].destroy){
			continue;
		}
		this.octopi[i].update(dt, now);
		doCollisionWithHandler(this.puppy, this.octopi[i], this.octopi[i].collisionHandler);
	}
	for(var j = 0; j < this.barrels.length; j++){
		this.barrels[j].update(dt, now);
		doCollisionWithHandler(this.puppy, this.barrels[j].oozeSprite, this.barrels[j].oozeSprite.handleCollision);
	}
	
	for(var k = 0; k < this.puppyTreats.length; k++) {
		if(doCollisionWithHandler(this.puppy, this.puppyTreats[k], this.puppyTreats[k].collisionHandler)){
			this.bg.removeChild(this.puppyTreats[k].graphics);
			this.bg.removeChild(this.puppyTreats[k].sprite);
			this.puppyTreats.splice(k, 1);
		}
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
	this.bg.removeChild(containerSprite.sprite);
};

WaterLevel.prototype.updateBackgroundAnimations = function() {	
	this.fanBlades1.rotation += 0.1;
	this.fanBlades2.rotation -= 0.1;
};

WaterLevel.prototype.clearLevel = function() {
	for(var i = 0; i < this.clippableObjects.length; i++) {
		this.bg.removeChild(this.clippableObjects[i].graphics);
	}
	
	this.puppy.setBehavior(this.puppy.DEFAULT_BEHAVIOR);
};