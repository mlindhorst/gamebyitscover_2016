var CANNON_BALL_VELOCITY = 5;

function ExplodableBoulder(xPos, yPos) {
	this.graphics = PIXI.Sprite.fromFrame("resources/Levels/Mountains/largeboulder.png");
	this.graphics.position.x = xPos;
	this.graphics.position.y = yPos;
	this.destroy = false;
}

ExplodableBoulder.prototype.update = function(dt, now) {
	if(this.destroy)
		this.graphics = null;
}

ExplodableBoulder.prototype.getX = function() {
	return this.graphics.x;
}

ExplodableBoulder.prototype.getY = function() {
	return this.graphics.y;
}

ExplodableBoulder.prototype.getWidth = function() {
	return this.graphics.width;
}

ExplodableBoulder.prototype.getHeight = function() {
	return this.graphics.height;
}

ExplodableBoulder.prototype.collisionHandler = function(boulder, collidable) {
	if(collidable.type == "puppyLazer" ){
		console.log("lazer hit")
		this.destroy = true;
	}
}






