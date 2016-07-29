var MAX_SHIP_HEIGHT = 100;
var MID_SHIP_OFFSET = 431;
var AFT_OFFSET = 306;

function ShipSprite(bowSprite, midSprites, aftSprite) {
	this.width = 0;
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

ShipSprite.prototype.setupContainer = function(bowSprite, midSprites, aftSprite) {
	var container = new PIXI.Container();
	var xPos = 0;
	container.addChild(aftSprite);
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
	bowSprite.position.x = xPos;
	xPos += bowSprite.width;
	this.width = xPos;
	return container;
}