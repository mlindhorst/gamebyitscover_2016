var TILE = 30,
	METER = TILE,
	GRAVITY = METER * 9.8,
	MAXDX = METER * 20,
	MAXDY = METER * 60;
	
function LevelController(stage) {	
	this.stage = stage;
	this.levels = [new FactoryLevel()];
	
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
	this.puppy.sprite.position.x = 10;
	this.puppy.sprite.position.y = 300;	
	
	this.bg.addChild(this.puppy.sprite);		

};
  
isIntersecting = function(r1, r2) {

	return !(r2.x > (r1.x + r1.width) || 

           (r2.x + r2.width) < r1.x || 

           r2.y > (r1.y + r1.height) ||

           (r2.y + r2.height) < r1.y);

};

LevelController.prototype.checkCollision = function(dt) {
	if(isIntersecting(this.puppy.sprite, this.currentLevel.startFloorPiece)) {
		this.puppy.sprite.y = this.puppy.sprite.y;
		this.puppy.velY = 0;
		this.puppy.falling = false;
		this.puppy.jumping = false;
	}	
};