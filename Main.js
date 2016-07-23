interactive = true;
playing = true;

var stage;
var renderer;
var vx = 0;
var vy = 0;

var fps  = 60,
    step = 1/fps;
	
Main.SCROLL_SPEED = 5;

function Main() {
	this.renderer = PIXI.autoDetectRenderer(
		500,
		500,
		{view:document.getElementById("game-canvas")}
	);	
	this.renderer.backgroundColor = 0xdd0000;
	renderer = this.renderer;
	document.body.appendChild(this.renderer.view);
	this.stage = new PIXI.Container();
	stage = this.stage;
	
	var description = 'The Brave Little Puppy is the story of a cyborg puppy who escapes from an animal testing facility. He\'s on a journey to find his long-lost owner and rid the world of iCorp\s abominations.\r\n \r\n' 
	+ 'How to play:\r\n'
	+ '- left & right keys make puppy move\r\n'
	+ '- up key makes puppy jump\r\n'
	+ '- space activates puppy\'s laser eyes\r\n'
	+ '- \'e\' key makes puppy do special power\r\n \r\n \r\n'
	+ 'Love, \r\n Bunnies Are Always Adorable';
	var descriptionText = new PIXI.Text(description,{font : '24px Courier', fill : 0x000000, align : 'center', wordWrap : 'true', wordWrapWidth : '500'});
	this.stage.addChild(descriptionText);
	renderer.render(stage);
	
	this.loadSpriteSheet();
}

Main.prototype.animate = function() {

	if(playing) {
		var now = new Date().getTime();		
		//this.gameController.moveViewportXBy(now, Main.SCROLL_SPEED);
		//this.gameController.moveViewportYBy(now, 2);		
	}
	this.gameController.update(step);		
	
	renderer.render(stage);
	requestAnimationFrame(Main.prototype.animate.bind(this));
};


  
Main.prototype.loadSpriteSheet = function() {
	loader = PIXI.loader;
	
	// Puppy
	loader.add('puppy', "resources/Puppy Stuff/Dogsmall.png");
	loader.add('bone', "resources/Puppy Stuff/Bone.png");
	loader.add('boneWithGlow', "resources/Puppy Stuff/BoneWithGlow.png");
	
	// Level 1 - Factory	
	loader.add('facilitybg', "resources/Levels/Facility/FacilityBG.png");
	loader.add('facilityfanblades', "resources/Levels/Facility/Fan_Blades.png");
	loader.add('facilityfancover', "resources/Levels/Facility/Fan_Cover.png");
	
	loader.once('complete', this.spriteSheetLoaded);
	loader.load();
};

Main.prototype.spriteSheetLoaded = function() {
	this.gameController = new GameController(stage);	
	requestAnimationFrame(Main.prototype.animate.bind(this));
};