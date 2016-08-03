function OozingBarrelSprite(x, y) {
    this.sprite = PIXI.Sprite.fromFrame("resources/Levels/Water/Barrel.png");
    this.sprite.position.x = x;
	this.sprite.position.y = y;
	
	var oozeSpriteY = y - this.sprite.height - 75;
    this.oozeSprite = new OozeSprite(x, oozeSpriteY);
	this.sprite.addChild(this.oozeSprite.sprite);
	
    if(debug) {
    	this.graphics = new PIXI.Graphics();
    	this.graphics.lineStyle(1, 0xFF0000);	
    	this.graphics.drawRect(0, 0, this.getWidth(), this.getHeight());
    	this.sprite.addChild(this.graphics);
    }
}

OozingBarrelSprite.prototype.update = function(dt, now) {
	this.oozeSprite.update(dt, now);
};

OozingBarrelSprite.prototype.getX = function() {
	return this.sprite.position.x;
};

OozingBarrelSprite.prototype.getY = function() {
	return this.sprite.position.y;
};

OozingBarrelSprite.prototype.getWidth = function() {
	return this.sprite.width;
};

OozingBarrelSprite.prototype.getHeight = function() {
	return this.sprite.height;
};