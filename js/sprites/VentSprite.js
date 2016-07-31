function VentSprite() {
	this.container = new PIXI.Container();
	
	this.animationFrame = 0;
	this.animationDelay = 2000;
	this.lastAnimation = new Date().getTime();
	
	this.vent = PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Vent.png');
	this.fire = PIXI.Sprite.fromFrame('resources/Levels/Sky/ExhaustFire_01.png');
	this.fire.height = this.fire.height * 2;
	this.fireTextures = [
		PIXI.Texture.fromFrame('resources/Levels/Sky/ExhaustFire_01.png'),
		PIXI.Texture.fromFrame('resources/Levels/Sky/ExhaustFire_02.png')
	];
	this.container.addChild(this.fire);
	this.container.addChild(this.vent);
	this.vent.position.y = this.fire.height;
	this.fire.position.x = (this.vent.width - this.fire.width) / 2;
	this.fire.position.y = 10;
	
	if(debug) {
		this.fireBox = new PIXI.Graphics();
		this.fireBox.lineStyle(1, 0xFF0000);
		this.fireBox.drawRect(this.vent.position.x, this.fire.position.y, this.getWidth(), this.getHeight());
		this.container.addChild(this.fireBox);
	}
}

VentSprite.prototype.update = function(dt, now) {
	if(now - this.lastAnimation > this.animationDelay) {
		this.animationFrame = (this.animationFrame + 1) % 2;
		this.fire.texture = this.fireTextures[this.animationFrame];
		this.lastAnimation = now;
		
		this.fireBox.height = this.getHeight();
		if(this.animationFrame == 0) {
			this.fireBox.position.y = 0;
		}
		else {
			this.fireBox.position.y = this.getHeight();
		}
	}
}

VentSprite.prototype.handleCollision = function(vent, puppy) {
	console.log("I'M ON FIRE AAAAAAHHHHHH");
}

VentSprite.prototype.setup = function(xPos, yPos) {
	this.container.position.x = xPos;
	this.container.position.y = yPos;
}

VentSprite.prototype.getWidth = function() {
	return this.vent.width;
}

VentSprite.prototype.getHeight = function() {
	if(this.animationFrame == 0) {
		return this.vent.height + this.fire.height;
	}
	else {
		return this.vent.height + this.fire.height / 2;
	}
}

VentSprite.prototype.getX = function() {
	var xPos = this.fire.position.x;
	var current = this.fire.parent;
	while(current) {
		xPos += current.position.x;
		current = current.parent;
	}
	return xPos;
}

VentSprite.prototype.getY = function() {
	var yPos = 0;
	if(this.animationFrame != 0) {
		yPos = this.getHeight();
	}
	var current = this.fire.parent;
	while(current) {
		yPos += current.position.y;
		current = current.parent;
	}
	return yPos;
}