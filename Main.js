interactive = true;
var stage;

function Main() {
	this.renderer = PIXI.autoDetectRenderer(
		500,
		500,
		{backgroundColor : 0x1099bb}
	);
	
	document.body.appendChild(this.renderer.view);
	this.stage = new PIXI.Container();
	stage = this.stage; //assign global
	
	// Keep this in here?
	//this.loadSpriteSheet();
	
	// TODO: Setup key events. In different key event class?
	// TODO: Call gamecontroller to start setting up stuff and load level controller.
}

Main.prototype.loadSpriteSheet = function() {
	loader = PIXI.loader;
	loader.add('puppy', "resources/puppytemp.png");
	loader.onComplete = this.spriteSheetLoaded.bind(this);
	loader.load();
};

Main.prototype.spriteSheetLoaded = function() {
	this.gamecontroller = new GameController(this.stage);	
	requestAnimFrame(this.update.bind(this));
};

Main.prototype.update = function() {
	this.renderer.render(this.stage);
	requestAnimFrame(this.update.bind(this));
};