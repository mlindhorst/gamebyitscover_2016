function FactoryLevel() {
	var bgTexture = PIXI.Texture.fromImage("resources/Levels/Facility/FacilityBG.png");
	this.bg = new BackgroundScene(
		bgTexture,
		bgTexture.baseTexture.width,
		bgTexture.baseTexture.height,
		0,
		0,
		0.09,
		0.09
	);
	
	var fanBladeTexture = PIXI.Texture.fromImage("resources/Levels/Facility/Fan_Blades.png");
	
	var fanCover = PIXI.Texture.fromImage("resources/Levels/Facility/Fan_Cover.png");	
	
	var puppyBone = PIXI.Texture.fromImage("resources/Puppy Stuff/Bone.png");
}