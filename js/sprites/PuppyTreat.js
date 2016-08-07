function PuppyTreat(xPos, yPos, controller){
	this.controller = controller;
	this.sprite = PIXI.Sprite.fromFrame("resources/Puppy Stuff/Bone.png");
	this.sprite.position.x = xPos;
	this.sprite.position.y = yPos;
	
	this.graphics = new PIXI.Graphics();
	this.graphics.isEllipse = false;
	
	if(debug) {
		this.graphics.lineStyle(1, 0xFF0000);	
	}
	this.graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);
	this.graphics.position.x = xPos;
	this.graphics.position.y = yPos;
	this.sprite.addChild(this.graphics);
}

PuppyTreat.prototype.collisionHandler = function(spriteA, spriteB) {
	spriteB.controller.addTreat();
}

PuppyTreat.prototype.getX = function() {
	return this.sprite.position.x;
}

PuppyTreat.prototype.getY = function() {
	return this.sprite.position.y;
}

PuppyTreat.prototype.getWidth = function() {
	return this.sprite.width;
}

PuppyTreat.prototype.getHeight = function() {
	return this.sprite.height;
}