function WaterLevel() {
	var bgTexture = PIXI.Texture.fromImage("resources/Levels/Water/WaterBG_Water.png");
	this.bg = new BackgroundScene(
		bgTexture,
		bgTexture.baseTexture.width,
		bgTexture.baseTexture.height,
		0,
		0,
		0.09,
		0.09
	);
	
	var fgTexture = PIXI.Texture.fromImage("resources/Levels/Water/WaterBG_Foreground.png");
	this.fg = new BackgroundScene(
		fgTexture,
		fgTexture.baseTexture.width,
		fgTexture.baseTexture.height,
		0,
		0,
		0.09,
		0.09
	);
	
	var barrel = PIXI.Texture.fromImage("resources/Levels/Water/Barrel.png");
	var bubble_1 = PIXI.Texture.fromImage("resources/Levels/Water/Bubble_01.png");
	var bubble_2 = PIXI.Texture.fromImage("resources/Levels/Water/Bubble_02.png");
	var fish_1 = PIXI.Texture.fromImage("resources/Levels/Water/Fish_01.png");
	var fish_2 = PIXI.Texture.fromImage("resources/Levels/Water/Fish_02.png");
	var fish_3 = PIXI.Texture.fromImage("resources/Levels/Water/Fish_03.png");
	var ooze_1 = PIXI.Texture.fromImage("resources/Levels/Water/Ooze_01.png");
	var ooze_2 = PIXI.Texture.fromImage("resources/Levels/Water/Ooze_02.png");
	var puppyBone = PIXI.Texture.fromImage("resources/Puppy Stuff/Bone.png");
}