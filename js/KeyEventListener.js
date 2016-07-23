var upArrow = 38;
var downArrow = 40;
var leftArrow = 37;
var rightArrow = 39;
var space = 32;
var e = 69;

function KeyEventListener( player ){
	Listen(player);
};
// function KeyEventListener( upAction, downAction, leftAction, rightAction, spaceAction, eAction ){
    // Listen( upAction, downAction, leftAction, rightAction, spaceAction, eAction );
// }

function Listen( player ) {
	document.addEventListener('keydown', function(ev) {return onkey(ev, ev.keyCode, true, player); }, false);
	document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false, player); }, false);
    //document.addEventListener('keydown', function(key) { onKeyDown( key, upAction, downAction, leftAction, rightAction, spaceAction, eAction  )} );
}

function onkey(ev, key, down, player) {
	console.log("KEY!");
    switch(key) {
      case leftArrow:  player.left  = down; ev.preventDefault(); return false;
      case rightArrow: player.right = down; ev.preventDefault(); return false;
      case space: player.jump  = down; ev.preventDefault(); return false;
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