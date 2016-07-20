function FactoryLevel() {
	sWidth = 7210;
	sHeight = 1500;
	
	this.bgFile = "resources/Levels/Facility/FacilityBG.png";
	var bgTexture = PIXI.Texture.fromImage(this.bgFile);	
	this.bg = new BackgroundScene(
		bgTexture,
		bgTexture.baseTexture.width,
		bgTexture.baseTexture.height,
		0,
		0,
		0.09,
		0.09
	);
	
	this.backgroundElements = [['facilityfanblades', "resources/Levels/Facility/Fan_Blades.png"],
							   ['facilityfancover', "resources/Levels/Facility/Fan_Cover.png"]];
	
	this.startFloorPiece = new PIXI.Graphics();
	this.startFloorPiece.lineStyle(1, 0xFF0000);	
	this.startFloorPiece.drawRect(0, 0, 1520, 10);
	this.startFloorPiece.position.y = 493;
	this.bg.addChild(this.startFloorPiece);
	//var puppy = character;
	// create collision squares (collidable)
	//this.environmentBoxes =
	//this.explodableBoxes	
}

FactoryLevel.constructor = FactoryLevel;