function WaterLevel() {
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
	
	var barrel = PIXI.Texture.fromImage("resources/Levels/Water/Barrel.png");
	var bubble_1 = PIXI.Texture.fromImage("resources/Levels/Water/Bubble_01.png");
	var bubble_2 = PIXI.Texture.fromImage("resources/Levels/Water/Bubble_02.png");
	var fish_1 = PIXI.Texture.fromImage("resources/Levels/Water/Fish_01.png");
	var fish_2 = PIXI.Texture.fromImage("resources/Levels/Water/Fish_02.png");
	var fish_3 = PIXI.Texture.fromImage("resources/Levels/Water/Fish_03.png");
	var ooze_1 = PIXI.Texture.fromImage("resources/Levels/Water/Ooze_01.png");
	var ooze_2 = PIXI.Texture.fromImage("resources/Levels/Water/Ooze_02.png");
	var puppyBone = PIXI.Texture.fromImage("resources/Puppy Stuff/Bone.png");
	
	this.clippableObjects = [
	
	//type, x, y, width, height, collisionHandler
	new Collidable("leftEdge", 0, 0, 1, 3500),
	new Collidable("rightEdge", 6450, 100, 1, 3500),
	new Collidable("finish", 6450, 0, 1, 100),
	new Collidable("ground", 0, 2940, 6500, 40),
	new Collidable("shipLeftLowerBorder1", 620, 2500, 445, 145),
	new Collidable("shipLeftLowerBorder2", 770, 2645, 400, 145),
	new Collidable("shipLeftLowerBorder3", 890, 2790, 440, 130),
	new Collidable("shipRightLowerBorder1", 3735, 2500, 1000, 430),
	new Collidable("shipRightLowerBorder2", 4735, 2500, 425, 240),
	new Collidable("shipRightLowerBorder3", 4795, 2250, 300, 250),
	new Collidable("shipRightLowerBorder4", 5090, 2000, 300, 250),
	new Collidable("shipRightLowerBorder5", 5180, 1890, 250, 100),
	new Collidable("shipRightLowerBorder6", 5335, 1365, 200, 515),
	new Collidable("shipLeftUpperBorder1", 335, 1030, 300, 85),
	new Collidable("shipLeftUpperBorder2", 335, 1115, 160, 890),
	new Collidable("shipLeftUpperBorder3", 390, 2000, 300, 90),
	new Collidable("shipUpperBorder1", 330, 600, 5265, 430),
	new Collidable("shipUpperBorder2", 4075, 115, 1380, 495),
	new Collidable("shipInnerBlock1", 1810, 1435, 240, 565),
	new Collidable("shipInnerBlock2", 1835, 2345, 280, 345),
	new Collidable("shipInnerBlock3", 3765, 1010, 290, 115),
	new Collidable("shipInnerBlock4", 3835, 1415, 200, 565),
	new Collidable("shipInnerBlock5", 3775, 2005, 190, 120),
	new Collidable("firstDeck1", 875, 2500, 780, 3),
	new Collidable("firstDeck2", 2150, 2500, 1315, 3),
	new Collidable("secondDeck1", 700, 2000, 795, 3),
	new Collidable("secondDeck2", 2320, 2000, 2860, 3),
	new Collidable("thirdDeck1", 550, 1500, 2365, 3),
	new Collidable("thirdDeck2", 3370, 1500, 1705, 3),
	new Collidable("wall1", 1950, 1280, 3, 150),
	new Collidable("wall2", 1950, 2000, 3, 335)
	
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

