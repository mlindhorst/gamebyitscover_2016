interactive = true;
var stage;

function Main() {
	
	this.stage = new PIXI.Stage(0x1D163B, interactive);
	stage = this.stage; //assign global
	this.renderer = PIXI.autoDetectRenderer(
		800,
		600,
		{view:document.getElementById("game-canvas")}
	);
}