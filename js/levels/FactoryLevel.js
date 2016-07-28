function FactoryLevel(puppy) {
	sWidth = 7210;
	sHeight = 1500;
	
	this.bgFile = "resources/Levels/Facility/FacilityBG.png";
	var bgTexture = PIXI.Texture.fromImage(this.bgFile);	
	this.bg = new BackgroundScene(
		bgTexture,
		bgTexture.baseTexture.width,
		bgTexture.baseTexture.height,
		0,
		0
	);
	
	this.setupFans();
		
	this.puppyStartX = 410;
	this.puppyStartY = 10;
	
	this.setupPuppy = function() {

		this.puppy = puppy;
		this.puppy.ddx = 0;
		this.puppy.sprite.position.x = this.puppyStartX;
		this.puppy.sprite.position.y = this.puppyStartY;	
		
		this.bg.addChild(this.puppy.sprite);		

	};
	
	this.setupPuppy();
	
	this.planeCollisionHandler = function(spriteA, spriteB) {
		console.log("Ground Collision");
		spriteA.setY(spriteB.getY() - spriteA.getHeight());
		spriteA.falling = false;
		spriteA.jumping = false;
		spriteA.velY = 0;
	}
	
	
	this.clippableObjects = [
		// Left
		new Collidable("edge", -10, 0, 10, 1500, this.planeCollisionHandler),
		// Right
		new Collidable("edge", 7210, 0, 10, 1500, this.planeCollisionHandler),
		// Top
		new Collidable("edge", 0, -40, 7210, 10, this.planeCollisionHandler),
		// Bottom
		new Collidable("edge", 0, 1495, 7210, 10, this.planeCollisionHandler),
		// Vent Floors
		new Collidable("floor", 793, 100, 607, 10, this.planeCollisionHandler),
		new Collidable("floor", 1600, 100, 2900, 10, this.planeCollisionHandler),
		new Collidable("floor", 4700, 100, 335, 10, this.planeCollisionHandler),
		// Vent Wall
		new Collidable("wall", 5035, -40, 10, 140, this.planeCollisionHandler),
		// First Floors
		new Collidable("floor", 0, 495, 1505, 10, this.planeCollisionHandler),
		new Collidable("floor", 1718, 495, 200, 505, this.planeCollisionHandler),
		new Collidable("floor", 4130, 495, 2200, 10, this.planeCollisionHandler),
		new Collidable("floor", 6545, 495, 665, 100, this.planeCollisionHandler),
		// First Floor Walls		
		new Collidable("wall", 782, 100, 30, 400, this.planeCollisionHandler),
		new Collidable("wall", 1820, 100, 2315, 900, this.planeCollisionHandler),
		// First Stairs
		new Collidable("floor", 1648, 565, 100, 435, this.planeCollisionHandler),
		new Collidable("floor", 1577, 638, 100, 365, this.planeCollisionHandler),		
		new Collidable("floor", 1508, 710, 100, 295, this.planeCollisionHandler),
		new Collidable("floor", 1435, 780, 100, 225, this.planeCollisionHandler),
		new Collidable("floor", 1365, 850, 100, 155, this.planeCollisionHandler),		
		new Collidable("floor", 1295, 925, 100, 80, this.planeCollisionHandler),
		// Second Floors
		new Collidable("floor", 313, 995, 979, 10, this.planeCollisionHandler),
		new Collidable("floor", 4348, 995, 552, 10, this.planeCollisionHandler),
		new Collidable("floor", 5100, 995, 2110, 10, this.planeCollisionHandler),
		// Second Stairs
		new Collidable("floor", 0, 995, 70, 435, this.planeCollisionHandler),
		new Collidable("floor", 100, 1064, 70, 365, this.planeCollisionHandler),		
		new Collidable("floor", 172, 1135, 70, 295, this.planeCollisionHandler),
		new Collidable("floor", 243, 1208, 70, 225, this.planeCollisionHandler),
		new Collidable("floor", 313, 1280, 70, 155, this.planeCollisionHandler),		
		new Collidable("floor", 384, 1352, 70, 80, this.planeCollisionHandler),
		new Collidable("floor", 456, 1423, 70, 80, this.planeCollisionHandler),
		// Third Floor Walls		
		new Collidable("wall", 1807, 1125, 30, 375, this.planeCollisionHandler),
		new Collidable("wall", 4347, 995, 110, 505, this.planeCollisionHandler),
		// Third Stairs
		new Collidable("floor", 4277, 1064, 70, 435, this.planeCollisionHandler),		
		new Collidable("floor", 4205, 1135, 70, 295, this.planeCollisionHandler),
		new Collidable("floor", 4134, 1208, 70, 225, this.planeCollisionHandler),
		new Collidable("floor", 4063, 1280, 70, 155, this.planeCollisionHandler),		
		new Collidable("floor", 3992, 1352, 70, 80, this.planeCollisionHandler),
		new Collidable("floor", 3922, 1423, 70, 80, this.planeCollisionHandler),
		// Fourth Stairs
		new Collidable("floor", 6475, 565, 100, 435, this.planeCollisionHandler),
		new Collidable("floor", 6403, 638, 100, 365, this.planeCollisionHandler),		
		new Collidable("floor", 6332, 710, 100, 295, this.planeCollisionHandler),
		new Collidable("floor", 6262, 780, 100, 225, this.planeCollisionHandler),
		new Collidable("floor", 6190, 850, 100, 155, this.planeCollisionHandler),		
		new Collidable("floor", 6120, 925, 100, 80, this.planeCollisionHandler),
		
	];
	
	this.loadLevel = function() {
		for(var i = 0; i < this.clippableObjects.length; i++) {
			this.bg.addChild(this.clippableObjects[i].graphics);
		}
	}
	
	this.update = function(dt, now) {
		this.puppy.update(dt, now);
	}

	this.clearLevel = function() {
		this.bg.removeChild(this.fg);
		for(var i = 0; i < this.clippableObjects.length; i++) {
			this.bg.removeChild(this.clippableObjects[i].graphics);
		}
	}
}

FactoryLevel.constructor = FactoryLevel;

FactoryLevel.prototype.setupFans = function() {	
	var fanBladesFile = "resources/Levels/Facility/Fan_Blades.png";
	this.fanBlades1 = PIXI.Sprite.fromFrame(fanBladesFile);	
	this.fanBlades1.anchor.x = 0.49;
	this.fanBlades1.anchor.y = 0.5;
	this.fanBlades1.position.x = 2400;
	this.fanBlades1.position.y = 500;
	
	this.fanBlades2 = PIXI.Sprite.fromFrame(fanBladesFile);	
	this.fanBlades2.anchor.x = 0.49;
	this.fanBlades2.anchor.y = 0.5;
	this.fanBlades2.position.x = 3500;
	this.fanBlades2.position.y = 500;
	
	var fanCoverFile = "resources/Levels/Facility/Fan_Cover.png";
	var fanCover1 = PIXI.Sprite.fromFrame(fanCoverFile);	
	fanCover1.anchor.x = 0.49;
	fanCover1.anchor.y = 0.5;	
	fanCover1.position.x = 2400;
	fanCover1.position.y = 500;
	
	var fanCover2 = PIXI.Sprite.fromFrame(fanCoverFile);	
	fanCover2.anchor.x = 0.49;
	fanCover2.anchor.y = 0.5;	
	fanCover2.position.x = 3500;
	fanCover2.position.y = 500;
	
	this.bg.addChild(this.fanBlades1);
	this.bg.addChild(fanCover1);
	this.bg.addChild(this.fanBlades2);
	this.bg.addChild(fanCover2);
};

FactoryLevel.prototype.updateBackgroundAnimations = function() {	
	this.fanBlades1.rotation += 0.1;
	this.fanBlades2.rotation -= 0.1;
};