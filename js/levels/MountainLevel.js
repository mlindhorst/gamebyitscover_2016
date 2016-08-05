function MountainLevel(puppy, LevelController) {
	this.LevelController = LevelController;
	var bgTexture = PIXI.Texture.fromImage("resources/Levels/Mountains/MountainsBG_01.png");	
	this.bg = new BackgroundScene(
		bgTexture,
		bgTexture.baseTexture.width,
		bgTexture.baseTexture.height,
		0,
		0
	);
	
	var fgTexture = PIXI.Texture.fromImage("resources/Levels/Mountains/MountainsBG_02.png");
	this.fg = new BackgroundScene(
		fgTexture,
		fgTexture.baseTexture.width,
		fgTexture.baseTexture.height,
		0,
		0
	);	
	
	this.puppyStartX = 52;
	this.puppyStartY = 1213;	
	this.setupPuppy = function() {
		
		this.puppy = puppy;
		this.puppy.ddx = 0;
		this.puppy.sprite.position.x = this.puppyStartX;
		this.puppy.sprite.position.y = this.puppyStartY;	
		
		this.bg.addChild(this.puppy.sprite);		

	};
	
	this.setupPuppyTreats = function() {
		this.puppyTreats = [
				new PuppyTreat(50, 1950, this.LevelController),
				];
		for(var i = 0; i < this.puppyTreats.length; i++){
			this.fg.addChild(this.puppyTreats[i].sprite);
		}
	};
	
	this.setupFallingRocks = function() {
		this.fallingRocks = [				
				new FallingRockSprite(716, 2096, 800, 0),
				new FallingRockSprite(716, 2096, 800, 1),
				new FallingRockSprite(716, 2096, 800, 2),
				
				new FallingRockSprite(1385, 2096, 800, 0),
				new FallingRockSprite(1385, 2096, 800, 1),
				new FallingRockSprite(1385, 2096, 800, 2),
				];
		for(var i = 0; i < this.fallingRocks.length; i++){
			this.fg.addChild(this.fallingRocks[i].sprite);
			this.clippableObjects.push(this.fallingRocks[i])
		}
	};
	
	this.setupPuppy();
	this.setupPuppyTreats();
	
	
	this.loadLevel = function() {
		this.bg.addChild(this.fg);
		
		for(var i = 0; i < this.clippableObjects.length; i++) {
			this.bg.addChild(this.clippableObjects[i].graphics);
			if(this.clippableObjects[i].sprite != null) {
				this.bg.addChild(this.clippableObjects[i].sprite);
			}
			if(this.clippableObjects[i].graphics != null) {
				this.bg.addChild(this.clippableObjects[i].graphics);
			}
		}
	
	}
	this.boulderCollisionHandler = function(spriteA, spriteB) {		
	}
	
	this.groundCollisionHandler = function(spriteA, spriteB) {
	}	
	
	this.bottomEdge = new Collidable("bottom edge",     0,3200,  2500,  10, function(collidable1, collidable2){ if(collidable1.type == "Puppy") LevelController.resetLevel()});
	this.clippableObjects = [
		// level beginning edge
		new Collidable("cliff",   -10, 900,    10,2500, this.groundCollisionHandler),
		// beginning ground
		new Collidable("ground",    0, 1495, 1520,  10, this.groundCollisionHandler),		
		// small boulder
		new Collidable("boulder", 879, 1442,   90,  50, this.boulderCollisionHandler),
		new Collidable("boulder", 900, 1410,   50,  30, this.boulderCollisionHandler),
		// medium boulder
		new Collidable("boulder", 1040, 1370, 150, 140, this.boulderCollisionHandler),
		new Collidable("boulder", 1050, 1350, 123,  30, this.boulderCollisionHandler),
		new Collidable("boulder", 1075, 1330,  70,  15, this.boulderCollisionHandler),
		// big boulder
		new Collidable("boulder", 1275, 1360, 180, 130, this.boulderCollisionHandler),
		new Collidable("boulder", 1286, 1320, 180,  80, this.boulderCollisionHandler),
		new Collidable("boulder", 1300, 1275, 180,  50, this.boulderCollisionHandler),
		new Collidable("boulder", 1320, 1225, 150,  50, this.boulderCollisionHandler),
		new Collidable("boulder", 1340, 1175, 110,  50, this.boulderCollisionHandler),
		// first cliff
		new Collidable("cliff",  1525, 1000, 1440, 500, this.groundCollisionHandler),
		// pit bottom
		new Collidable("cliff",  2960, 1500, 300,   20, function(){LevelController.resetLevel()}),
		new Collidable("cliff",  2960, 1400, 30,   100, function(){LevelController.resetLevel()}),
		new Collidable("cliff",  2990, 1450, 20,    70, function(){LevelController.resetLevel()}),
		new Collidable("cliff",  3010, 1490, 50,    30, function(){LevelController.resetLevel()}),
		new Collidable("cliff",  3240, 1480, 20,    70, function(){LevelController.resetLevel()}),
		new Collidable("cliff",  3150, 1490, 100,   30, function(){LevelController.resetLevel()}),
		// second cliff
		new Collidable("cliff",  3250, 990,  230,  620, this.groundCollisionHandler),
		// left step
		new Collidable("cliff",  3480, 1160, 100,  100, this.groundCollisionHandler),
		// right step
		new Collidable("cliff",  3780, 1500, 200,  100, this.groundCollisionHandler),
		new Collidable("cliff",  3805, 1600, 200,  300, this.groundCollisionHandler),
		// right second step
		new Collidable("cliff",  3660, 1765, 200,  300, this.groundCollisionHandler),
		// middle ground
		new Collidable("ground",  516, 2008, 3420,  80, this.groundCollisionHandler),
		new Collidable("ground",    0, 2008,  300,  80, this.groundCollisionHandler),
		// bottom ground
		new Collidable("ground",    0, 2610,  672, 700, this.groundCollisionHandler),
		// bottom first platform
		new Collidable("ground",  928, 2610,   50, 700, this.groundCollisionHandler),
		// bottom second platform
		new Collidable("ground", 1232, 2610,   50, 700, this.groundCollisionHandler),
		// bottom third platform
		new Collidable("ground", 1532, 2610,   50, 700, this.groundCollisionHandler),
		// bottom end ground
		new Collidable("ground", 1832, 2610, 2000, 300, this.groundCollisionHandler),
		// level end edge
		new Collidable("cliff",  3950, 400,    10,3000, this.groundCollisionHandler),
		// bottom edge
		this.bottomEdge,
		new ExplodableBoulder(344, 900),
		new RatSprite(2530, 1980, 850, "right"),
		new RatSprite(2600, 1980, 800, "left"),
		new RatSprite(700, 1980, 850, "right"),
		
		new RatSprite(3188, 2580, 850, "left"),
		new RatSprite(3188, 2580, 400, "right"),
		new RatSprite(1852, 2580, 850, "right"),
		new Collidable("end", 3900, 2105, 90, 495, function() {LevelController.nextLevelCollisionHandler.apply(LevelController, ["MountainLevel"])})
		];
	
	this.setupFallingRocks();
	this.update = function(dt, now) {
		this.puppy.update(dt, now);
		for(var i = 0; i < this.clippableObjects.length; i++) {
			if(this.clippableObjects[i].update != null)
				this.clippableObjects[i].update(dt, now);
		}
		
		for(var k = 0; k < this.puppyTreats.length; k++) {
			if(doCollisionWithHandler(this.puppy, this.puppyTreats[k], this.puppyTreats[k].collisionHandler)){
				this.fg.removeChild(this.puppyTreats[k].graphics);
				this.fg.removeChild(this.puppyTreats[k].sprite);
				this.puppyTreats.splice(k, 1);
			}
		}
		
		for(var j = 0; j < this.fallingRocks.length; j++) {
			var currentRock = this.fallingRocks[j];
			currentRock.update(dt, now);
			doCollision(currentRock, this.bottomEdge)
		}
	}
	this.updateBackgroundAnimations = function() {
		
	}
	
	this.clearLevel = function() {
		this.bg.removeChild(this.fg);
		for(var i = 0; i < this.clippableObjects.length; i++) {
			this.bg.removeChild(this.clippableObjects[i].graphics);
		}
		
		for(var i = 0; i < this.puppyTreats.length; i++) {
			this.bg.removeChild(this.puppyTreats[i].graphics);
		}		
	}
	
	
	var smoke_1 = PIXI.Texture.fromImage("resources/Levels/Mountains/smokepoof_01.png");
	var smoke_2 = PIXI.Texture.fromImage("resources/Levels/Mountains/smokepoof_02.png");
	var cloud_1 = PIXI.Texture.fromImage("resources/Levels/Mountains/Cloud_01.png");
	var cloud_2 = PIXI.Texture.fromImage("resources/Levels/Mountains/Cloud_02.png");
	var cloud_3 = PIXI.Texture.fromImage("resources/Levels/Mountains/Cloud_03.png");	
	var beartrap_l = PIXI.Texture.fromImage("resources/Levels/Mountains/beartrap_left.png");
	var beartrap_r = PIXI.Texture.fromImage("resources/Levels/Mountains/beartrap_right.png");
	var beartrap_m = PIXI.Texture.fromImage("resources/Levels/Mountains/beartrap_middle.png");	
	var bh_boulder_1 = PIXI.Texture.fromImage("resources/Levels/Mountains/Boulderholder_boulder_01.png");
	var bh_rope_1 = PIXI.Texture.fromImage("resources/Levels/Mountains/Boulderholder_rope_01.png");
	var bh_treerope_1 = PIXI.Texture.fromImage( "resources/Levels/Mountains/Boulderholder_treerope_01.png");
	var bh_boulder_2 = PIXI.Texture.fromImage(  "resources/Levels/Mountains/Boulderholder_boulder_02.png");
	var bh_rope_2 = PIXI.Texture.fromImage( "resources/Levels/Mountains/Boulderholder_rope_02.png");
	var bh_treerope_2 = PIXI.Texture.fromImage( "resources/Levels/Mountains/Boulderholder_treerope_02.png");
	
	var puppyBone = PIXI.Texture.fromImage("resources/Puppy Stuff/Bone.png");
}