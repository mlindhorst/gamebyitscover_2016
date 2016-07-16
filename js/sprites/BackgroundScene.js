sWidth = 7400;
sHeight = 1500;

function BackgroundScene(texture, width, height, startX, startY, deltax) {
	PIXI.Sprite.call(this, texture, width, height);

	this.position.x = startX;
	this.position.y = startY;

	this.viewportX = 0;
	this.deltax = deltax;
	
	this.speed = 5;
	this.width = width;
	this.height = height;
}

BackgroundScene.constructor = BackgroundScene;
BackgroundScene.prototype = Object.create(PIXI.Sprite.prototype);

BackgroundScene.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.position.x -= (distanceTravelled * this.deltax);
};

BackgroundScene.prototype.moveObject = function() {
	if(this.isOffScreen())
		this.speed *= -1;
	this.position.x += this.speed;
};

BackgroundScene.prototype.isOffScreen = function() {
	if(this.position.x + this.width > sWidth || this.position.x < 0) {
		return true;
	}	
};