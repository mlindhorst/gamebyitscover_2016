function PuppySprite(sprite) {
	this.puppyTexture = PIXI.Texture.fromFrame("resources/Puppy Stuff/Dogsmall.png");
	this.sprite = sprite;
	
	this.speed = 3;
	this.health = 1000;
}

PuppySprite.prototype.update = function(now, vx, vy) {
	this.sprite.position.x += vx * this.speed;
	this.sprite.position.y += vy * this.speed;
}

PuppySprite.prototype.damage = function(damage) {
	this.health -= damage;
	if(this.health < 0) {
		return 0;
	}
	return 1;
}

PuppySprite.prototype.getCenterX = function() {
	return this.sprite.position.x + (this.sprite.width / 2);
};

PuppySprite.prototype.getCenterY = function() {
	return this.sprite.position.y + (this.sprite.height / 2);
};