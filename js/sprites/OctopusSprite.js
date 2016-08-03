var OCTOPUS_FRAMES = 6,
	X_RANGE = 250;

function OctopusSprite(){
    this.sprite = PIXI.Sprite.fromFrame("resources/Enemies/Octopus/OctopusCycle_01.png");
	
	if(debug) {
		this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(1, 0xFF0000);	
		this.graphics.drawRect(0, 0, this.getWidth(), this.getHeight());
		this.sprite.addChild(this.graphics);
	}
 	
	this.octopusFrames = [
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_01.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_02.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_03.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_04.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_05.png"),
		PIXI.Texture.fromFrame("resources/Enemies/Octopus/OctopusCycle_06.png")
	];
	
	this.damage = 10;
	this.speed = 5;
	this.lastUpdate = new Date().getTime();
	this.animationSpeed = 250;
	this.frame = 0;
}

OctopusSprite.prototype.setup = function(xPos, yPos) {
	this.originalXPos = xPos;
	this.originalYPos = yPos;
	this.sprite.position.x = xPos;
	this.sprite.position.y = yPos;
};

var moveRight = true;
OctopusSprite.prototype.update = function(dt, now) {
	if(this.sprite.position.x == (this.originalXPos + X_RANGE)){
		moveRight = false;
	}
	else if(this.sprite.position.x == (this.originalXPos - X_RANGE)){
		moveRight = true;
	}
	if( moveRight){
		this.sprite.position.x++;
	}
	else{
		this.sprite.position.x--;
	}
	if(now - this.lastUpdate > this.animationSpeed) {
		this.frame = (this.frame + 1) % OCTOPUS_FRAMES;
		this.sprite.texture = this.octopusFrames[this.frame];
		this.lastUpdate = now;
	}
};

OctopusSprite.prototype.handleCollision = function(spriteA, spriteB) {
	spriteA.damage(spriteA);
};

OctopusSprite.prototype.getX = function() {
	return this.sprite.position.x;
};

OctopusSprite.prototype.getY = function() {
	return this.sprite.position.y;
};

OctopusSprite.prototype.getWidth = function() {
	return this.sprite.width;
};

OctopusSprite.prototype.getHeight = function() {
	return this.sprite.height;
};