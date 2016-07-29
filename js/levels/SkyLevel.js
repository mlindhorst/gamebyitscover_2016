var SHIP1_SECTION_COUNT = 10;
var MAX_CANNON_BALLS = 10;

function SkyLevel(puppy, LevelController) {
	
	this.clippableObjects = [];
	
	//setup cannonBalls
	var cannonBalls = [];
	for(var i = 0; i < MAX_CANNON_BALLS; i++) {
		cannonBalls.push(new CannonBallSprite(0, 0, 0, 0));
	}
	this.cannonBallPool = new SpritePool(cannonBalls, this.onRelease);

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
		var section = new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON);
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
	}
	moveViewPort = false;
}

SkyLevel.prototype.update = function(dt, now) {
	this.puppy.update(dt, now);
	for(var i = 0; i < this.cloudSprites.length; i++) {
		this.cloudSprites[i].update(dt, now);
	}
	for(var i = 0; i < this.shipSprites.length; i++) {
		this.shipSprites[i].update(dt, now);
	}
	this.cannonBallPool.update(dt, now);
}

SkyLevel.prototype.clearLevel = function() {
	moveViewPort = true;
}

SkyLevel.prototype.updateBackgroundAnimations = function() {

}



