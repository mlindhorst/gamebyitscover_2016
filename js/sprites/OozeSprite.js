var OOZE_FRAMES = 2;

function OozeSprite(x, y){
    this.sprite = PIXI.Sprite.fromFrame("resources/Levels/Water/Ooze_01.png");
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    
    this.oozeFrames = [
    	PIXI.Texture.fromFrame("resources/Levels/Water/Ooze_01.png"),
    	PIXI.Texture.fromFrame("resources/Levels/Water/Ooze_02.png")
    ];
    
    if(debug) {
    	this.graphics = new PIXI.Graphics();
    	this.graphics.lineStyle(1, 0xFF0000);	
    	this.graphics.drawRect(0, 0, this.getWidth(), this.getHeight());
    	this.sprite.addChild(this.graphics);
    }
    
    this.lastUpdate = new Date().getTime();
    this.animationSpeed = 500;
    this.frame = 0;
}

OozeSprite.prototype.update = function(dt, now) {
	if(now - this.lastUpdate > this.animationSpeed) {
		this.frame = (this.frame + 1) % OOZE_FRAMES;
		this.sprite.texture = this.oozeFrames[this.frame];
		this.lastUpdate = now;
	}
};

OozeSprite.prototype.handleCollision = function(spriteA, spriteB) {
	spriteA.damage(spriteA);
};

OozeSprite.prototype.getX = function() {
	return this.sprite.position.x + 30;
};

OozeSprite.prototype.getY = function() {
	return this.sprite.position.y - 15;
};

OozeSprite.prototype.getWidth = function() {
	return this.sprite.width - 60;
};

OozeSprite.prototype.getHeight = function() {
	return this.sprite.height - 25;
};