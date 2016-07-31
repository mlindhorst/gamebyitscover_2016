var MAX_SHIP_HEIGHT = 100;
var MID_SHIP_OFFSET = 431;
var AFT_OFFSET = 306;

function ShipSprite(bowSprite, midSprites, aftSprite) {
	this.width = 0;
	
	this.bowCollider = null;
	this.bowCollder2 = null;
	this.aftCollider = null;
	this.aftCollider2 = null;
	
	this.shipContainer = this.setupContainer(bowSprite, midSprites, aftSprite);
	this.bowSprite = bowSprite;
	this.midSprites = midSprites;
	this.aftSprite = aftSprite;
	
	this.shipContainer.position.x = -this.width;
	this.shipContainer.position.y = screenHeight;
}

ShipSprite.prototype.update = function(dt, now) {
	
	if(this.shipContainer.position.y > MAX_SHIP_HEIGHT) {
		this.shipContainer.position.y -= 1;
	}
	this.shipContainer.position.x += 1;
	
	if(this.shipContainer.position.x > screenWidth) {
		this.shipContainer.position.x = -this.width;
		this.shipContainer.position.y = screenHeight;
	}
	
	//update midShipSprites
	for(var i = 0; i < this.midSprites.length; i++) {
		this.midSprites[i].update(dt, now);
	}
	
	if(debug) {
		//console.log("Ship position: " + this.shipContainer.position.x + ", " + this.shipContainer.position.y);
	}
}

ShipSprite.prototype.onCollision = function(spriteA, spriteB) {
	//console.log("IS THERE ANYBODY OUT THERE?");
}

ShipSprite.prototype.setupContainer = function(bowSprite, midSprites, aftSprite) {
	var container = new PIXI.Container();
	var xPos = 0;
	this.aftCollider = new ShipCollider(35, AFT_OFFSET, 263, 100, this.onCollision);
	this.aftCollider2 = new ShipCollider(300, AFT_OFFSET + 50, 100, 60, this.onCollision);
	container.addChild(aftSprite);
	container.addChild(this.aftCollider2.graphics);
	container.addChild(this.aftCollider.graphics);
	aftSprite.position.x = xPos;
	aftSprite.position.y = AFT_OFFSET;
	xPos = aftSprite.width;
	
	for(var i = 0; i < midSprites.length; i++) {
		container.addChild(midSprites[i].midShipContainer);
		midSprites[i].midShipContainer.position.x = xPos;
		midSprites[i].midShipContainer.position.y = MID_SHIP_OFFSET - 61;
		xPos += midSprites[i].midShipContainer.width;
	}

	container.addChild(bowSprite);
	this.bowCollider = new ShipCollider(xPos, 330, bowSprite.width * .65, bowSprite.height, this.onCollision);
	container.addChild(this.bowCollider.graphics);
	this.bowCollider2 = new ShipCollider(xPos + 465, 255, 328, 68, this.onCollision);
	container.addChild(this.bowCollider2.graphics);
	bowSprite.position.x = xPos;
	xPos += bowSprite.width;
	this.width = xPos;
	return container;
}