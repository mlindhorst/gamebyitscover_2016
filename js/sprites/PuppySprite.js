var TILE  = 30,
	METER = TILE,
	GRAVITY = 9.8,
	MAXDX = 15,
	MAXDY = 60,
	ACCEL = 1/2,
	FRICTION = 1/6,
	IMPULSE = 500;
	WALK_FRAMES = 5;
	
	
function PuppySprite(sprite) {
	this.puppyTexture = PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_01.png");
	this.walkFrames = [ 
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_01.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_02.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_03.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_04.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_05.png")
	];
	this.sprite = sprite;
	
	this.speed = 3;
	this.health = 1000;
	
	this.graphics = new PIXI.Graphics();
	this.graphics.lineStyle(1, 0xFF0000);	
	this.graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);
	this.graphics.position.x = this.sprite.position.x;
	this.graphics.position.y = this.sprite.position.y;
	this.sprite.addChild(this.graphics);
	this.lastUpdate = new Date().getTime();
	this.animationRate = 100;
	
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
	this.frame = 0;
}

PuppySprite.prototype.bound = function(x, min, max) {
    return Math.max(min, Math.min(max, x));
  }
  
PuppySprite.prototype.update = function(dt, now) {
	var wasleft    = this.velX  < 0,
        wasright   = this.velX  > 0,
		friction   = this.friction,
		accel = this.accel;
		//objects to test for clipping
		clippables = gameController.getClippableObjects();

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
		this.sprite.texture = this.puppyTexture;
	}
	
	/*
	 * Handling collision by x and y separately to
	 * 	determine direction of clip.
	 */
	
	//move x then clip x
	this.sprite.position.x = Math.floor(this.sprite.position.x + (dt * this.velX));
	if(clippables != null) {
		for(var i = 0; i < clippables.length; i++) {
			doCollision(this, clippables[i], this.clipByX);
		}
	}
	//move y then clip y
	this.sprite.position.y = Math.floor(this.sprite.position.y  + (dt * this.velY));
	this.lastY = this.sprite.position.y;
	if(clippables != null) {
		for(var i = 0; i < clippables.length; i++) {
			doCollision(this, clippables[i], this.clipByY);
		}
	}
	
	this.velY = this.bound(this.velY + (dt * this.accY), -this.maxVelY, this.maxVelY);
	this.velX = this.bound(this.velX + (dt * this.accX), -this.maxVelX, this.maxVelX);
	
	if ((wasleft  && (this.velX > 0)) ||
        (wasright && (this.velX < 0))) 
			this.velX = 0; // clamp at zero to prevent friction from making us jiggle side to side
			
	if(debug) {
		//console.log("Puppy position: " + this.getX() + ", " + this.getY());
	}
}

PuppySprite.prototype.clipByX = function(puppySprite, collidable) {
	
	if(puppySprite.velX > 0) {
		puppySprite.setX(collidable.getX() - puppySprite.getWidth());
	}
	else {
		puppySprite.setX(collidable.getX() + collidable.getWidth());
	}
}

PuppySprite.prototype.clipByY = function(puppySprite, collidable) {
	//falling through object
	if(puppySprite.getY() + puppySprite.getHeight() > collidable.getY() && puppySprite.velY > 0) {
		console.log("fall collision");
		puppySprite.falling = false;
		puppySprite.jumping = false;
		puppySprite.jump = false;
		puppySprite.velY = 0;
		puppySprite.setY(collidable.getY() - puppySprite.getHeight());
	}
	//hitting object from above
	else if(puppySprite.getY() < collidable.getY() + collidable.getHeight() && puppySprite.velY < 0) {
		console.log("jump collision");
		puppySprite.jumping = false;
		puppySprite.falling = true;
		puppySprite.velY = 0;
		puppySprite.setY(collidable.getY() + collidable.getHeight());
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