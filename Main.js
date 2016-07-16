interactive = true;
var stage;
var renderer;

function Main() {
	this.renderer = PIXI.autoDetectRenderer(
		500,
		500,
		{backgroundColor : 0x1099bb}
	);	
	renderer = this.renderer;
	document.body.appendChild(this.renderer.view);
	this.stage = new PIXI.Container();
	stage = this.stage;
	
	// Keep this in here? Or move to GameController?
	this.loadSpriteSheet();
	
	// TODO: Setup key events. In different key event class?
	// TODO: Call gamecontroller to start setting up stuff and load level controller.
}

Main.prototype.animate = function() {
	renderer.render(stage);
	requestAnimationFrame(Main.prototype.animate.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
	loader = PIXI.loader;
	loader.add('puppy', "resources/puppytemp.png");
	loader.once('complete', this.spriteSheetLoaded);
	loader.load();
};

// TODO: Fix this. spriteSheetLoaded requires local variables because when it's called, its parent (accessed by the "this" keyword) is the PIXI.loader, which messes everything up.
Main.prototype.spriteSheetLoaded = function() {
	this.gamecontroller = new GameController(stage);	
	requestAnimationFrame(Main.prototype.animate.bind(this));
};