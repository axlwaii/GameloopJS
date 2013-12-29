/* Main Game */
var playerController;

// document ready function
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {

        // Start
        GameLoop.init("game");

        player = new Player(50,50);
        GameLoop.addObject(player);

        GameLoop.start();
        // END

        clearInterval(readyStateCheckInterval);
    }
}, 10);
