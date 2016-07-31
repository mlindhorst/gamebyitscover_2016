function Collidable(type, x, y, width, height, collisionHandler) {
	this.type = type;
	this.graphics = new PIXI.Graphics();
	this.graphics.isEllipse = false;
	
	if(debug) {
		this.graphics.lineStyle(1, 0xFF0000);	
	}
	this.graphics.drawRect(0, 0, width, height);
	this.graphics.position.x = x;
	this.graphics.position.y = y;
	this.collisionHandler = collisionHandler;
}

//modified getters for x and y now work for child objects within a sprite as well.
Collidable.prototype.getX = function() {
	var xPos = this.graphics.position.x;
	var current = this.graphics;
	while(current.parent) {
		current = current.parent;
		xPos += current.position.x;
	}
	return xPos;
}

Collidable.prototype.getY = function() {
	var yPos = this.graphics.position.y;
	var current = this.graphics;
	while(current.parent) {
		current = current.parent;
		yPos += current.position.y;
	}
	return yPos;
}

Collidable.prototype.getWidth = function() {
	return this.graphics.width;
}

Collidable.prototype.getHeight = function() {
	return this.graphics.height;
}