function OctopusSprite(){
    this.sprite = PIXI.Sprite.fromFrame("resources/Enemies/Octopus/OctopusCycle_01.png");
	
	if(debug) {
		this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(1, 0xFF0000);	
		this.graphics.drawRect(10, 25, this.getWidth(), this.getHeight());
		this.sprite.addChild(this.graphics);
	}
 	
	this.flyFrames = [
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_01.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_02.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_03.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_04.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_05.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_06.png")
	];
	
	this.damage = 10;
	this.speed = 5;
	this.lastUpdate = new Date().getTime();
	this.lastFlameUpdate = this.lastUpdate;
	this.animationSpeed = 250;
	this.frame = 0;
	this.active = false;
}

OctopusSprite.prototype.setup = function(xPos, yPos) {
	this.sprite.position.x = xPos;
	this.sprite.position.y = yPos;
};

OctopusSprite.prototype.update = function(dt, now) {
	if(now - this.lastUpdate > this.animationSpeed) {
		this.frame = (this.frame + 1) % 6;
		this.sprite.texture = this.flyFrames[this.frame];
		this.lastUpdate = now;
	}
	
	this.sprite.position.x -= this.speed;
	if(this.sprite.position.x  + this.sprite.width < 0) {
		this.active = false;
	}
};

OctopusSprite.prototype.handleCollision = function(spriteA, spriteB) {
	
};

OctopusSprite.prototype.getX = function() {
	return this.sprite.position.x + 10;
};

OctopusSprite.prototype.getY = function() {
	return this.sprite.position.y + 25;
};

OctopusSprite.prototype.getWidth = function() {
	return this.sprite.width - 15;
};

OctopusSprite.prototype.getHeight = function() {
	return this.sprite.height  - 40;
};