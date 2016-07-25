var upArrow = 38;
var downArrow = 40;
var leftArrow = 37;
var rightArrow = 39;
var space = 32;
var e = 69;
var p = 80;

function KeyEventListener( levelController ){
	Listen(levelController);
};

function Listen( levelController ) {
	document.addEventListener('keydown', function(ev) {return onkey(ev, ev.keyCode, true, levelController); }, false);
	document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false, levelController); }, false);
};

function onkey(ev, key, down, levelController) {
    switch(key) {
      case leftArrow:  levelController.puppy.left  = down; ev.preventDefault(); return false;
      case rightArrow: levelController.puppy.right = down; ev.preventDefault(); return false;
      case upArrow: levelController.puppy.jump  = down; ev.preventDefault(); return false;
	  case p: levelController.resetLevel(); ev.preventDefault(); return false;
    }
  }
  
function onKeyDown( key, upAction, downAction, leftAction, rightAction, spaceAction, eAction ){
    if (key.keyCode == upArrow){
        upAction();
    }
    
    if (key.keyCode == downArrow){
        downAction();   
    }
    
    if (key.keyCode == leftArrow){
        leftAction();
    }
    
    if (key.keyCode == rightArrow){
        rightAction();
    }
    
    if (key.keyCode == space){
        spaceAction();
    }
    
    if (key.keyCode == e){
        eAction();
    }
}