function BirdSprite() {
	this.sprite = PIXI.Sprite.fromFrame("resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_01.png");
	this.flameSprite = PIXI.Sprite.fromFrame("resources/Enemies/Bird/BirdFire_01.png");
	this.sprite.addChild(this.flameSprite);
	
	this.flameSprite.position.x = this.sprite.width;
	this.flameSprite.position.y = (this.sprite.height - this.flameSprite.height) / 2;
	
	if(debug) {
		this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(1, 0xFF0000);	
		this.graphics.drawRect(10, 25, this.getWidth(), this.getHeight());
		this.sprite.addChild(this.graphics);
	}
 	
	this.flyFrames = [
		PIXI.Texture.fromFrame("resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_01.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_02.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_03.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_04.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_05.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_06.png")
	];
	
	this.fireFrames = [
		PIXI.Texture.fromFrame("resources/Enemies/Bird/BirdFire_01.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Bird/BirdFire_02.png")
	];
	
	this.damage = 10;
	this.speed = 5;
	this.lastUpdate = new Date().getTime();
	this.lastFlameUpdate = this.lastUpdate;
	this.animationSpeed = 250;
	this.fireSpeed = 200;
	this.frame = 0;
	this.fireFrame = 0;
	this.active = false;
}

BirdSprite.prototype.setup = function(xPos, yPos) {
	this.sprite.position.x = xPos;
	this.sprite.position.y = yPos;
} 

BirdSprite.prototype.update = function(dt, now) {
	if(now - this.lastUpdate > this.animationSpeed) {
		this.frame = (this.frame + 1) % 6;
		this.sprite.texture = this.flyFrames[this.frame];
		this.lastUpdate = now;
	}
	if(now - this.lastFlameUpdate > this.fireSpeed) {
		this.fireFrame = (this.fireFrame + 1) % 2;
		this.flameSprite.texture = this.fireFrames[this.fireFrame];
		this.lastFlameUpdate = now;
	}
	
	this.sprite.position.x -= this.speed;
	if(this.sprite.position.x  + this.sprite.width + this.flameSprite.width < 0) {
		this.active = false;
	}
}

BirdSprite.prototype.handleCollision = function(spriteA, spriteB) {
	console.log("IT'S RANING BIRDS");
}

BirdSprite.prototype.getX = function() {
	return this.sprite.position.x + 10;
}

BirdSprite.prototype.getY = function() {
	return this.sprite.position.y + 25;
}

BirdSprite.prototype.getWidth = function() {
	return this.sprite.width - 15;
}

BirdSprite.prototype.getHeight = function() {
	return this.sprite.height  - 40;
}