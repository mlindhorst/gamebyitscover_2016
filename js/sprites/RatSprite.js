WALK_FRAMES = 4;

function RatSprite(x, y) {
	this.sprite = PIXI.Sprite.fromFrame("resources/Enemies/RatWalkCycle/RatWalkCycle_01.png");
	this.sprite.position.x = x;
	this.sprite.position.y = y;
	this.health = 1000;
	this.velX = 0;
	this.frame = 0;
	
	this.walkFrames = [ 
		PIXI.Texture.fromFrame("resources/Enemies/RatWalkCycle/RatWalkCycle_01.png"),
		PIXI.Texture.fromFrame("resources/Enemies/RatWalkCycle/RatWalkCycle_02.png"),
		PIXI.Texture.fromFrame("resources/Enemies/RatWalkCycle/RatWalkCycle_03.png"),
		PIXI.Texture.fromFrame("resources/Enemies/RatWalkCycle/RatWalkCycle_04.png")
	];
	
	this.graphics = new PIXI.Graphics();
	if(debug) {
		this.graphics.lineStyle(1, 0xFF0000);	
	}
	this.graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);
	this.sprite.addChild(this.graphics);
	
	this.lastUpdate = new Date().getTime();
	this.animationRate = 100;
	//this.collisionHandler = collisionHandler;
}

RatSprite.prototype.update = function(dt, now) {
	this.sprite.position.x += 1;
	this.doWalkingAnimation(now);
	this.velX = 1;
}

RatSprite.prototype.doWalkingAnimation = function(now) {
	//animate
	if(this.velX != 0) {
		if(now - this.lastUpdate >= this.animationRate) {
			//puppy is walking
			this.sprite.texture = this.walkFrames[this.frame];
			this.frame = (this.frame + 1) % WALK_FRAMES;
			this.lastUpdate = now;
		}
	}
	else {
		this.sprite.texture = this.walkFrames[0];
	}
}

RatSprite.prototype.damage = function(damage) {
	this.health -= damage;
	if(this.health < 0) {
		return 0;
	}
	return 1;
}

RatSprite.prototype.getX = function() {
	return this.sprite.position.x;
};

RatSprite.prototype.setX = function(x) {
	this.sprite.position.x = x;
};

RatSprite.prototype.getY = function() {
	return this.sprite.position.y;
};

RatSprite.prototype.setY = function(y) {
	this.sprite.position.y = y;
};

RatSprite.prototype.getWidth = function() {
	return this.sprite.width;
};

RatSprite.prototype.getHeight = function() {
	return this.sprite.height;
};