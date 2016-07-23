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
	this.renderer.backgroundColor = 0x1099bb;
	renderer = this.renderer;
	document.body.appendChild(this.renderer.view);
	this.stage = new PIXI.Container();
	stage = this.stage;
	
	var loadingText = new PIXI.Text('Loading...',{font : '24px Arial', fill : 0x000000, align : 'center'});
	this.stage.addChild(loadingText);
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