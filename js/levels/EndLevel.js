function EndLevel(puppy, LevelController) {
	// Setup background
	this.bgFile = "resources/Levels/Hallway.png";
	var bgTexture = PIXI.Texture.fromImage(this.bgFile);	
	this.bg = new BackgroundScene(
		bgTexture,
		bgTexture.baseTexture.width,
		bgTexture.baseTexture.height,
		0,
		0
	);
	
	this.setupOwner();
		
	// Setup puppy
	this.puppy = puppy;
	this.puppyStartX = 50;
	this.puppyStartY = 300;
	
	this.setupPuppy();
		
	// Setup collidable terrain
	this.clippableObjects = [
		// Left
		new Collidable("edge", -10, 0, 10, 600, this.planeCollisionHandler),
		// Right
		new Collidable("edge", 1600, 0, 10, 600, this.planeCollisionHandler),
		// Top
		new Collidable("edge", 0, -10, 1600, 10, this.planeCollisionHandler),
		// Bottom
		new Collidable("edge", 0, 500, 1600, 10, this.planeCollisionHandler),
		// Transition
		new Collidable("end", 1111, 232, 56, 268, this.ownerCollisionHandler)	
	];
}

EndLevel.constructor = EndLevel;

EndLevel.prototype.setupOwner = function() {	
	var girlFile = "resources/Levels/City/Girl_02.png";
	var girl = PIXI.Sprite.fromFrame(girlFile);
	girl.position.x = 1111;
	girl.position.y = 232;
	
	this.bg.addChild(girl);
};

EndLevel.prototype.setupPuppy = function() {
	this.puppy.ddx = 0;
	this.puppy.sprite.position.x = this.puppyStartX;
	this.puppy.sprite.position.y = this.puppyStartY;	
	
	this.bg.addChild(this.puppy.sprite);
};

EndLevel.prototype.update = function(dt, now) {
	this.puppy.update(dt, now);
};

EndLevel.prototype.loadLevel = function() {
	for(var i = 0; i < this.clippableObjects.length; i++) {
		this.bg.addChild(this.clippableObjects[i].graphics);
	}
};

EndLevel.prototype.clearLevel = function() {
	for(var i = 0; i < this.clippableObjects.length; i++) {
		this.bg.removeChild(this.clippableObjects[i].graphics);
	}
};

EndLevel.prototype.planeCollisionHandler = function(spriteA, spriteB) {
	// TODO: Get rid of this??
	//console.log("Ground Collision");	
};

EndLevel.prototype.ownerCollisionHandler = function(spriteA, spriteB) {
	var description = 'The Brave Little Puppy has made it back to his beloved best friend and owner. He even managed to foil iCorp\'s evil machinations along the way.\r\n \r\n' 
	+ 'Thank you for playing!\r\n\r\n'
	+ 'For A Game By Its Cover Game Jam\r\n'
	+ 'Bunnies Are Always Adorable';
	var descriptionText = new PIXI.Text(description,{font : '24px Courier', fill : 0xffffff, align : 'center', wordWrap : 'true', wordWrapWidth : '800'});
	descriptionText.position.x = 20;
	descriptionText.position.y = 350;
	stage.addChild(descriptionText);
};