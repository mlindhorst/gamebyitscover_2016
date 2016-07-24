var TILE = 30,
	METER = TILE,
	GRAVITY = METER * 9.8,
	MAXDX = METER * 20,
	MAXDY = METER * 60;
	
function LevelController(stage) {	
	this.stage = stage;
	this.levels = [new MountainLevel()];
	
	this.setupBG(0);
	this.setupPuppy();	
}

LevelController.prototype.setupBG = function(levelNumber) {
	this.currentLevel = this.levels[levelNumber]
	this.bg = this.currentLevel.bg;
	this.stage.addChild(this.bg);	
};

LevelController.prototype.setupPuppy = function() {
	var texture = PIXI.Sprite.fromFrame("resources/Puppy Stuff/Dogsmall.png");
	this.puppy = new PuppySprite(texture);
	
	this.puppy.ddx = 0;
	this.puppy.sprite.position.x = 500;
	this.puppy.sprite.position.y = 1315;	
	
	this.bg.addChild(this.puppy.sprite);		

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