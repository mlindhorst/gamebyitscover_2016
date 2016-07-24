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

Collidable.prototype.getX = function() {
	return this.graphics.position.x;
}

Collidable.prototype.getY = function() {
	return this.graphics.position.y;
}

Collidable.prototype.getWidth = function() {
	return this.graphics.width;
}

Collidable.prototype.getHeight = function() {
	return this.graphics.height;
}