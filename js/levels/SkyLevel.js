var SHIP1_SECTION_COUNT = 10;

function SkyLevel(puppy) {
	
	this.clippableObjects = [];
	
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

	};
	
	this.setupPuppy();
	
	this.cloudSprites = [
		new CloudSprite(PIXI.Sprite.fromFrame("resources/Levels/Mountains/Cloud_01.png"), -200, 1),
		new CloudSprite(PIXI.Sprite.fromFrame("resources/Levels/Mountains/Cloud_02.png"), 400, 1),
		new CloudSprite(PIXI.Sprite.fromFrame("resources/Levels/Mountains/Cloud_03.png"), 200, 1)
	];
		
	var midSections = [];
	for(var i = 0; i < SHIP1_SECTION_COUNT; i++) {
		var section = new MidShipSprite(PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Mid.png'), MidShipSprite.CANNON);
		midSections.push(section);
		this.clippableObjects.push(section);
	}
	
	this.shipSprites = [
		new ShipSprite(
			PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Front.png'),
			midSections,
			PIXI.Sprite.fromFrame('resources/Levels/Sky/Ship_Back.png')
		)
	];
	
	
	this.loadLevel = function() {
		for(var i = 0; i < this.cloudSprites.length; i++) {
			this.bg.addChild(this.cloudSprites[i].sprite);
		}
		for(var i = 0; i < this.shipSprites.length; i++) {
			this.bg.addChild(this.shipSprites[i].shipContainer);
		}
		moveViewPort = false;
	}
	
	this.clearLevel = function() {
		
		moveViewPort = true;
	}
	
	this.updateBackgroundAnimations = function() {
		
	}
	
	this.update = function(dt, now) {
		this.puppy.update(dt, now);
		for(var i = 0; i < this.cloudSprites.length; i++) {
			this.cloudSprites[i].update(dt, now);
		}
		for(var i = 0; i < this.shipSprites.length; i++) {
			this.shipSprites[i].update(dt, now);
		}
	}
}