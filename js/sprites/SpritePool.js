
/***************************************************************************************
  Use this function to borrow sprites from a preinstantiated
	Pool instead of instantiating inside the update loop
	This object manages itself - Just call the borrow to add
	a sprite to active, it will return the sprite so it can be manipulated.
	Then to return the sprite back to the pool just set the sprite.active = false;
	
	The Sprite class must be a wrapper that contains a boolean active (whether the sprite is currently active)
	
	Use onRelease as a callback method to remove the sprite from the canvas once it has been set inactive
	
	Call the update function in your update loop - it will update all the sprites in the pool automatically, instead
		of forcing you to maintain a list of active sprites within your level.
*****************************************************************************************/

/**
 * sprites is a list of sprites for the pool
 * onRelase is the call back to remove the sprite from the canvas
 */
function SpritePool(sprites, onRelease) {
	this.spriteStack = sprites;
	this.activeSprites = [];
	this.onRelease = onRelease;
} 

/**
 * Updates all the sprites in the pool
 * 	 releases all inactive sprites
 */
SpritePool.prototype.update = function(dt, now) {
	for(var i = 0; i < this.activeSprites.length; i++) {
		if(this.activeSprites[i].active) {
			this.activeSprites[i].update(dt, now);
		}
		else {
			//call onRelase - remove from background
			this.onRelease(this.activeSprites[i]);
			//release back to the pool
			console.log("activeSprites: " + this.activeSprites.length);
			this.spriteStack.push(this.activeSprites[i]);
			//remove sprite from active
			this.activeSprites.splice(i, 1);
			
		}
	}
}

/**
 *	Gets a sprite from the pool, returns null
 *		if no sprites are left
 */
SpritePool.prototype.borrow = function() {
	if(this.spriteStack.length != 0) {
		var sprite = this.spriteStack.pop();
		sprite.active = true;
		this.activeSprites.push(sprite);
		return sprite;
	}
	if(debug) {
		console.log("Unable to get sprite from pool - pool is empty");
	}
	return null;
}