interactive = true;
playing = true;

var gameController;
var stage;
var renderer;
var vx = 0;
var vy = 0;
var screenWidth = 800;
var screenHeight = 600;

var lastUpdate = 0;
var fps  = 60,
    step = 1/fps;
	
Main.SCROLL_SPEED = 5;

function Main() {
	this.renderer = PIXI.autoDetectRenderer(
		screenWidth,
		screenHeight,
		{view:document.getElementById("game-canvas")}
	);	
	this.renderer.backgroundColor = 0xdd0000;
	renderer = this.renderer;
	document.body.appendChild(this.renderer.view);
	this.stage = new PIXI.Container();
	stage = this.stage;
	
	var description = 'The Brave Little Puppy is the story of a cyborg puppy who escapes from an animal testing facility. He\'s on a journey to find his long-lost owner and rid the world of iCorp\s abominations.\r\n \r\n' 
	+ 'How to play:\r\n'
	+ '- left & right keys make puppy move\r\n'
	+ '- up key makes puppy jump\r\n'
	+ '- space activates puppy\'s laser eyes\r\n'
	+ '- \'e\' key makes puppy do special power\r\n \r\n \r\n'
	+ 'Love, \r\n Bunnies Are Always Adorable';
	var descriptionText = new PIXI.Text(description,{font : '24px Courier', fill : 0x000000, align : 'center', wordWrap : 'true', wordWrapWidth : '800'});
	this.stage.addChild(descriptionText);
	renderer.render(stage);
	
	this.loadSpriteSheet();
}

Main.prototype.animate = function() {

	var now = new Date().getTime();
	if(playing) {	
		
		//this.gameController.moveViewportXBy(now, Main.SCROLL_SPEED);
		this.gameController.setViewportY(0);	
		this.gameController.setViewportX(0);		
	}
	
	if(lastUpdate == 0 || now - lastUpdate > step) {
		this.gameController.update(step, now);
		lastUpdate = now;
	}
			
	renderer.render(stage);
	requestAnimationFrame(Main.prototype.animate.bind(this));
};


  
Main.prototype.loadSpriteSheet = function() {
	loader = PIXI.loader;
	
	// Puppy
	loader.add('puppy', "resources/Puppy Stuff/Dogsmall.png");
	loader.add('puppyWalk1', "resources/Puppy Stuff/Walk Cycle/DogWalkCycle_01.png");
	loader.add('puppyWalk2', "resources/Puppy Stuff/Walk Cycle/DogWalkCycle_02.png");
	loader.add('puppyWalk3', "resources/Puppy Stuff/Walk Cycle/DogWalkCycle_03.png");
	loader.add('puppyWalk4', "resources/Puppy Stuff/Walk Cycle/DogWalkCycle_04.png");
	loader.add('puppyWalk5', "resources/Puppy Stuff/Walk Cycle/DogWalkCycle_05.png");
	loader.add('puppySwim1', "resources/Puppy Stuff/Swim Cycle/DogSwimCycle_01.png");
	loader.add('puppySwim2', "resources/Puppy Stuff/Swim Cycle/DogSwimCycle_02.png");
	loader.add('puppySwim3', "resources/Puppy Stuff/Swim Cycle/DogSwimCycle_03.png");
	loader.add('puppySwim4', "resources/Puppy Stuff/Swim Cycle/DogSwimCycle_04.png");
	loader.add('puppySwim5', "resources/Puppy Stuff/Swim Cycle/DogSwimCycle_05.png");
	loader.add('bone', "resources/Puppy Stuff/Bone.png");
	loader.add('boneWithGlow', "resources/Puppy Stuff/BoneWithGlow.png");
	
	// Enemies
	loader.add('rat1', "resources/Enemies/RatWalkCycle/RatWalkCycle_01.png");
	loader.add('rat2', "resources/Enemies/RatWalkCycle/RatWalkCycle_02.png");
	loader.add('rat3', "resources/Enemies/RatWalkCycle/RatWalkCycle_03.png");
	loader.add('rat4', "resources/Enemies/RatWalkCycle/RatWalkCycle_04.png");
	loader.add('bird1', "resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_01.png");
	loader.add('bird2', "resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_02.png");
	loader.add('bird3', "resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_03.png");
	loader.add('bird4', "resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_04.png");
	loader.add('bird5', "resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_05.png");
	loader.add('bird6', "resources/Enemies/Bird/BirdFlyCycle/BirdFlyCycle_06.png");
	loader.add('birdFire1', "resources/Enemies/Bird/BirdFire_01.png");
	loader.add('birdFire2', "resources/Enemies/Bird/BirdFire_02.png");
	
	// Level 1 - Factory	
	loader.add('facilitybg', "resources/Levels/Facility/FacilityBG.png");
	loader.add('facilityfanblades', "resources/Levels/Facility/Fan_Blades.png");
	loader.add('facilityfancover', "resources/Levels/Facility/Fan_Cover.png");
	
	// Level 2 - Mountain
	loader.add('mountainbg', "resources/Levels/Mountains/MountainsBG_01.png");
	loader.add('mountainfg', "resources/Levels/Mountains/MountainsBG_02.png");
	loader.add('fallingrock1', "resources/Levels/Mountains/fallingrock_01.png");
	loader.add('fallingrock2', "resources/Levels/Mountains/fallingrock_02.png");
	loader.add('fallingrock3', "resources/Levels/Mountains/fallingrock_03.png");	
	loader.add('fallingrock4', "resources/Levels/Mountains/fallingrock_04.png");
	loader.add('largeboulder', "resources/Levels/Mountains/largeboulder.png");
	loader.add('smoke1', "resources/Levels/Mountains/smokepoof_01.png");
	loader.add('smoke2', "resources/Levels/Mountains/smokepoof_02.png");
	loader.add('cloud1', "resources/Levels/Mountains/Cloud_01.png");
	loader.add('cloud2', "resources/Levels/Mountains/Cloud_02.png");
	loader.add('cloud3', "resources/Levels/Mountains/Cloud_03.png");	
	loader.add('beartrapl', "resources/Levels/Mountains/beartrap_left.png");
	loader.add('beartrapr', "resources/Levels/Mountains/beartrap_right.png");
	loader.add('beartrapm', "resources/Levels/Mountains/beartrap_middle.png");	
	loader.add('bh_boulder1', "resources/Levels/Mountains/Boulderholder_boulder_01.png");
	loader.add('bh_rope1', "resources/Levels/Mountains/Boulderholder_rope_01.png");
	loader.add('bhtree_rope1', "resources/Levels/Mountains/Boulderholder_treerope_01.png");
	loader.add('bh_boulder2', "resources/Levels/Mountains/Boulderholder_boulder_02.png");
	loader.add('bh_rope2', "resources/Levels/Mountains/Boulderholder_rope_02.png");
	loader.add('bhtree_rope2', "resources/Levels/Mountains/Boulderholder_treerope_02.png");
	
	// Level 3 - Sky
	loader.add('skybg', 'resources/Levels/Sky/AirBG_Sky.png');
	loader.add('jetpack_1', 'resources/Puppy Stuff/DogJetPack_01.png');
	loader.add('jetpack_2', 'resources/Puppy Stuff/DogJetPack_02.png');
	loader.add('shipBack', 'resources/Levels/Sky/Ship_Back.png');
	loader.add('shipMid', 'resources/Levels/Sky/Ship_Mid.png');
	loader.add('shipFront', 'resources/Levels/Sky/Ship_Front.png');
	loader.add('cannonBall', 'resources/Levels/Sky/CannonBall.png');
	loader.add('engineFire1', 'resources/Levels/Sky/EngineFire_01.png');
	loader.add('engineFire2', 'resources/Levels/Sky/EngineFire_02.png');
	loader.add('exhaustFire1', 'resources/Levels/Sky/ExhaustFire_01.png');
	loader.add('exhaustFire2', 'resources/Levels/Sky/ExhaustFire_02.png');
	loader.add('cannon', 'resources/Levels/Sky/Ship_Cannon.png');
	loader.add('smokeStack', 'resources/Levels/Sky/Ship_SmokeStack.png');
	loader.add('vent', 'resources/Levels/Sky/Ship_Vent.png');
	loader.add('ventSmoke1', 'resources/Levels/Sky/Smoke_01.png');
	loader.add('ventSmoke2', 'resources/Levels/Sky/Smoke_02.png');
	
	// Level 4 - Water
	loader.add('waterbg', "resources/Levels/Water/WaterBG_Water.png");
	loader.add('waterfg', "resources/Levels/Water/WaterBG_Foreground.png");
	loader.add('barrel', "resources/Levels/Water/Barrel.png");
	loader.add('bubble_1', "resources/Levels/Water/Bubble_01.png");
	loader.add('bubble_2', "resources/Levels/Water/Bubble_02.png");
	loader.add('fish_1', "resources/Levels/Water/Fish_01.png");
	loader.add('fish_2', "resources/Levels/Water/Fish_02.png");
	loader.add('fish_3', "resources/Levels/Water/Fish_03.png");
	loader.add('ooze_1', "resources/Levels/Water/Ooze_01.png");
	loader.add('ooze_2', "resources/Levels/Water/Ooze_02.png");
	
	// Level 5 - City
	loader.add('citybg1', "resources/Levels/City/CityBG_01.png");
	loader.add('citybg2', "resources/Levels/City/CityBG_02.png");
	loader.add('citybg3', "resources/Levels/City/CityBG_03.png");
	loader.add('citybg4', "resources/Levels/City/CityBG_04.png");
	loader.add('ferriswheel', "resources/Levels/City/FerrisWheel.png");
	loader.add('window', "resources/Levels/City/Window.png");
	loader.add('boy1', "resources/Levels/City/Boy_01.png");
	loader.add('boy2', "resources/Levels/City/Boy_02.png");
	loader.add('boy3', "resources/Levels/City/Boy_03.png");
	// loader.add('girl1', "resources/Levels/City/Girl_01.png");
	// loader.add('girl2', "resources/Levels/City/Girl_02.png");
	// loader.add('girl3', "resources/Levels/City/Girl_03.png");
	// loader.add('guard1', "resources/Levels/City/Guard_01.png");
	// loader.add('guard2', "resources/Levels/City/Guard_02.png");
	// loader.add('guard3', "resources/Levels/City/Guard_03.png");
	
	loader.once('complete', this.spriteSheetLoaded);
	loader.load();
};

Main.prototype.spriteSheetLoaded = function() {
	this.gameController = new GameController(stage);
	gameController = this.gameController;
	requestAnimationFrame(Main.prototype.animate.bind(this));
	renderer.backgroundColor = 0x000000;
};