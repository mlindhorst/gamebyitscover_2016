var TILE = 30,
	METER = TILE,
	GRAVITY = METER * 9.8;;
	
function PuppySprite(sprite) {
	this.puppyTexture = PIXI.Texture.fromFrame("resources/Puppy Stuff/Dogsmall.png");
	this.sprite = sprite;
	
	this.speed = 3;
	this.health = 1000;
	
	this.dx = 0;
	this.dy = 0;
	this.ddx = 0;
	this.ddy = GRAVITY;
	this.maxdx = METER * 15;
	this.maxdy = METER * 60;
	this.accel = this.maxdx / (1/2);
	this.friction = this.maxdx / (1/6);
}

PuppySprite.prototype.bound = function(x, min, max) {
    return Math.max(min, Math.min(max, x));
  }
  
PuppySprite.prototype.update = function(dt) {
	var wasleft    = this.dx  < 0,
        wasright   = this.dx  > 0,
		friction   = this.friction,
		accel = this.accel;
	
	this.ddx = 0;
	this.ddy = GRAVITY;
	//console.log(wasleft);
	//console.log(wasright);
	if(this.left)
		this.ddx = this.ddx - accel; 
	else if(wasleft)
		this.ddx = this.ddx + friction;
	
	if(this.right)
		this.ddx = this.ddx + accel; 
	else if(wasright)
		this.ddx = this.ddx - friction;
	this.sprite.position.x = Math.floor(this.sprite.position.x + (dt * this.dx));
	this.sprite.position.y = Math.floor(this.sprite.position.y  + (dt * this.dy));
	this.dy = this.bound(this.dy + (dt * this.ddy), -this.maxdy, this.maxdy);
	this.dx = this.bound(this.dx + (dt * this.ddx), -this.maxdx, this.maxdx);
	if ((wasleft  && (this.dx > 0)) ||
        (wasright && (this.dx < 0))) {
			console.log("Stop moving");
      this.dx = 0; // clamp at zero to prevent friction from making us jiggle side to side
    }
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