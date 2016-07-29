/**
 * handles collision between two sprites or collidable objects
 * Sprite A and B are the sprites to check collision, and collisionHandler is the function that handles the collision
 * collisionHandler must take the parameters spriteA and spriteB, and it should know how the handle the collision between objects.
 */
function doCollision(spriteA, spriteB) {
	if(checkIntersection(spriteA, spriteB)) {
		spriteA.collisionHandler(spriteA, spriteB);
		spriteB.collisionHandler(spriteA, spriteB);
		return true;
	}
	return false;
}

/*
 * internal function checks intersection of the two sprites.
 */ 
function checkIntersection(spriteA, spriteB) {
	
	return spriteA.getX() < spriteB.getX() + spriteB.getWidth() &&
	spriteA.getX() + spriteA.getWidth() > spriteB.getX() &&
	spriteA.getY() < spriteB.getY() + spriteB.getHeight() &&
	spriteA.getHeight() + spriteA.getY() > spriteB.getY();
	
	
}