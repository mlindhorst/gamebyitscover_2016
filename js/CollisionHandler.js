/**
 * handles collision between two sprites or collidable objects
 * Sprite A and B are the sprites to check collision, and collisionHandler is the function that handles the collision
 * collisionHandler must take the parameters spriteA and spriteB, and it should know how the handle the collision between objects.
 */
function doCollision(spriteA, spriteB) {
	if((spriteA.type == "end" && spriteB.type == "puppyLazer") || (spriteB.type == "end" && spriteA.type == "puppyLazer"))
		return;
	if(checkIntersection(spriteA, spriteB)) {
		spriteA.collisionHandler(spriteA, spriteB);
		spriteB.collisionHandler(spriteA, spriteB);
		return true;
	}
	return false;
}

function doCollisionWithHandler(spriteA, spriteB, collisionHandler) {
	if(checkIntersection(spriteA, spriteB)) {
		collisionHandler(spriteA, spriteB);
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

function isOffScreen(sprite) {
	if(sprite.position.x < -sprite.width || sprite.position.x > screenWidth) {
		return true;
	}
	if(sprite.position.y < -sprite.height || sprite.position.y > screenHeight) {
		return true;
	}
	return false;
}