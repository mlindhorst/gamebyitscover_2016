function GameController(stage) {
	
	this.stage = stage;
	
	var texture = PIXI.Texture.fromImage("resources/puppytemp.png");
	var puppy = new PIXI.Sprite(texture);
	
	// center the sprite's anchor point
	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	// move the sprite to the center of the screen
	bunny.position.x = 200;
	bunny.position.y = 150;

	stage.add(puppy);
}