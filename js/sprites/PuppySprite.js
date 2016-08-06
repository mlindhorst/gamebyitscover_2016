var TILE  = 30,
	METER = TILE,
	GRAVITY = 9.8 * 6,
	MAXDX = 15,
	MAXDY = 60,
	ACCEL = 1/2,
	FRICTION = 1/6,
	IMPULSE = 2500;
	WALK_FRAMES = 5;
	FLY_FRAMES = 2;
	SWIM_FRAMES = 5;
	MAX_UP_THRUST = -9.8 * 7;
	MIN_UP_THRUST = -9.8 * 5;
	PUPPY_X_OFFSET = -45.5;
	PUPPY_Y_OFFSET = 40;
	INVULNERABLE_TIME = 2000;
	
function PuppySprite(sprite) {
	this.facingRight = true;
	this.type = "Puppy";
	this.puppyTexture = PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_01.png");
	this.walkFrames = [ 
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_01.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_02.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_03.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_04.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Walk Cycle/DogWalkCycle_05.png")
	];
	
	this.swimFrames = [
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Swim Cycle/DogSwimCycle_01.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Swim Cycle/DogSwimCycle_02.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Swim Cycle/DogSwimCycle_03.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Swim Cycle/DogSwimCycle_04.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Swim Cycle/DogSwimCycle_05.png"),
		];
	
	this.flyingFrames = [
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Swim Cycle/DogSwimCycle_03.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/Swim Cycle/DogSwimCycle_04.png")
	]
	
	this.jetPackFrames = [
		PIXI.Texture.fromFrame("resources/Puppy Stuff/DogJetPack_01.png"),
		PIXI.Texture.fromFrame("resources/Puppy Stuff/DogJetPack_02.png")
	];
	this.sprite = sprite;
	this.sprite.anchor.x = .5;
	PUPPY_X_OFFSET = -(this.getWidth() / 2);
	
	this.speed = 3;
	this.health = 1000;
	
	if(debug) {
		this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(1, 0xFF0000);	
		
		this.graphics.drawRect(-(this.getWidth() / 2), PUPPY_Y_OFFSET, this.getWidth(), this.getHeight());
		this.sprite.addChild(this.graphics);
	}
	this.lastUpdate = new Date().getTime();
	this.animationRate = 100;
	
	this.velX = 0;
	this.velY = 0;
	this.accX = 0;
	this.gravity = METER * GRAVITY;
	this.accY = this.gravity;
	this.maxVelX = METER * 15;
	this.maxVelY = METER * 60;
	this.maxSwimVelY = METER * 15;
	this.maxFlyVelY = METER * 15;
	this.impulse = METER * IMPULSE;
	this.accel = this.maxVelX / ACCEL;
	this.friction = this.maxVelX / FRICTION;
	this.frame = 0;
	
	this.setBehavior(PuppySprite.DEFAULT_BEHAVIOR);
	this.invulnerable = false;
	this.lastDamaged = 0;
	this.lastBlink = 0;
}

PuppySprite.DEFAULT_BEHAVIOR = 0;
PuppySprite.FLYING = 1;
PuppySprite.SWIMMING = 2;

PuppySprite.prototype.setBehavior = function(behavior) {
	switch(behavior) {
		case PuppySprite.DEFAULT_BEHAVIOR:
			this.update = this.defaultBehavior;
			break;
		case PuppySprite.FLYING:
			this.update = this.flyingBehavior;
			break;
		case PuppySprite.SWIMMING:
			this.update = this.swimmingBehavior; //update when swimming behavior is done
			break;
		default:
			this.update = this.defaultBehavior;
	}
}

PuppySprite.prototype.swimmingBehavior = function(dt, now){
	var wasleft    = this.velX  < 0,
        wasright   = this.velX  > 0,
		friction   = this.friction,
		accel = this.accel;
		//objects to test for clipping
		clippables = gameController.getClippableObjects();
	
	this.doInvulnerable(now);
	
	if(this.velX != 0 || this.jump) {
		this.doSwimmingAnimation(now);
	}
		
	var upThrust = MIN_UP_THRUST * METER;
	if(this.jump) {
		//calculate upwards thrust
		upThrust = MAX_UP_THRUST * METER;
	}
		
	this.accX = 0;
	this.accY = this.gravity + upThrust;
	
	if(this.left)
		this.accX = this.accX - accel; 
	else if(wasleft)
		this.accX = this.accX + friction;
	
	if(this.right)
		this.accX = this.accX + accel; 
	else if(wasright)
		this.accX = this.accX - friction;
	
	/*
	 * Handling collision by x and y separately to
	 * 	determine direction of clip.
	 */
	
	//move x then clip x
	this.sprite.position.x = Math.floor(this.sprite.position.x + (dt * this.velX));
	if(clippables != null) {
		for(var i = 0; i < clippables.length; i++) {
			this.collisionHandler = this.clipByX;
			doCollision(this, clippables[i]);
		}
	}
	if(this.sprite.position.x < 0) {
		this.sprite.position.x = 0;
		if(this.accX < 0) {
			this.accX = 0;
		}
	}
	
	//move y then clip y
	this.sprite.position.y = Math.floor(this.sprite.position.y  + (dt * this.velY));
	this.lastY = this.sprite.position.y;
	if(clippables != null) {
		for(var i = 0; i < clippables.length; i++) {
			this.collisionHandler = this.clipByY;
			doCollision(this, clippables[i]);
		}
	}
	if(this.sprite.position.y < 0) {
		this.sprite.position.y = 0;
		if(this.accY < 0) {
			this.accY = 0;
		}
	}
	
	this.velY = this.bound(this.velY + (dt * this.accY), -this.maxFlyVelY, this.maxFlyVelY);
	this.velX = this.bound(this.velX + (dt * this.accX), -this.maxVelX, this.maxVelX);
	
	if ((wasleft  && (this.velX > 0)) ||
        (wasright && (this.velX < 0))) 
			this.velX = 0; // clamp at zero to prevent friction from making us jiggle side to side
			
	if(debug) {
		//console.log("Puppy position: " + this.getX() + ", " + this.getY());
	}
};

PuppySprite.prototype.setupJetPack = function() {
	this.jetPackSprite = PIXI.Sprite.fromFrame('resources/Puppy Stuff/DogJetPack_02.png');
	
	this.jetPackSprite.position.y = 70;
	this.jetPackSprite.position.x = 70 + PUPPY_X_OFFSET * 1.4;
	this.jetPackSprite.anchor.x = 0.7;
	this.jetPackSprite.anchor.y = 0.5;
	this.jetPackSprite.rotation = -Math.PI / 2;
	this.sprite.addChild(this.jetPackSprite);
}

PuppySprite.prototype.removeJetPack = function() {
	this.sprite.removeChild(this.jetPackSprite);
	this.jetPackSprite = null;
}

PuppySprite.prototype.bound = function(x, min, max) {
    return Math.max(min, Math.min(max, x));
  }
  
PuppySprite.prototype.doInvulnerable = function(now) {
	if(this.invulnerable) {
		if(now - this.lastDamaged > INVULNERABLE_TIME) {
			this.invulnerable = false;
			this.sprite.alpha = 1;
		}
		else {
			if(now - this.lastBlink > 100) {
				if(this.sprite.alpha == 1) {
					this.sprite.alpha = .5;
					this.lastBlink = now;
				}
				else {
					this.sprite.alpha = 1;
					this.lastBlink = now;
				}
			}
		}
	}
}
  
PuppySprite.prototype.flyingBehavior = function(dt, now) {
	var wasleft    = this.velX  < 0,
        wasright   = this.velX  > 0,
		friction   = this.friction,
		accel = this.accel;
		//objects to test for clipping
		clippables = gameController.getClippableObjects();
	
	this.doInvulnerable(now);
	
	if(this.velX != 0 || this.jump) {
		this.jetPackSprite.texture = this.jetPackFrames[0];
		this.doFlyAnimation(now);
	}
	else {
		this.jetPackSprite.texture = this.jetPackFrames[1];
	}
		
	if(this.velX > 0 && this.jump) {
		this.jetPackSprite.rotation = -Math.PI / 4;
	}
	else if(this.velX > 0) {
		this.jetPackSprite.rotation = 0;
	}
	else if(this.velX < 0) {
		this.jetPackSprite.rotation = -Math.PI * 3 / 4;
	}
	else {
		this.jetPackSprite.rotation = -Math.PI / 2;
	}
		
	var upThrust = MIN_UP_THRUST * METER;
	if(this.jump) {
		//calculate upwards thrust
		upThrust = MAX_UP_THRUST * METER;
	}
		
	this.accX = 0;
	this.accY = this.gravity + upThrust;
	
	if(this.left)
		this.accX = this.accX - accel; 
	else if(wasleft)
		this.accX = this.accX + friction;
	
	if(this.right)
		this.accX = this.accX + accel; 
	else if(wasright)
		this.accX = this.accX - friction;
	
	/*
	 * Handling collision by x and y separately to
	 * 	determine direction of clip.
	 */
	
	//move x then clip x
	this.sprite.position.x = Math.floor(this.sprite.position.x + (dt * this.velX));
	if(clippables != null) {
		for(var i = 0; i < clippables.length; i++) {
			this.collisionHandler = this.flyingClipByX;
			doCollision(this, clippables[i]);
		}
	}
	if(this.sprite.position.x < 0) {
		this.sprite.position.x = 0;
		if(this.accX < 0) {
			this.accX = 0;
		}
	}
	else if(this.sprite.position.x > screenWidth - this.sprite.width) {
		this.sprite.position.x = screenWidth - this.sprite.width;
		if(this.accX > 0) {
			this.accX = 0;
		}
	}
	
	//move y then clip y
	this.sprite.position.y = Math.floor(this.sprite.position.y  + (dt * this.velY));
	this.lastY = this.sprite.position.y;
	if(clippables != null) {
		for(var i = 0; i < clippables.length; i++) {
			this.collisionHandler = this.clipByY;
			doCollision(this, clippables[i]);
		}
	}
	if(this.sprite.position.y < 0) {
		this.sprite.position.y = 0;
		if(this.accY < 0) {
			this.accY = 0;
		}
	}
	else if(this.sprite.position.y > screenHeight - this.sprite.height) {
		this.sprite.position.y = screenHeight - this.sprite.height;
		if(this.accY > 0) {
			this.accY = 0;
		}
	}
	
	this.velY = this.bound(this.velY + (dt * this.accY), -this.maxFlyVelY, this.maxFlyVelY);
	this.velX = this.bound(this.velX + (dt * this.accX), -this.maxVelX, this.maxVelX);
	
	if ((wasleft  && (this.velX > 0)) ||
        (wasright && (this.velX < 0))) 
			this.velX = 0; // clamp at zero to prevent friction from making us jiggle side to side
			
	if(debug) {
		//console.log("Puppy position: " + this.getX() + ", " + this.getY());
	}
}
  
PuppySprite.prototype.defaultBehavior = function(dt, now) {
	var wasleft    = this.velX  < 0,
        wasright   = this.velX  > 0,
		friction   = this.friction,
		accel = this.accel;
		//objects to test for clipping
		clippables = gameController.getClippableObjects();

	this.doInvulnerable(now);
		
	this.accX = 0;
	this.accY = this.gravity;
	
	if(this.left) {
		this.facingRight = false;
		this.sprite.scale.x = -1;
		this.accX = this.accX - accel; 
	}
	else if(wasleft)
		this.accX = this.accX + friction;
	
	if(this.right){
		this.facingRight = true;
		this.sprite.scale.x = 1;
		this.accX = this.accX + accel; 
	}
	else if(wasright)
		this.accX = this.accX - friction;
	
	if(this.jump && !this.jumping && !this.falling) {
		this.sprite.position.y = this.sprite.position.y - 5;
		this.accY = this.accY - this.impulse;
		this.jumping = true;
	}
	
	this.doWalkingAnimation(now);
	
	/*
	 * Handling collision by x and y separately to
	 * 	determine direction of clip.
	 */
	
	//move x then clip x
	this.sprite.position.x = Math.floor(this.sprite.position.x + (dt * this.velX));
	if(clippables != null) {
		for(var i = 0; i < clippables.length; i++) {
			this.collisionHandler = this.clipByX;
			doCollision(this, clippables[i]);
		}
	}
	//move y then clip y
	this.sprite.position.y = Math.floor(this.sprite.position.y  + (dt * this.velY));
	this.lastY = this.sprite.position.y;
	if(clippables != null) {
		for(var i = 0; i < clippables.length; i++) {
			this.collisionHandler = this.clipByY;
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

PuppySprite.prototype.doSwimmingAnimation = function(now){
	if(now - this.lastUpdate >= this.animationRate * 2) {
		this.frame = (this.frame + 1) % SWIM_FRAMES;
		this.sprite.texture = this.swimFrames[this.frame];
		this.lastUpdate = now;
	}
};

PuppySprite.prototype.doFlyAnimation = function(now) {
	if(now - this.lastUpdate >= this.animationRate * 2) {
		this.frame = (this.frame + 1) % FLY_FRAMES;
		this.sprite.texture = this.flyingFrames[this.frame];
		this.lastUpdate = now;
	}
}

PuppySprite.prototype.doWalkingAnimation = function(now) {
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
}

/**
 * Collision Handlers
 */

PuppySprite.prototype.collisionHandler = function(puppySprite, collidable) {}


PuppySprite.prototype.flyingClipByX = function(puppySprite, collidable) {
	if(collidable.getX() - puppySprite.getX() < 0) {
		puppySprite.setX(collidable.getX() + collidable.getWidth());
	}
	else {
		puppySprite.setX(collidable.getX() - puppySprite.getWidth());
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

PuppySprite.prototype.damage = function(puppySprite) {
	if(!puppySprite.invulnerable) {
		var now = new Date().getTime();
		puppySprite.lastDamaged = now;
		puppySprite.lastBlink = now;
		puppySprite.sprite.alpha = .5;
		puppySprite.invulnerable = true;
		gameController.levelController.removeTreat();
	}
}

PuppySprite.prototype.getX = function() {
	return this.sprite.position.x + PUPPY_X_OFFSET;
}

PuppySprite.prototype.setX = function(x) {
	this.sprite.position.x = x - PUPPY_X_OFFSET;
}

PuppySprite.prototype.getY = function() {
	return this.sprite.position.y + PUPPY_Y_OFFSET;
}

PuppySprite.prototype.setY = function(y) {
	this.sprite.position.y = y - PUPPY_Y_OFFSET ;
}

PuppySprite.prototype.getWidth = function() {
	return this.sprite.width - 40;
}

PuppySprite.prototype.getHeight = function() {
	return this.sprite.height - PUPPY_Y_OFFSET - 3;
}

PuppySprite.prototype.getCenterX = function() {
	return this.sprite.position.x - 60;
};

PuppySprite.prototype.getCenterY = function() {
	return this.sprite.position.y + (this.sprite.height / 2);
};