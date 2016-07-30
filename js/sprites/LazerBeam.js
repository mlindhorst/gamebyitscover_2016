var START_X = 800;

function LazerBeam() {	
	this.removeLazer = false;
	
};

LazerBeam.prototype.setStartPosition = function(xPos, yPos, sprite) {
	this.sprite = sprite;
	this.graphics = sprite.graphics;
	this.startX = xPos;
	this.x = xPos;
	this.y = yPos;
	this.graphics.position.x = xPos;
	this.graphics.position.y = yPos;
};

LazerBeam.prototype.update = function(dt, now) {
	if(this.graphics == null) return;
	this.graphics.position.x++;
	if(this.graphics.position.x > this.startX + 30)
		this.removeLazer = true;
};

function LazerBeamSprite() {
	this.graphics = new PIXI.Graphics();
	this.graphics.lineStyle(1, 0xFF0000);
	this.graphics.beginFill(0xFF0000);
	this.graphics.drawRect(0, 0, 30, 10);
}