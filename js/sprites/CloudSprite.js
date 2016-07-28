var START_X = 800;

function CloudSprite(sprite, yPos, speed) {
	this.sprite = sprite;
	this.sprite.position.x = START_X;
	this.sprite.position.y = yPos;
	this.speed = speed;
}

CloudSprite.prototype.update = function(dt, now) {
	this.sprite.position.x -= this.speed;
	
	if(this.sprite.position.x <= -this.sprite.width) {
		this.sprite.position.x = START_X;
	}
}