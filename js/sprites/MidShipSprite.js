var CANNON_FIRE_SPEED = 3000;
var CANNON_ROTATION_SPEED = .015;

function MidShipSprite(sprite, type) {
	this.sprite = sprite;
	this.type = type;
	this.line = null;
	this.midShipContainer = this.setupContainer(sprite, type);
	
	var now = new Date().getTime();
	this.lastFire = now;
	
	if(debug) {
		this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(1, 0xFF0000);
		this.graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);
		this.sprite.addChild(this.graphics);
	}
}

MidShipSprite.prototype.update = function(dt, now) {
	if(!this.isOnScreen()) {
		//if not on screen, do nothing
		return;
	}
 	switch(this.type) {
		case MidShipSprite.CANNON:
			this.updateCannon(dt, now);
			break;
		default:
			break;
	}
}

MidShipSprite.prototype.updateCannon = function(dt, now) {
	var puppyX = gameController.levelController.puppy.getCenterX();
	var puppyY = gameController.levelController.puppy.getCenterY();
	var xPos = this.getX() + this.cannon.position.x;
	var yPos = this.midShipContainer.parent.position.y + this.midShipContainer.position.y +  + this.cannon.position.y;
	
	//if(debug) {
		//if(this.line) {
			//gameController.levelController.currentLevel.bg.removeChild(this.line);
			
		//}
		//this.line = new PIXI.Graphics();
		//gameController.levelController.currentLevel.bg.addChild(this.line);
		//this.line.lineStyle(5, 0x00FF00);
		//this.line.moveTo(xPos, yPos);
		//this.line.lineTo(puppyX, puppyY);
	//}
	var angleToPuppy = getAngleInRadians(xPos, yPos, puppyX, puppyY);
	var adjustedAngle = angleToPuppy + Math.PI / 2
	if(adjustedAngle - this.cannon.rotation > .015) {
		this.cannon.rotation += CANNON_ROTATION_SPEED;
	}
	else if(adjustedAngle - this.cannon.rotation < -.015) {
		this.cannon.rotation -= CANNON_ROTATION_SPEED;
	}
	if(now - this.lastFire > 3000) {
		//console.log("Fire Cannons!");
		gameController.levelController.currentLevel.addCannonBall(xPos, yPos, getXFromAngle(this.cannon.rotation - Math.PI / 2), getYFromAngle(this.cannon.rotation - Math.PI / 2));
		this.lastFire = now;
	}
}

MidShipSprite.prototype.updateSmokeStack = function(dt, now) {
	
}

MidShipSprite.prototype.updateVent = function(dt, now) {
	
}

MidShipSprite.prototype.collisionHandler = function(spriteA, spriteB) {
	if(debug) {
		console.log("MidShip collision detected");
	}
}

MidShipSprite.prototype.setupContainer = function(sprite, type) {
	var container = new PIXI.Container();
	
	switch(type) {
		case MidShipSprite.CANNON:
			return this.setupCannon(container, sprite);
		case MidShipSprite.SMOKE_STACK:
			return this.setupSmokeStack(container, sprite);
		case MidShipSprite.VENT:
			return this.setupVent(container, sprite);
		default:
			return null;
	}
}

MidShipSprite.prototype.setupCannon = function(container, sprite) {
	var yPos = 0;
	
	this.cannon = PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Cannon.png');
	container.addChild(this.cannon);
	this.cannon.position.x = (sprite.width - this.cannon.width) / 2 + (this.cannon.width / 2);
	this.cannon.position.y = yPos + this.cannon.height * .75;
	yPos = this.cannon.height;
	container.addChild(sprite);
	sprite.position.y = this.cannon.height - 20;
	this.cannon.anchor.x = .5;
	this.cannon.anchor.y = .75;
	this.cannon.rotation = -Math.PI / 4;
	if(debug) {
		var graphics = new PIXI.Graphics();
		graphics.beginFill(0xFF0000);
		graphics.drawCircle(this.cannon.position.x, this.cannon.position.y, 10);
		container.addChild(graphics);
	}
	
	return container;
}

MidShipSprite.prototype.setupSmokeStack = function(container, sprite) {
	return null;
}

MidShipSprite.prototype.setupVent = function(container, sprite) {
	return null;
}

MidShipSprite.prototype.isOnScreen = function() {
	var xPos = this.getX();
	var yPos = this.getY();
	if(xPos > 0 && xPos < screenWidth) {
		if(yPos > 0 && yPos < screenHeight) {
			//is on screen;
			return true;
		}
	}
	return false;
}

MidShipSprite.prototype.getX = function() {
	return this.midShipContainer.parent.position.x + this.midShipContainer.position.x;
}

MidShipSprite.prototype.getY = function() {
	return this.midShipContainer.parent.position.y + this.midShipContainer.position.y + this.sprite.position.y;
}

MidShipSprite.prototype.getWidth = function() {
	return this.sprite.width;
}

MidShipSprite.prototype.getHeight = function() {
	return this.sprite.height;
}

MidShipSprite.NONE = 0;
MidShipSprite.CANNON = 1;
MidShipSprite.SMOKE_STACK = 2;
MidShipSprite.VENT = 3;