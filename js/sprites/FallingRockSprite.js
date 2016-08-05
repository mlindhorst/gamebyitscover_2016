function FallingRockSprite(x, y, distance, spriteNumber) {
	this.type = "FallingRock";	
	this.velX = 0
	this.distance = distance;
	this.startY = y;
	this.destroy = false;
	this.delay = spriteNumber * 200;
	this.numUpdates = 0;
	
	this.rockSprites = [ 
		PIXI.Sprite.fromFrame("resources/Levels/Mountains/fallingrock_01.png"),
		PIXI.Sprite.fromFrame("resources/Levels/Mountains/fallingrock_02.png"),
		PIXI.Sprite.fromFrame("resources/Levels/Mountains/fallingrock_03.png"),	
		PIXI.Sprite.fromFrame("resources/Levels/Mountains/fallingrock_04.png")
	];
	
	this.sprite = this.rockSprites[spriteNumber];
	this.sprite.position.x = x;
	this.sprite.position.y = y;
	
	this.graphics = new PIXI.Graphics();
	if(debug) {
		this.graphics.lineStyle(1, 0xFF0000);	
	}
	this.graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);
	this.sprite.addChild(this.graphics);
	this.lastUpdate = new Date().getTime();
}

FallingRockSprite.prototype.update = function(dt, now) {
	this.numUpdates++;
	
	if(this.numUpdates > this.delay)
		this.sprite.position.y++;
}

FallingRockSprite.prototype.getX = function() {
	return this.sprite.position.x;
};

FallingRockSprite.prototype.setX = function(x) {
	this.sprite.position.x = x;
};

FallingRockSprite.prototype.getY = function() {
	return this.sprite.position.y;
};

FallingRockSprite.prototype.setY = function(y) {
	this.sprite.position.y = y;
};

FallingRockSprite.prototype.getWidth = function() {
	return this.sprite.width;
};

FallingRockSprite.prototype.getHeight = function() {
	return this.sprite.height;
};

FallingRockSprite.prototype.collisionHandler = function(spriteA, spriteB) {
	if(spriteA.type == "FallingRock")
		spriteA.sprite.position.y = this.startY;
}