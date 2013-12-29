/* Main Game */
var playerController;

// document ready function
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {

        // Start
        GameLoop.init("game");

        playerController = new PlayerController();
        playerController.setPlayer(new Player(50,50));
        GameLoop.addObject(playerController);

        GameLoop.start();
        // END

        clearInterval(readyStateCheckInterval);
    }
}, 10);
