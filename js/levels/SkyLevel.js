function SkyLevel(puppy) {
	var bgTexture = PIXI.Texture.fromImage("resources/Levels/Sky/AirBG_Sky.png");
	this.bg = new BackgroundScene(
		bgTexture,
		CANVAS_WIDTH,
		CANVAS_HEIGHT,
		0,
		0
	);
	
	this.puppyStartX = 10;
	this.puppyStartY = 200;
	
	this.setupPuppy = function() {

		this.puppy = puppy
		this.puppy.ddx = 0;
		this.puppy.sprite.position.x = this.puppyStartX;
		this.puppy.sprite.position.y = this.puppyStartY;	
		this.puppy.setBehavior(PuppySprite.FLYING);
		
		this.bg.addChild(this.puppy.sprite);
		this.puppy.setupJetPack();
		this.bg.addChild(this.puppy.jetPackSprite);
	};
	
	this.setupPuppy();
	
	this.loadLevel = function() {
		
	}
	
	this.clearLevel = function() {
		
	}
	
	this.updateBackgroundAnimations = function() {
		
	}
	
	this.update = function(dt, now) {
		this.puppy.update(dt, now);
	}
}