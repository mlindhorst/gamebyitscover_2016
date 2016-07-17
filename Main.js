interactive = true;
playing = true;

var stage;
var renderer;
var vx = 0;
var vy = 0;

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
	
	// Keep this in here? Or move to GameController?
	this.loadSpriteSheet();
	
	// TODO: Setup key events. In different key event class?
	this.keyEventListenerLoaded();
	// TODO: Call gamecontroller to start setting up stuff and load level controller.
}

Main.prototype.animate = function() {
	if(playing) {
		var now = new Date().getTime();		
		this.gameController.moveViewportXBy(now, Main.SCROLL_SPEED);
		this.gameController.moveViewportYBy(now, 2);
	}
	
	renderer.render(stage);
	requestAnimationFrame(Main.prototype.animate.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
	loader = PIXI.loader;
	
	// Puppy
	loader.add('puppy', "resources/Puppy Stuff/Dogsmall.png");
	loader.add('bone', "resources/Puppy Stuff/Bone.png");
	
	// Level 1 - Factory	
	loader.add('facilitybg', "resources/Levels/Facility/FacilityBG.png");
	loader.add('facilityfanblades', "resources/Levels/Facility/Fan_Blades.png");
	loader.add('facilityfancover', "resources/Levels/Facility/Fan_Cover.png");
	
	loader.once('complete', this.spriteSheetLoaded);
	loader.load();
};

// Currently uses callbacks for key events. Do we need to differentiate between key up and key down events?
Main.prototype.keyEventListenerLoaded = function() {
	this.keyEventListener = new KeyEventListener( Jump, MoveDown, MoveLeft, MoveRight, ShootLaser, PerformSpecialMove );
};

// TODO: Fix this. spriteSheetLoaded requires local variables because when it's called, its parent (accessed by the "this" keyword) is the PIXI.loader, which messes everything up.
Main.prototype.spriteSheetLoaded = function() {
	this.gameController = new GameController(stage);	
	requestAnimationFrame(Main.prototype.animate.bind(this));
};

function Jump() {
	console.log("jump");
	// TODO: Change the rate of change to achieve the 200 px single jump.
	vy = -1;
}

function MoveDown() {
	console.log("down");
	vy = 1;
}

function MoveLeft() {
	console.log("left");
	vx = -1;
}

function MoveRight() {
	console.log("right");
	vx = 1;
}

function ShootLaser(){
	console.log("laser");
}

function PerformSpecialMove(){
	console.log("special");
}