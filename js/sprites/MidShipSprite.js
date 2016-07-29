

function MidShipSprite(sprite, type) {
	this.sprite = sprite;
	this.type = type;
	this.midShipContainer = this.setupContainer(sprite, type);
	
	if(debug) {
		this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(1, 0xFF0000);
		this.graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);
		this.sprite.addChild(this.graphics);
	}
}

MidShipSprite.prototype.update = function(dt, now) {
	
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
	this.cannon.position.x = (sprite.width - this.cannon.width) / 2;
	this.cannon.position.y = yPos;
	yPos = this.cannon.height;
	container.addChild(sprite);
	sprite.position.y = this.cannon.height - 20;
	return container;
}

MidShipSprite.prototype.setupSmokeStack = function(container, sprite) {
	return null;
}

MidShipSprite.prototype.setupVent = function(container, sprite) {
	return null;
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