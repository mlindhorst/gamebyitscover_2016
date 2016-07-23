function MountainLevel() {
	var bgTexture = PIXI.Texture.fromImage("resources/Levels/Mountains/MountainsBG_01.png");	
	this.bg = new BackgroundScene(
		bgTexture,
		bgTexture.baseTexture.width,
		bgTexture.baseTexture.height,
		0,
		0,
		0.09,
		0.09
	);
	
	var fgTexture = PIXI.Texture.fromImage("resources/Levels/Mountains/MountainsBG_02.png");
	this.fg = new BackgroundScene(
		fgTexture,
		fgTexture.baseTexture.width,
		fgTexture.baseTexture.height,
		0,
		0,
		0.09,
		0.09
	);
	this.bg.addChild(this.fg);
	
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
	
	this.environmentCollidables = [
		// beginning ground
		createRectCollidable(0,1495,1520, 10, this.bg),
		// cliff left edge
		createRectCollidable(1535,1000,10, 500, this.bg),
		createRectCollidable(870, 1410, 90, 80, this.bg)
		];
	
	
	
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