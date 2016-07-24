var TILE  = 30,
	METER = TILE,
	GRAVITY = 9.8,
	MAXDX = 15,
	MAXDY = 60,
	ACCEL = 1/2,
	FRICTION = 1/6,
	IMPULSE = 500;
	
	
function PuppySprite(sprite) {
	this.puppyTexture = PIXI.Texture.fromFrame("resources/Puppy Stuff/Dogsmall.png");
	this.sprite = sprite;
	
	this.speed = 3;
	this.health = 1000;
	
	this.graphics = new PIXI.Graphics();
	this.graphics.lineStyle(1, 0xFF0000);	
	this.graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);
	this.graphics.position.x = this.sprite.position.x;
	this.graphics.position.y = this.sprite.position.y;
	this.sprite.addChild(this.graphics);
	
	this.velX = 0;
	this.velY = 0;
	this.accX = 0;
	this.gravity = METER * GRAVITY;
	this.accY = this.gravity;
	this.maxVelX = METER * 15;
	this.maxVelY = METER * 60;
	this.impulse = METER * IMPULSE;
	this.accel = this.maxVelX / ACCEL;
	this.friction = this.maxVelX / FRICTION;
}

PuppySprite.prototype.bound = function(x, min, max) {
    return Math.max(min, Math.min(max, x));
  }
  
PuppySprite.prototype.update = function(dt) {
	var wasleft    = this.velX  < 0,
        wasright   = this.velX  > 0,
		friction   = this.friction,
		accel = this.accel;

	this.accX = 0;
	this.accY = this.gravity;
	
	if(this.left)
		this.accX = this.accX - accel; 
	else if(wasleft)
		this.accX = this.accX + friction;
	
	if(this.right)
		this.accX = this.accX + accel; 
	else if(wasright)
		this.accX = this.accX - friction;
	
	if(this.jump && !this.jumping && !this.falling) {
		this.sprite.position.y = this.sprite.position.y - 5;
		this.accY = this.accY - this.impulse;
		this.jumping = true;
	}
		
	this.lastX = this.sprite.position.x;
	this.lastY = this.sprite.position.y;
	this.sprite.position.x = Math.floor(this.sprite.position.x + (dt * this.velX));
	this.sprite.position.y = Math.floor(this.sprite.position.y  + (dt * this.velY));
	this.velY = this.bound(this.velY + (dt * this.accY), -this.maxVelY, this.maxVelY);
	this.velX = this.bound(this.velX + (dt * this.accX), -this.maxVelX, this.maxVelX);
	
	if ((wasleft  && (this.velX > 0)) ||
        (wasright && (this.velX < 0))) 
			this.velX = 0; // clamp at zero to prevent friction from making us jiggle side to side
			
	if(debug) {
		console.log("Puppy position: " + this.getX() + ", " + this.getY());
	}
}

PuppySprite.prototype.damage = function(damage) {
	this.health -= damage;
	if(this.health < 0) {
		return 0;
	}
	return 1;
}

PuppySprite.prototype.getX = function() {
	return this.sprite.position.x;
}

PuppySprite.prototype.setX = function(x) {
	this.sprite.position.x = x;
}

PuppySprite.prototype.getY = function() {
	return this.sprite.position.y;
}

PuppySprite.prototype.setY = function(y) {
	this.sprite.position.y = y;
}

PuppySprite.prototype.getWidth = function() {
	return this.sprite.width;
}

PuppySprite.prototype.getHeight = function() {
	return this.sprite.height;
}

PuppySprite.prototype.getCenterX = function() {
	return this.sprite.position.x + (this.sprite.width / 2);
};

PuppySprite.prototype.getCenterY = function() {
	return this.sprite.position.y + (this.sprite.height / 2);
};