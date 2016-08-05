RAT_WALK_FRAMES = 4;

function RatSprite(x, y, distance, startDirection) {
	this.type = "Enemy";
	this.sprite = PIXI.Sprite.fromFrame("resources/Enemies/RatWalkCycle/RatWalkCycle_01.png");
	this.sprite.position.x = x;
	this.sprite.position.y = y;
	this.health = 1000;
	this.velX = 0
	this.distance = distance;
	this.startX = x;
	this.direction = startDirection;
	this.frame = 0;
	this.destroy = false;
	
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
	this.graphics.position.x = x - (this.sprite.width / 2);
	this.graphics.position.y = y - (this.sprite.height / 2);
	this.sprite.addChild(this.graphics);
	this.sprite.anchor.x = .5;
	this.sprite.anchor.y = .5;
	this.lastUpdate = new Date().getTime();
	this.animationRate = 100;
	//this.collisionHandler = collisionHandler;
}

RatSprite.prototype.update = function(dt, now) {	
	if(this.direction == "right"){
		this.sprite.scale.x = 1;
		this.sprite.position.x += 1;
		this.graphics.position.x++;
	}
	else if(this.direction == "left" ) {
		this.sprite.scale.x = -1;
		this.sprite.position.x -= 1;
		this.graphics.position.x--;
	}
	var currentDistanceTraveled = Math.abs(this.startX - this.sprite.position.x);
	if(currentDistanceTraveled <= 0 || currentDistanceTraveled > this.distance)
		this.switchDirection()
	this.doWalkingAnimation(now);
	this.velX = 1;
}

RatSprite.prototype.switchDirection = function(){
	if(this.direction == "right")
		this.direction = "left"
	else
		this.direction = "right"
}

RatSprite.prototype.doWalkingAnimation = function(now) {
	//animate
	if(this.velX != 0) {
		if(now - this.lastUpdate >= this.animationRate) {
			//rat is walking
			this.sprite.texture = this.walkFrames[this.frame];
			this.frame = (this.frame + 1) % RAT_WALK_FRAMES;
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
	return this.sprite.position.x - (this.sprite.width / 2);
};

RatSprite.prototype.setX = function(x) {
	this.sprite.position.x = x ;
};

RatSprite.prototype.getY = function() {
	return this.sprite.position.y - (this.sprite.height / 2);
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

RatSprite.prototype.collisionHandler = function(spriteA, spriteB) {
	if(spriteA.type == "Puppy" ){
		spriteA.damage(spriteA)
	}
	if(spriteB.type == "puppyLazer"){
		this.destroy = true;
	}
}