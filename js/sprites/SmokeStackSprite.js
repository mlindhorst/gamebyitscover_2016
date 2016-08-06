function SmokeStackSprite() {
	this.container = new PIXI.Container();
	
	this.animationFrame = 0;
	this.animationDelay = 2000;
	this.lastAnimation = new Date().getTime();
	
	this.smokeStack = PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_SmokeStack.png');
	this.smokeStack.height *= 2;
	this.smoke = PIXI.Sprite.fromFrame('resources/Levels/Sky/Smoke_01.png');
	this.smokeTextures = [
		PIXI.Texture.fromFrame('resources/Levels/Sky/Smoke_01.png'),
		PIXI.Texture.fromFrame('resources/Levels/Sky/Smoke_02.png')
	];
	this.container.addChild(this.smoke);
	this.container.addChild(this.smokeStack);
	this.smokeStack.position.y = this.smoke.height;
	this.smoke.position.x = (this.smokeStack.width - this.smoke.width) / 2;
	this.smoke.position.y = 10;
	
	this.smokeStackCollider = new Collidable("SmokeStack", this.smokeStack.position.x, this.smokeStack.position.y, this.smokeStack.width, this.smokeStack.height, this.onStackCollision);
	this.smokeCollider = new Collidable(this, this.smokeStack.position.x, this.smoke.position.y, this.smokeStack.width, this.smoke.height, this.onSmokeCollision)
	this.container.addChild(this.smokeStackCollider.graphics);
	this.container.addChild(this.smokeCollider.graphics);
	
}

SmokeStackSprite.prototype.onStackCollision = function(smokeStack, puppy) {
	//do nothing for now
}

SmokeStackSprite.prototype.onSmokeCollision = function(smoke, puppy) {
	if(smoke.type.animationFrame == 0) {
		//puppy.damage(puppy);
	}
}

SmokeStackSprite.prototype.update = function(dt, now) {
	if(now - this.lastAnimation > this.animationDelay) {
		this.animationFrame = (this.animationFrame + 1) % 2
		this.smoke.texture = this.smokeTextures[this.animationFrame];
		this.lastAnimation = now;
	}
}

SmokeStackSprite.prototype.setup = function(xPos, yPos) {
	this.container.position.x = xPos;
	this.container.position.y = yPos;
}

SmokeStackSprite.prototype.getWidth = function() {
	return this.smokeStack.width;
}

SmokeStackSprite.prototype.getHeight = function() {
	return this.smokeStack.height + this.smoke.height;
}