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

    var onKeyDown = function(e) {
      var c = e.keyCode;
      if(GameLoop.keysPressed.indexOf(c) < 0) {
        GameLoop.keysPressed.push(c);
      }
    }

    var onKeyUp = function(e) {
      var c = e.keyCode;
      if(GameLoop.keysPressed.indexOf(c) >= 0) {
        GameLoop.keysPressed.splice(GameLoop.keysPressed.indexOf(c), 1);
      }
    }

  }

  // Add Event listeners
  window.addEventListener('keydown', onKeyDown, false);
  window.addEventListener('keyup', onKeyUp, false);
},10);


