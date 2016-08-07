var TILE = 30,
	METER = TILE,
	GRAVITY = METER * 9.8,
	MAXDX = METER * 20,
	MAXDY = METER * 60,
	MAX_LAZERS = 20;
	TREATS = 3;
	
function LevelController(stage) {	
	this.stage = stage;
	//TODO: if we instantiate all levels here we instantiate everything at once
	// we may want to instantiate only one level at a time
	var texture = PIXI.Sprite.fromFrame("resources/Puppy Stuff/Dogsmall.png");
	this.puppy = new PuppySprite(texture);
	this.lazerBeamSpritePool = new LazerBeamSpritePool();
	this.onScreenLazerBeams = [];
	this.setUpLazerBeams();
	
	this.setupBG(new FactoryLevel(this.puppy, this));	
}

LevelController.prototype.setUpLazerBeams = function() {
	for(var i = 0; i < MAX_LAZERS; i++) {
		this.onScreenLazerBeams.push(new LazerBeam());
	}
}
	
LevelController.prototype.nextLevelCollisionHandler = function(levelname){
	if(levelname == "FactoryLevel"){
		clearTextureCache("factory");
		this.setupBG(new MountainLevel(this.puppy, this));
	}
	else if(levelname == "MountainLevel"){
		clearTextureCache("mountain");
		this.setupBG(new SkyLevel(this.puppy, this));
	}
	else if(levelname == "SkyLevel"){
		clearTextureCache("sky");
		this.setupBG(new WaterLevel(this.puppy, this));
	}
	else if(levelname == "WaterLevel"){	
		clearTextureCache("water");	
		this.setupBG(new CityLevel(this.puppy, this));
	}
	else if(levelname == "CityLevel"){
		clearTextureCache("city");	
		this.setupBG(new EndLevel(this.puppy, this));
	}
};

LevelController.prototype.resetLevel = function() {
	this.stage.removeChild(this.bg);
	this.bg.removeChild(this.currentLevel.puppy.sprite);
	this.currentLevel.clearLevel();
	
	this.setupBG(this.currentLevel);
	this.currentLevel.setupPuppy();
}

LevelController.prototype.clearStage = function(){
	while(this.stage.children.length > 0){   
		var child = this.stage.getChildAt(0);  
		this.stage.removeChild(child);
	}
}

LevelController.prototype.setupBG = function(level) {
	if(this.bg != null)
		this.stage.removeChild(this.currentLevel.bg);
	this.currentLevel = level;
	this.bg = this.currentLevel.bg;
	this.stage.addChild(this.bg);	
	this.currentLevel.loadLevel();
	this.setupTreatHUD();
};

LevelController.prototype.setupTreatHUD = function (){	
	this.treatSprite = PIXI.Sprite.fromFrame("resources/Puppy Stuff/BoneWithGlow.png");
	this.treatSprite.position.x = 5;
	this.treatSprite.position.y = 0;
	
	this.previousTreatNumber = 3;
	var number = "x" + TREATS;
	this.treatNumber = new PIXI.Text(number,{fill : 0x000000, align : 'center', font : '30px Arial'});
	this.treatNumber.position.x = 75;
	this.treatNumber.position.y = 5;
	this.accent = new PIXI.Text(number,{fill : 0xffffff, align : 'center', font : '30px Arial'});
	this.accent.position.x = 77;
	this.accent.position.y = 6;
	
	this.stage.addChild(this.treatSprite);
	this.stage.addChild(this.accent);
	this.stage.addChild(this.treatNumber);
}

LevelController.prototype.updateLevel = function(dt, now) {
	if(this.shootLazers)
	{
		for(var i = 0; i < this.onScreenLazerBeams.length; i++)
		{
			if(this.onScreenLazerBeams[i].graphics == null)
			{
				var currentLazer = this.onScreenLazerBeams[i];
				var sprite = this.lazerBeamSpritePool.borrowLazerBeams();		
				var xAxisAdjust = -this.puppy.getWidth() * 2;
				if(this.puppy.facingRight)
					xAxisAdjust = -this.puppy.getWidth();
				currentLazer.setStartPosition(this.puppy.sprite.position.x + this.puppy.sprite.width + xAxisAdjust, 
										   this.puppy.sprite.position.y + (this.puppy.sprite.height / 2) -20, sprite, this.puppy.facingRight);
				
				this.currentLevel.bg.addChild(currentLazer.graphics);
				this.shootLazers = false;
				break;
			}
		}
		
	}
	
	for(var i = 0; i < this.onScreenLazerBeams.length; i++)
	{
		var currentLazer = this.onScreenLazerBeams[i];
		currentLazer.update();
		if(currentLazer.removeLazer) {				
			this.removeLazer(currentLazer, i)
		}
		if(currentLazer.sprite != null) {
			for(var j = 0; j < this.currentLevel.clippableObjects.length; j++) {
				var clippable = this.currentLevel.clippableObjects[j];
				doCollision(clippable, currentLazer.sprite);
				if(clippable.destroy){
					this.currentLevel.bg.removeChild(clippable.graphics);
					this.currentLevel.bg.removeChild(clippable.sprite);
					this.currentLevel.clippableObjects.splice(j,1);
				}
			}
		}
	}
	
	if(this.lazerBeamSpritePool.lazerBeams.length  == 0){
		for(var i = 0; i < this.onScreenLazerBeams.length; i++){
			this.removeLazer(this.onScreenLazerBeams[i], i)
		}
	}
	
	// Handle treat increase/decrease
	if(TREATS != 0 && TREATS != this.previousTreatNumber)	{
		this.stage.removeChild(this.treatSprite);
		this.stage.removeChild(this.accent);
		this.stage.removeChild(this.treatNumber);
		this.setupTreatHUD();
	}
	
	// Handle puppy death D:
	if(TREATS <= 0) {		
		this.stage.removeChild(this.treatSprite);
		this.stage.removeChild(this.accent);
		this.stage.removeChild(this.treatNumber);
		this.gameOver();
	}
	
	this.currentLevel.update(dt, now);
	//this.currentLevel.updateBackgroundAnimations();	
};
  
 LevelController.prototype.removeLazer = function(lazer, i) {
	lazer.removeLazer = false;				
	if(lazer.sprite == null) return;
	this.currentLevel.bg.removeChild(lazer.graphics);
	this.lazerBeamSpritePool.returnLazerBeams(lazer.sprite);
	this.onScreenLazerBeams[i].sprite = null;
	this.onScreenLazerBeams[i].graphics = null;
 }
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

LevelController.prototype.gameOver = function(){
	this.currentLevel.clearLevel();
	this.clearStage();
	
	renderer.backgroundColor = 0xdd0000;
	var description = 'The Brave Little Puppy continues to be brave up in puppy heaven...\r\n \r\n' 
	+ 'Try again?\r\n'
	+ 'Refresh - or - F5 Key';
	var descriptionText = new PIXI.Text(description,{font : '24px Courier', fill : 0x000000, align : 'center', wordWrap : 'true', wordWrapWidth : '800'});
	this.stage.addChild(descriptionText);
}

LevelController.prototype.addTreat = function() {
	TREATS += 1;
};

LevelController.prototype.removeTreat = function() {
	TREATS -= 1;
};