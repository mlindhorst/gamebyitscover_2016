function BackgroundScene(texture, width, height, startX, startY, deltax, deltay) {
	PIXI.Sprite.call(this, texture, width, height);

	this.position.x = startX;
	this.position.y = startY;

	this.viewportX = 0;
	this.viewportY = 0;
	this.deltax = deltax;
	this.deltay = deltay;
	
	this.speed = 5;
	this.width = texture.baseTexture.width;
	this.height = texture.baseTexture.height;
}

BackgroundScene.constructor = BackgroundScene;
BackgroundScene.prototype = Object.create(PIXI.Sprite.prototype);

BackgroundScene.prototype.setViewportX = function(newViewportX) {
	var distanceTravelledX = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.position.x -= (distanceTravelledX * this.deltax);
};

BackgroundScene.prototype.setViewportY = function(newViewportY) {
	var distanceTravelledY = newViewportY - this.viewportY;
	this.viewportY = newViewportY;
	this.position.y -= (distanceTravelledY * this.deltay);
};

BackgroundScene.prototype.isOffScreen = function() {
	var offScreen = false;
	if(this.position.x + this.width > sWidth || this.position.x < 0) {
		offScreen = true;
	}	
	if(this.position.y + this.height > sHeight || this.position.y < 0) {
		offScreen = true;
	}
	
	return offScreen;
};