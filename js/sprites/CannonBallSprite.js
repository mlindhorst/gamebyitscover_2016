var CANNON_BALL_VELOCITY = 5;

function CannonBallSprite(xPos, yPos, xVel, yVel) {
	this.sprite = PIXI.Sprite.fromFrame('resources/Levels/Sky/CannonBall.png');
	this.sprite.position.x = xPos;
	this.sprite.position.y = yPos;
	this.xVel = xVel;
	this.yVel = yVel;
	this.active = false;
}

CannonBallSprite.prototype.update = function(dt, now) {
	if(!this.active) {
		//do nothing on a non active cannon ball
		return;
	}
	this.sprite.position.x += CANNON_BALL_VELOCITY * this.xVel;
	this.sprite.position.y += CANNON_BALL_VELOCITY * this.yVel;
	if(isOffScreen(this.sprite)) {
		this.active = false;
	}
}

CannonBallSprite.prototype.setup = function(xPos, yPos, xVel, yVel) {
	this.active = true;
	this.sprite.position.x = xPos;
	this.sprite.position.y = yPos;
	this.xVel = xVel;
	this.yVel = yVel;
}




