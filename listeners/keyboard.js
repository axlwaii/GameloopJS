/**
 *
 *    Key Listener
 *
 *      keycodes - just as a reminder
 *
 *        32 = space
 *        37 = left
 *        38 = up
 *        39 = right
 *        40 = down
 *
 */

var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {

    if(typeof GameLoop.input.keysPressed === 'undefined'){
      GameLoop.input.keysPressed = [];
    }

    var onKeyDown = function(e) {
      var c = e.keyCode;
      if(GameLoop.input.keysPressed.indexOf(c) < 0) {
        GameLoop.input.keysPressed.push(c);
      }
    }

    var onKeyUp = function(e) {
      var c = e.keyCode;
      if(GameLoop.input.keysPressed.indexOf(c) >= 0) {
        GameLoop.input.keysPressed.splice(GameLoop.input.keysPressed.indexOf(c), 1);
      }
    }

  }

  // Add Event listeners
  window.addEventListener('keydown', onKeyDown, false);
  window.addEventListener('keyup', onKeyUp, false);
},10);


