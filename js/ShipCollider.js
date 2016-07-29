function ShipCollider(x, y, width, height, collisionHandler) {
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

ShipCollider.prototype.getX = function() {
	return this.graphics.parent.position.x + this.graphics.position.x;
}

ShipCollider.prototype.getY = function() {
	return this.graphics.parent.position.y + this.graphics.position.y;
}

ShipCollider.prototype.getWidth = function() {
	return this.graphics.width;
}

ShipCollider.prototype.getHeight = function() {
	return this.graphics.height;
}