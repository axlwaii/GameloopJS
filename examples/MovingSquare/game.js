/* Main Game */
var keysArray = [];
var speedChange, speedInput, thePlayer;

thePlayer = new Player(50,50);

speedChange = function() {
    console.log(speedInput.value);
    thePlayer.speed = parseInt(speedInput.value,10) > 0 ? parseInt(speedInput.value,10) : 1;
};

// Start
GameLoop.init('game');
GameLoop.Controls.keyboard(keysArray);

speedInput = document.getElementById('speed');
document.addEventListener('change', speedChange);

// add your object
GameLoop.addObject(thePlayer);

// start the game
GameLoop.start();

// END

