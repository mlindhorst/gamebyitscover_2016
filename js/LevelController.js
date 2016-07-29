var TILE = 30,
	METER = TILE,
	GRAVITY = METER * 9.8,
	MAXDX = METER * 20,
	MAXDY = METER * 60;
	
function LevelController(stage) {	
	this.stage = stage;
	//TODO: if we instantiate all levels here we instantiate everything at once
	// we may want to instantiate only one level at a time
	var texture = PIXI.Sprite.fromFrame("resources/Puppy Stuff/Dogsmall.png");
	this.puppy = new PuppySprite(texture);
	
	this.setupBG(new MountainLevel(this.puppy, this));
}

LevelController.prototype.nextLevelCollisionHandler = function(levelname){
	if(levelname == "FactoryLevel"){
		this.setupBG(new MountainLevel(this.puppy, this));
	}
	else if(levelname == "MountainLevel"){
		this.setupBG(new SkyLevel(this.puppy, this));
	}
	else if(levelname == "SkyLevel"){
		this.setupBG(new WaterLevel(this.puppy, this));
	}
	else if(levelname == "WaterLevel"){
		console.log("city level");	
	}
};

LevelController.prototype.resetLevel = function() {
	this.stage.removeChild(this.bg);
	this.bg.removeChild(this.currentLevel.puppy.sprite);
	this.currentLevel.clearLevel();
	
	this.setupBG(0);
	this.currentLevel.setupPuppy();
}

LevelController.prototype.setupBG = function(level) {
	this.currentLevel = level;
	this.bg = this.currentLevel.bg;
	this.stage.addChild(this.bg);	
	this.currentLevel.loadLevel();
};

LevelController.prototype.updateLevel = function(dt, now) {
	// TODO: Add updateBackgroundAnimations() to all levels for level animation updates?
	this.currentLevel.update(dt, now)
	this.currentLevel.updateBackgroundAnimations();	
};
  
/*isIntersecting = function(r1, r2) {

	return r1.x < r2.x + r2.width &&
		r1.x + r1.width > r2.x &&
		r1.y < r2.y + r2.height &&
		r1.height + r1.y > r2.y;

};*/

LevelController.prototype.checkCollision = function(dt) {
	//var environmentCollidables = this.currentLevel.environmentCollidables;
	
	//for(var i = 0; i < environmentCollidables.length; i++) {
		//var collidable = environmentCollidables[i];
		//doCollision(this.puppy, collidable, collidable.collisionHandler);
		/*if(checkIntersection(this.puppy, collidable)) {
			if(this.puppy.dy != 0) {
				this.puppy.sprite.position.y = this.puppy.sprite.position.y;
				this.puppy.velY = 0;
				this.puppy.falling = false;
				this.puppy.jumping = false;
			}
			if(this.puppy.sprite.position.x < collidable.x) {
				//this.puppy.sprite.position.x = this.puppy.sprite.position.x;
				//this.puppy.velX = 0;
			}
		}
		
	}*/
};