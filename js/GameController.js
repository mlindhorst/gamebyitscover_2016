function GameController(stage) {	
	this.stage = stage;	
	
	var texture = PIXI.Texture.fromImage("resources/puppytemp.png");
	var puppy = new PIXI.Sprite(texture);
	
	// center the sprite's anchor point
	puppy.anchor.x = 0.5;
	puppy.anchor.y = 0.5;

	// move the sprite to the center of the screen
	puppy.position.x = 200;
	puppy.position.y = 150;

	this.stage.addChild(puppy);
}