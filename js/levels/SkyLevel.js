var SHIP1_SECTION_COUNT = 10;
var MAX_CANNON_BALLS = 10;
var MAX_BIRDS = 10;
var BIRD_SPEED = 3000;
var SHIP_INTERVAL_SPEED = 10000;
var BETWEEN_SHIP_DELAY = 10000;

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
	this.endLevel = false;
	
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
	this.puppyTreat = new PuppyTreat(800, 200, LevelController);
	this.activeTreat = null;
	
	this.cloudSprites = [
		new CloudSprite(PIXI.Sprite.fromFrame("resources/Levels/Mountains/Cloud_01.png"), -200, 1),
		new CloudSprite(PIXI.Sprite.fromFrame("resources/Levels/Mountains/Cloud_02.png"), 400, 1),
		new CloudSprite(PIXI.Sprite.fromFrame("resources/Levels/Mountains/Cloud_03.png"), 200, 1)
	];
		
	var midSections = [
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.NONE),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.SMOKE_STACK),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.VENT),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.SMOKE_STACK),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.NONE),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.VENT),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.NONE),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON)
	];
	
	var midSections2 = [
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.NONE),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.SMOKE_STACK),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.VENT),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.SMOKE_STACK),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.NONE),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.VENT),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.NONE),
		new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON)
	];
	
	this.shipSprites = [
		new ShipSprite(
			PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Front.png'),
			midSections,
			PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Back.png')
		),
		new ShipSprite(
			PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Front.png'),
			midSections2,
			PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Back.png')
		)
	];
	this.activeShip = -1;
	this.lastShipDestroyed = new Date().getTime();
	
	this.endLevelCollider = new Collidable("end", 0, 0, 800, 600, function() {
			gameController.levelController.currentLevel.clearLevel();
			LevelController.nextLevelCollisionHandler.apply(LevelController, ["SkyLevel"]);
		});
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
	moveViewPort = false;
}

SkyLevel.prototype.setupShip = function() {
	var activeShip = this.shipSprites[this.activeShip];
	console.log(this.activeShip);
	this.bg.addChild(activeShip.shipContainer);
	this.clippableObjects.push(activeShip.bowCollider);
	this.clippableObjects.push(activeShip.bowCollider2);
	this.clippableObjects.push(activeShip.aftCollider);
	this.clippableObjects.push(activeShip.aftCollider2);
	for(var j = 0; j < activeShip.midSprites.length; j++) {
		var midSprite = activeShip.midSprites[j];
		this.clippableObjects.push(midSprite);
		if(midSprite.type == MidShipSprite.SMOKE_STACK) {
			this.clippableObjects.push(midSprite.smokeStack.smokeStackCollider);
		}
	}
}

SkyLevel.prototype.destroyShip = function() {
	//remove objects from stage
	this.bg.removeChild(this.shipSprites[this.activeShip].shipContainer);
	//reset clippable objects
	this.clippableObjects = [];
	//release the ship
	this.shipSprites[this.activeShip] = null;
	//start ship destroyed timer
	this.lastShipDestroyed = new Date().getTime();
}

SkyLevel.prototype.update = function(dt, now) {
	
	this.puppy.update(dt, now);
	for(var i = 0; i < this.cloudSprites.length; i++) {
		this.cloudSprites[i].update(dt, now);
	}
	
	if(this.activeShip >= 0 && this.shipSprites[this.activeShip] != null) {
		if(this.shipSprites[this.activeShip].destroy) {
			this.destroyShip();
			this.activeTreat = this.puppyTreat;
			this.activeTreat.sprite.position.x = 800;
			this.bg.addChild(this.activeTreat.sprite);
		}
		else {
			this.shipSprites[this.activeShip].update(dt, now);
		}
	}
	else if(now - this.lastShipDestroyed > SHIP_INTERVAL_SPEED && this.activeShip < this.shipSprites.length - 1) {
		this.activeShip++;
		this.setupShip();
	}
	else if(now - this.lastShipDestroyed > SHIP_INTERVAL_SPEED && this.activeShip >= this.shipSprites.length - 1) {
		if(!this.endLevel) {
			this.endLevel = true;
			this.endLevelTimer = now;
		}
	}
	
	this.cannonBallPool.update(dt, now);
	if(now - this.lastBird > BIRD_SPEED) {
		var bird = this.birdPool.borrow();
		bird.setup(screenWidth, this.puppy.getY() - 20);
		this.bg.addChild(bird.sprite);
		this.lastBird = now;
	}
	
	this.birdPool.update(dt, now);
	
	//time to check collision
	this.doCollision();
	
	if(this.activeTreat) {
		this.activeTreat.sprite.position.x--;
		if(this.activeTreat.sprite.position.x <= -this.activeTreat.getWidth()) {
			this.bg.removeChild(this.activeTreat.sprite);
			this.activeTreat = null;
		}
	}
	if(this.endLevel && now - this.endLevelTimer > BETWEEN_SHIP_DELAY) {
		doCollision(this.puppy, this.endLevelCollider, this.endLevelCollider.handleCollision);
	}
	
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
	if(this.shipSprites[this.activeShip]) {
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
	var lazers = gameController.levelController.onScreenLazerBeams;
	for(var i = 0; i < lazers.length; i++) {
		
		var lazer = lazers[i];
		if(lazer.graphics == null) {
			//skip it if no graphics
			continue;
		}
		for(var j = 0; j < this.birdPool.activeSprites.length; j++) {
			var bird = this.birdPool.activeSprites[j];
			if(doCollisionWithHandler(lazer, bird, function() {})) {
				bird.active = false;
			}
		}
	}
	if(this.activeTreat && doCollisionWithHandler(this.puppy, this.activeTreat, this.activeTreat.collisionHandler)) {
		this.bg.removeChild(this.activeTreat.sprite);
		this.activeTreat = null;
	}
}

SkyLevel.prototype.clearLevel = function() {
	this.puppy.setBehavior(PuppySprite.DEFAULT_BEHAVIOR);
	this.puppy.removeJetPack();
	moveViewPort = true;
}

SkyLevel.prototype.updateBackgroundAnimations = function() {

}



