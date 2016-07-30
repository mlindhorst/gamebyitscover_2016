var TILE = 30,
	METER = TILE,
	GRAVITY = METER * 9.8,
	MAXDX = METER * 20,
	MAXDY = METER * 60,
	MAX_LAZERS = 25;
	
function LevelController(stage) {	
	this.stage = stage;
	//TODO: if we instantiate all levels here we instantiate everything at once
	// we may want to instantiate only one level at a time
	var texture = PIXI.Sprite.fromFrame("resources/Puppy Stuff/Dogsmall.png");
	this.puppy = new PuppySprite(texture);
	this.lazerBeamSpritePool = new LazerBeamSpritePool();
	this.onScreenLazerBeams = [];
	this.setUpLazerBeams();
	
	this.setupBG(new MountainLevel(this.puppy, this));
}

LevelController.prototype.setUpLazerBeams = function() {
	for(var i = 0; i < MAX_LAZERS; i++) {
		this.onScreenLazerBeams.push(new LazerBeam());
	}
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
		this.setupBG(new CityLevel(this.puppy, this));
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
	this.clearStage();
	this.currentLevel = level;
	this.bg = this.currentLevel.bg;
	this.stage.addChild(this.bg);	
	this.currentLevel.loadLevel();
};

LevelController.prototype.clearStage = function() {
	for (var i = stage.children.length - 1; i >= 0; i--) {	
	stage.removeChild(stage.children[i]);
	}
}

LevelController.prototype.updateLevel = function(dt, now) {
	// TODO: Add updateBackgroundAnimations() to all levels for level animation updates?
	if(this.shootLazers)
	{
		for(var i = 0; i < this.onScreenLazerBeams.length; i++)
		{
			if(this.onScreenLazerBeams[i].graphics == null)
			{
				var currentLazer = this.onScreenLazerBeams[i];
				var sprite = this.lazerBeamSpritePool.borrowLazerBeams();				
				currentLazer.setStartPosition(this.puppy.sprite.position.x + this.puppy.sprite.width - 20, 
										   this.puppy.sprite.position.y + (this.puppy.sprite.height / 2)-20, sprite);
				
				this.currentLevel.bg.addChild(currentLazer.graphics);
				break;
			}
		}
		
	}
	
	for(var i = 0; i < this.onScreenLazerBeams.length; i++)
	{
		var currentLazer = this.onScreenLazerBeams[i];
		currentLazer.update();
		if(currentLazer.removeLazer) {				
			currentLazer.removeLazer = false;				
			this.currentLevel.bg.removeChild(currentLazer.graphics);
			this.lazerBeamSpritePool.returnLazerBeams(currentLazer.sprite);
			this.onScreenLazerBeams[i].sprite = null;
			this.onScreenLazerBeams[i].graphics = null;
		}
	}
	
	this.currentLevel.update(dt, now);
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