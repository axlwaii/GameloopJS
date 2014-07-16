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

var GameLoop = GameLoop || {};

GameLoop.Controls = (function () {

    'use strict';

    var keyboard,
        listenerArray = [],
        maxKeys = 20,
        onKeyDown,
        onKeyUp,
        lastDownTime = Date.now(),
        lastKey;

    onKeyDown = function(e) {
        var c = e.keyCode;

        if(listenerArray.indexOf(c) < 0) {
            listenerArray.push(c);
        }

        if(lastDownTime < Date.now() - 2000) {
            lastKey = listenerArray[listenerArray.length-1];
            listenerArray[0] = lastKey;
            listenerArray.length = 1;
        }

        if(listenerArray.length >= maxKeys) {
            lastKey = listenerArray[listenerArray.length-1];
            listenerArray[0] = lastKey;
            listenerArray.length = 1;
        }

        lastDownTime = Date.now();

    };

    onKeyUp = function(e) {
        var c = e.keyCode;
        if(listenerArray.indexOf(c) >= 0) {
            listenerArray.splice(listenerArray.indexOf(c), 1);
        }
    };

    keyboard =  function (keyArray) {

        listenerArray = keyArray;

        // Add Event listeners
        window.addEventListener('keydown', onKeyDown, false);
        window.addEventListener('keyup', onKeyUp, false);
    };

    return {
        keyboard: keyboard
    };

})();
