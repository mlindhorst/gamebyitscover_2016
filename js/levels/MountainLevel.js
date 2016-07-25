function MountainLevel() {
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
	this.bg.addChild(this.fg);
	
	this.puppyStartX = 52;
	this.puppyStartY = 1213;
	
	function createRectCollidable(x, y, width, height, bg) {	
		var collidable = new PIXI.Graphics();
		collidable.isEllipse = false;
		collidable.lineStyle(1, 0xFF0000);	
		collidable.drawRect(0, 0, width, height);
		collidable.position.x = x;
		collidable.position.y = y;
		bg.addChild(collidable);
		return collidable;
	};
	
	function createEllipseCollidable(x, y, width, height, bg) {	
		var collidable = new PIXI.Graphics
		collidable.isEllipse = true;
		collidable.lineStyle(1, 0xFF0000);	
		collidable.drawEllipse(0, 0, width, height);
		collidable.position.x = x;
		collidable.position.y = y;
		bg.addChild(collidable);
		return collidable;
	};
	
	this.boulderCollisionHandler = function(spriteA, spriteB) {
		console.log("Rock Collision");
		//if we get here we know collision has already occurred, now just clip bounds
		if(spriteA.getY() + spriteA.getHeight() > spriteB.getY() &&
				spriteA.getY() + spriteA.getHeight() < spriteB.getY()  + spriteB.getHeight()){
			spriteA.setY(spriteB.getY() - spriteA.getHeight());
			spriteA.falling = false;
			spriteA.jumping = false;
			spriteA.velY = 0;
		}
		else if(spriteA.getX() > spriteB.getX() && spriteA.getX() < spriteB.getX() + spriteB.getWidth()) {
			
			//upper left collision detected - push to the right
			spriteA.velX = 0;
			spriteA.setX(spriteA.lastX);
		}
		else if(spriteA.getX() + spriteA.getWidth() > spriteB.getX() && spriteA.getX() + spriteA.getWidth() < spriteB.getX() + spriteB.getWidth()) {
			//upper right collision detected - push to the left
			spriteA.velX = 0;
			spriteA.setX(spriteA.lastX);
		}
		
	}
	
	this.groundCollisionHandler = function(spriteA, spriteB) {
		console.log("Ground Collision");
		spriteA.setY(spriteB.getY() - spriteA.getHeight());
		spriteA.falling = false;
		spriteA.jumping = false;
		spriteA.velY = 0;
	}
	
	this.clippableObjects = [
		// level beginning edge
		new Collidable("cliff",   -10, 900,    10, 600, this.groundCollisionHandler),
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
		new Collidable("cliff",  2960, 1500, 300,   20, this.groundCollisionHandler),
		new Collidable("cliff",  2960, 1400, 30,   100, this.groundCollisionHandler),
		new Collidable("cliff",  2990, 1450, 20,    70, this.groundCollisionHandler),
		new Collidable("cliff",  3010, 1490, 50,    30, this.groundCollisionHandler),
		new Collidable("cliff",  3240, 1480, 20,    70, this.groundCollisionHandler),
		new Collidable("cliff",  3150, 1490, 100,   30, this.groundCollisionHandler),
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
		new Collidable("ground",    0, 2610,  672, 300, this.groundCollisionHandler),
		// bottom first platform
		new Collidable("ground",  928, 2610,   50, 300, this.groundCollisionHandler),
		// bottom second platform
		new Collidable("ground", 1232, 2610,   50, 300, this.groundCollisionHandler),
		// bottom third platform
		new Collidable("ground", 1532, 2610,   50, 300, this.groundCollisionHandler),
		// bottom end ground
		new Collidable("ground", 1832, 2610, 2000, 300, this.groundCollisionHandler),
		// level end edge
		new Collidable("cliff",  3950, 900,    10,1000, this.groundCollisionHandler)
		];
	
	for(var i = 0; i < this.clippableObjects.length; i++) {
		this.bg.addChild(this.clippableObjects[i].graphics);
	}
	
	this.updateBackgroundAnimations = function() {
		
	}
	
	var fallingrock_1 = PIXI.Texture.fromImage("resources/Levels/Mountains/fallingrock_01.png");
	var fallingrock_2 = PIXI.Texture.fromImage("resources/Levels/Mountains/fallingrock_02.png");
	var fallingrock_3 = PIXI.Texture.fromImage("resources/Levels/Mountains/fallingrock_03.png");	
	var fallingrock_4 = PIXI.Texture.fromImage("resources/Levels/Mountains/fallingrock_04.png");
	var largeboulder = PIXI.Texture.fromImage("resources/Levels/Mountains/largeboulder.png");
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