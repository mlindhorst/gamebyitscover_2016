var START_X = 800;

function LazerBeam() {	
	this.removeLazer = false;
	this.goRight = true;
	
	
};

LazerBeam.prototype.setStartPosition = function(xPos, yPos, sprite, goRight) {
	this.sprite = sprite;
	this.goRight = goRight;
	if(sprite == null) {
		console.log("NULL!")
		return;
	}
	this.graphics = sprite.graphics;
	this.startX = xPos;
	this.x = xPos;
	this.y = yPos;
	this.graphics.position.x = xPos;
	this.graphics.position.y = yPos;
};

LazerBeam.prototype.update = function(dt, now) {
	if(this.graphics == null) return;
	if(this.goRight)
		this.graphics.position.x+=10;
	else
		this.graphics.position.x-=10;
	if(this.graphics.position.x > this.startX + 100)
		this.removeLazer = true;
};

LazerBeam.prototype.getX = function() {
	return this.graphics.position.x;
}

LazerBeam.prototype.getY = function() {
	return this.graphics.position.y;
}

LazerBeam.prototype.getWidth = function() {
	return this.graphics.width;
}

LazerBeam.prototype.getHeight = function() {
	return this.graphics.height;
}

function LazerBeamSprite() {
	this.graphics = new PIXI.Graphics();
	this.graphics.lineStyle(1, 0xFF0000);
	this.graphics.beginFill(0xFF0000);
	this.graphics.drawRect(0, 0, 30, 10);
	this.type = "puppyLazer";
}

LazerBeamSprite.prototype.getX = function() {
	return this.graphics.x;
}

LazerBeamSprite.prototype.getY = function() {
	return this.graphics.y;
}

LazerBeamSprite.prototype.getWidth = function() {
	return this.graphics.width;
}

LazerBeamSprite.prototype.getHeight = function() {
	return this.graphics.height;
}

LazerBeamSprite.prototype.collisionHandler = function(boulder, collidable) {
	console.log("lazer hit")
}
