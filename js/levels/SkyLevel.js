var SHIP1_SECTION_COUNT = 10;
var MAX_CANNON_BALLS = 10;
var MAX_BIRDS = 10;
var BIRD_SPEED = 1000;

function SkyLevel(puppy, LevelController) {
	
	this.clippableObjects = [];
	
	//setup cannonBalls
	var cannonBalls = [];
	for(var i = 0; i < MAX_CANNON_BALLS; i++) {
		cannonBalls.push(new CannonBallSprite(0, 0, 0, 0));
	}
	this.cannonBallPool = new SpritePool(cannonBalls, this.onRelease);

	var birds = [];
	for(var i = 0; i < MAX_BIRDS; i++) {
		birds.push(new BirdSprite());
	}
	this.birdPool = new SpritePool(birds, this.onRelease);
	this.lastBird = new Date().getTime();
	
	var bgTexture = PIXI.Texture.fromImage("resources/Levels/Sky/AirBG_Sky.png");
	this.bg = new BackgroundScene(
		bgTexture,
		CANVAS_WIDTH,
		CANVAS_HEIGHT,
		0,
		0
	);
	
	this.puppyStartX = 10;
	this.puppyStartY = 200;
	this.puppy = puppy
	this.setupPuppy();
	
	this.cloudSprites = [
		new CloudSprite(PIXI.Sprite.fromFrame("resources/Levels/Mountains/Cloud_01.png"), -200, 1),
		new CloudSprite(PIXI.Sprite.fromFrame("resources/Levels/Mountains/Cloud_02.png"), 400, 1),
		new CloudSprite(PIXI.Sprite.fromFrame("resources/Levels/Mountains/Cloud_03.png"), 200, 1)
	];
		
	var midSections = [];
	for(var i = 0; i < SHIP1_SECTION_COUNT; i++) {
		var section = new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), i % 3 + 1);
		midSections.push(section);
		this.clippableObjects.push(section);
	}
	
	this.shipSprites = [
		new ShipSprite(
			PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Front.png'),
			midSections,
			PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Back.png')
		)
	];
	this.activeShip = 0;
}

SkyLevel.prototype.addCannonBall = function(xPos, yPos, xVel, yVel) {
	var cannonBall = this.cannonBallPool.borrow();
	cannonBall.setup(xPos, yPos, xVel, yVel);
	this.bg.addChild(cannonBall.sprite);
}

SkyLevel.prototype.onRelease = function(containerSprite) {
	//removes the sprite object from the bg
	gameController.levelController.currentLevel.bg.removeChild(containerSprite.sprite);
}

SkyLevel.prototype.setupPuppy = function() {
	this.puppy.ddx = 0;
	this.puppy.sprite.position.x = this.puppyStartX;
	this.puppy.sprite.position.y = this.puppyStartY;	
	this.puppy.setBehavior(PuppySprite.FLYING);
	
	this.bg.addChild(this.puppy.sprite);
	this.puppy.setupJetPack();
}

SkyLevel.prototype.loadLevel = function() {
	for(var i = 0; i < this.cloudSprites.length; i++) {
		this.bg.addChild(this.cloudSprites[i].sprite);
	}
	for(var i = 0; i < this.shipSprites.length; i++) {
		this.bg.addChild(this.shipSprites[i].shipContainer);
		this.clippableObjects.push(this.shipSprites[i].bowCollider);
		this.clippableObjects.push(this.shipSprites[i].bowCollider2);
		this.clippableObjects.push(this.shipSprites[i].aftCollider);
		this.clippableObjects.push(this.shipSprites[i].aftCollider2);
		for(var j = 0; j < this.shipSprites[i].midSprites.length; j++) {
			var midSprite = this.shipSprites[i].midSprites[j];
			if(midSprite.type == MidShipSprite.SMOKE_STACK) {
				this.clippableObjects.push(midSprite.smokeStack.smokeStackCollider);
			}
		}
	}
	moveViewPort = false;
}

SkyLevel.prototype.update = function(dt, now) {
	this.puppy.update(dt, now);
	for(var i = 0; i < this.cloudSprites.length; i++) {
		this.cloudSprites[i].update(dt, now);
	}
	this.shipSprites[this.activeShip].update(dt, now);
	this.cannonBallPool.update(dt, now);
	
	if(now - this.lastBird > BIRD_SPEED) {
		var bird = this.birdPool.borrow();
		bird.setup(screenWidth, 300);
		this.bg.addChild(bird.sprite);
		this.lastBird = now;
	}
	
	this.birdPool.update(dt, now);
	
	//time to check collision
	this.doCollision();
}

SkyLevel.prototype.doCollision = function() {
	//cannon ball collision
	var activeCannonBalls = this.cannonBallPool.activeSprites;
	for(var i = 0; i < activeCannonBalls.length; i++) {
		doCollisionWithHandler(activeCannonBalls[i], this.puppy, activeCannonBalls[i].handleCollision);
	}
	var activeBirds = this.birdPool.activeSprites;
	for(var i = 0; i < activeBirds.length; i++) {
		doCollisionWithHandler(activeBirds[i], this.puppy, activeBirds[i].handleCollision);
	}
	var shipSections = this.shipSprites[this.activeShip].midSprites;
	for(var i = 0; i < shipSections.length; i++) {
		if(shipSections[i].type == MidShipSprite.SMOKE_STACK) {
			doCollisionWithHandler(shipSections[i].smokeStack.smokeCollider, this.puppy, shipSections[i].smokeStack.onSmokeCollision);
		}
		else if(shipSections[i].type == MidShipSprite.VENT) {
			doCollisionWithHandler(shipSections[i].vent1, this.puppy, shipSections[i].vent1.handleCollision);
			doCollisionWithHandler(shipSections[i].vent2, this.puppy, shipSections[i].vent2.handleCollision);
		}
	}
}

SkyLevel.prototype.clearLevel = function() {
	moveViewPort = true;
}

SkyLevel.prototype.updateBackgroundAnimations = function() {

}



