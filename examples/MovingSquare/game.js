/* Main Game */
var keysArray = [];

// Start
GameLoop.init('game');
GameLoop.Controls.keyboard(keysArray);

// add your object
GameLoop.addObject(new Player(50,50));

// start the game
GameLoop.start();
// END
