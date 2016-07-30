function LazerBeamSpritePool() {
	this.createLazerBeams();
}

LazerBeamSpritePool.prototype.borrowLazerBeams = function() {
	return this.lazerBeams.shift();
};

LazerBeamSpritePool.prototype.returnLazerBeams = function(sprite) {
	this.lazerBeams.push(sprite);
};

LazerBeamSpritePool.prototype.createLazerBeams = function() {
	this.lazerBeams = [];
	this.addLazerBeam(20, "resources/KB_Laserbullets_Red.png");
};

LazerBeamSpritePool.prototype.addLazerBeam= function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var lazer = new LazerBeamSprite();
		this.lazerBeams.push(lazer);
	}
};
