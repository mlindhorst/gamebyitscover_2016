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
		0
	);
	
	this.setupFans();
	
	this.environmentCollidables = [];
	
	this.backgroundElements = [['facilityfanblades', "resources/Levels/Facility/Fan_Blades.png"],
							   ['facilityfancover', "resources/Levels/Facility/Fan_Cover.png"]];
}

FactoryLevel.constructor = FactoryLevel;

FactoryLevel.prototype.setupFans = function() {	
	var fanBladesFile = "resources/Levels/Facility/Fan_Blades.png";
	this.fanBlades1 = PIXI.Sprite.fromFrame(fanBladesFile);	
	this.fanBlades1.anchor.x = 0.49;
	this.fanBlades1.anchor.y = 0.5;
	this.fanBlades1.position.x = 2400;
	this.fanBlades1.position.y = 500;
	
	this.fanBlades2 = PIXI.Sprite.fromFrame(fanBladesFile);	
	this.fanBlades2.anchor.x = 0.49;
	this.fanBlades2.anchor.y = 0.5;
	this.fanBlades2.position.x = 3500;
	this.fanBlades2.position.y = 500;
	
	var fanCoverFile = "resources/Levels/Facility/Fan_Cover.png";
	var fanCover1 = PIXI.Sprite.fromFrame(fanCoverFile);	
	fanCover1.anchor.x = 0.49;
	fanCover1.anchor.y = 0.5;	
	fanCover1.position.x = 2400;
	fanCover1.position.y = 500;
	
	var fanCover2 = PIXI.Sprite.fromFrame(fanCoverFile);	
	fanCover2.anchor.x = 0.49;
	fanCover2.anchor.y = 0.5;	
	fanCover2.position.x = 3500;
	fanCover2.position.y = 500;
	
	this.bg.addChild(this.fanBlades1);
	this.bg.addChild(fanCover1);
	this.bg.addChild(this.fanBlades2);
	this.bg.addChild(fanCover2);
};

FactoryLevel.prototype.updateBackgroundAnimations = function() {	
	this.fanBlades1.rotation += 0.1;
	this.fanBlades2.rotation -= 0.1;
};