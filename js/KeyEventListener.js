var upArrow = 38;
var downArrow = 40;
var leftArrow = 37;
var rightArrow = 39;
var space = 32;
var e = 69;

function KeyEventListener( upAction, downAction, leftAction, rightAction, spaceAction, eAction ){
    Listen( upAction, downAction, leftAction, rightAction, spaceAction, eAction );
}

function Listen( upAction, downAction, leftAction, rightAction, spaceAction, eAction ) {
    document.addEventListener('keydown', function(key) { onKeyDown( key, upAction, downAction, leftAction, rightAction, spaceAction, eAction  )} );
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