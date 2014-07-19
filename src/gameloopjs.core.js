// GameLoopJS Core

var GameLoop = GameLoop || {};

window.requestAnimFrame = (function(){

    'use strict';

    return (
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||

        // Fallback
        function(callback){
            window.setTimeout(callback, 1000 / 30);
        }

    );

}());


GameLoop = (function (window, document, undefined){

    'use strict';

    var canvas,
        context,
        clearCanvas,
        currentFps,
        skipTicks,
        fps,
        init,
        lastTick,
        gameObjects,
        addObject,
        addObjects,
        removeObject,
        removeObjects,
        runs,
        startTime,
        stopTime,
        start,
        stop,
        // reuse memory for Iterators
        updateI,
        renderI;

    /* @desc intitialize canvas, context,
     *       and default fps(60)
     */
    init = function(canvasId) {

        if(canvasId === undefined){
            console.error('No canvas object is defined');
            return false;
        }

        runs        = false;
        gameObjects = [];

        canvas = document.getElementById(canvasId);
        context = canvas.getContext('2d');

        fps(60);

    };

    /* @desc getter and setter for fps
     * @param _fps - if defined fps will be set to its value
     * @return current fps
     */
    fps = function(_fps){

        currentFps = (_fps || currentFps );
        skipTicks = 1000/currentFps;

        return currentFps;

    };

    addObject = function (obj) {

        if(typeof obj === 'object'){

            if(obj.update === undefined) {
                obj.update = function(){};
            }

            if(obj.render === undefined) {
                obj.render = function(){};
            }

            if(obj.z === undefined) {
                obj.z = 0;
            }

            gameObjects.push(obj);
            gameObjects.sort(orderByZ);
        }

    };

    addObjects = function (objs) {
        var i;

        for(i = 0; i < objs.length; i++) {
            var obj = gameObjects[i];
            addObject(obj);
        }

    };

    removeObject = function (obj) {

        if(gameObjects.indexOf(obj) >= 0){
            gameObjects.splice( gameObjects.indexOf(obj, 1));
        }

    };

    removeObjects = function (objs) {
        var i;

        for(i = 0; i < objs.length; i++) {
            var obj = objs[i];
            removeObject(obj);
        }

    };

    clearCanvas = function() {
        context.clearRect(0,0,canvas.width, canvas.height);
    };

    start = function() {

        if(gameObjects.length === 0) {
            console.warn('No gameObjects in the Game.');
        }

        startTime = Date.now();
        lastTick = Date.now();
        runs = true;
        play();

        console.info('Gameloop is running');

    };

    stop = function() {

        runs = false;
        stopTime = Date.now();

        console.info('Gameloop stopped');

    };

    /* @desc    Order Array by z value
     *          used to sort gameObject for update and render
     * @param   a - first Object to compare
     * @param   b - second Object to compare
     * @returns 0: if eqaul  -1: a.z is smaller 1: a.z is bigger
    */
    function orderByZ(a,b) {

        if (a.z < b.z) {
            return -1;
        }

        if (a.z > b.z) {
            return 1;
        }

        return 0;
    }

    function deltaTime() {
        return 0.1 * (parseInt(Date.now() - lastTick, 10));
    }

    function render() {

        for(renderI = 0; renderI < gameObjects.length; renderI++) {
            gameObjects[renderI].render(canvas, context);
        }

    }

    function update() {

        for(updateI = 0; updateI < gameObjects.length; updateI++) {
            gameObjects[updateI].update(canvas, context);
        }

        render();
    }

    function play() {

        window.requestAnimFrame(play);

        context.save();

        update();
        lastTick = Date.now();

        context.restore();

        if(!runs) { return false; }

    }

    /* @desc public interface
     *  canvas              - returns canvas
     *  context             - returns context2d of the canvas
     *  fps(arg)            - sets frames per seconds
     *  fps()               - returns fps
     *  deltaTime           - returns delta time for smooth movement
     *  gameObjects         - array of all included gameObjects
     *  addObject(obj)      - add 1 object to the loop
     *  addObjcts(objArray) - add an array of objects to the loop
     *  removeObject(obj)   - searches for obj in ganeObjects and removes it
     *  start()             - start the loop (basically executes update and render)
     *  stop()              - stop the loop
     */

    return {
        canvas       : canvas,
        context      : context,
        clearCanvas  : clearCanvas,
        init         : init,
        deltaTime    : deltaTime,
        fps          : fps,
        gameObjects  : gameObjects ,
        addObject    : addObject,
        addObjects   : addObjects,
        removeObject : removeObject,
        start        : start,
        stop         : stop
    };

}(window, document));
