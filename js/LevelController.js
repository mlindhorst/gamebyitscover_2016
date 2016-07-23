var TILE = 75,
	METER = TILE,
	GRAVITY = METER * 9.8,
	MAXDX = METER * 20,
	MAXDY = METER * 60;
	
function LevelController(stage) {	
	this.stage = stage;
	this.levels = [new FactoryLevel()];
	
	this.setupBG(0);
	this.setupPuppy();	
}

LevelController.prototype.setupBG = function(levelNumber) {
	this.currentLevel = this.levels[levelNumber]
	this.bg = this.currentLevel.bg;
	this.stage.addChild(this.bg);	
};

LevelController.prototype.setupPuppy = function() {
	var texture = PIXI.Sprite.fromFrame("resources/Puppy Stuff/Dogsmall.png");
	this.puppy = new PuppySprite(texture);
	
	this.puppy.ddx = 0;
	this.puppy.sprite.position.x = 10;
	this.puppy.sprite.position.y = 300;	
	
	this.bg.addChild(this.puppy.sprite);		
	//this.graphics = new PIXI.Graphics();
	//this.graphics.lineStyle(1, 0xFF0000);	
	//this.graphics.drawRect(0, 0, this.puppy.sprite.width, this.puppy.sprite.height);
	//this.graphics.position.x = this.puppy.sprite.position.x;
	//this.graphics.position.y = this.puppy.sprite.position.y;
	//this.stage.addChild(this.graphics);
};

var t2p      = function(t)     { return t*TILE;                  },
    p2t      = function(p)     { return Math.floor(p/TILE);      },
    cell     = function(x,y)   { return tcell(p2t(x),p2t(y));    },
    tcell    = function(tx,ty) { return cells[tx + (ty*MAP.tw)]; };
  
isIntersecting = function(r1, r2) {

return !(r2.x > (r1.x + r1.width) || 

           (r2.x + r2.width) < r1.x || 

           r2.y > (r1.y + r1.height) ||

           (r2.y + r2.height) < r1.y);

}
LevelController.prototype.checkCollision = function(dt) {
	this.puppy.update(dt);
	if(isIntersecting(this.puppy.sprite, this.currentLevel.startFloorPiece)) {
		this.puppy.sprite.y = t2p(p2t(this.puppy.sprite.y));
		this.puppy.dy = 0;
		this.puppy.ddy = 0;
	}
	var tx        = p2t(this.puppy.sprite.position.x),
        ty        = p2t(this.puppy.sprite.position.y),
        nx        = this.puppy.sprite.x%TILE,
        ny        = this.puppy.sprite.y%TILE;
        //cell      = tcell(tx,     ty),
        //cellright = tcell(tx + 1, ty),
        //celldown  = tcell(tx,     ty + 1),
        //celldiag  = tcell(tx + 1, ty + 1);
		
	//if(this.puppy.dy > 0)
	
};