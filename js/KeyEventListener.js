var upArrow = 38;
var downArrow = 40;
var leftArrow = 37;
var rightArrow = 39;
var space = 32;
var e = 69;

function KeyEventListener( player ){
	Listen(player);
};

function Listen( player ) {
	document.addEventListener('keydown', function(ev) {return onkey(ev, ev.keyCode, true, player); }, false);
	document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false, player); }, false);
};

function onkey(ev, key, down, player) {
    switch(key) {
      case leftArrow:  player.left  = down; ev.preventDefault(); return false;
      case rightArrow: player.right = down; ev.preventDefault(); return false;
      case upArrow: player.jump  = down; ev.preventDefault(); return false;
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