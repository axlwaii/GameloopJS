// GameLoopJS Core

var GameLoop = {};

window.requestAnimFrame = (function(){

    return (
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||

        function(callback){
            window.setTimeout(callback, 1000 / 30);
        }
        );

}());

GameLoop = (function (window, document, undefined){

    'use strict';

    var addObject,
        canvas,
        context,
        gameObjects,
        deltaTime,
        fps,
        currentFps = 30,
        getCanvas,
        getContext,
        init,
        input = {},
        isRunning = false,
        lastTick,
        nextTick,
        play,
        removeObject,
        render,
        skipTicks = 1000/30,
        start,
        startTime,
        stop,
        tick,
        update;

    getCanvas  = function() { return canvas; };
    getContext = function() { return context; };

    fps = function(_fps){

        currentFps = (_fps || currentFps );
        skipTicks = 1000/currentFps;

        return currentFps;

    };

    addObject = function (obj) {

        if(typeof obj === 'object'){
            gameObjects.push(obj);
        }

    };

    removeObject = function (obj) {

        if(gameObjects.indexOf(obj) >= 0){
            gameObjects.splice( gameObjects.indexOf(obj, 1));
        }

    };

    deltaTime = function(){
        return 0.1 * (parseInt(Date.now() - lastTick, 10));
    };


        }

    };

    render = function(){

        var i, gameObj;
        context.clearRect(0,0,canvas.width, canvas.height);
        context.save();

        // render gameObjects
        for(i = 0; i < gameObjects.length; i++){
            gameObj = gameObjects[i];
            if(gameObj.render !== undefined){
                gameObj.render();
            }
        }

        context.restore();

    };

    update = function (){

        gameObjects.forEach(function(gameObj){
            if(gameObj.update !== undefined){
                gameObj.update();
            }
        });

    };

    // INIT, START, STOP
    init = function(canvasId){

        if(canvasId === undefined){
            console.error('No canvas object is defined');
            return false;
        }

        gameObjects = [];

        canvas = document.getElementById(canvasId);
        context = canvas.getContext('2d');

    };

    // @desc   actual gameloop
    play = function(){


            update();
            render();

            nextTick = new Date().getTime() + skipTicks;
            lastTick = new Date().getTime();
        }

        if(!isRunning) { return; }


    };

    // @desc   start or restarts the GameLoop
    start = function(){

        if(gameObjects.length === 0) {
            console.warn('No gameObjects in the Game.');
        }

        startTime = Date.now();
        isRunning = true;
        play();

        console.info('Gameloop is running');

    };

    // @desc   sets isRunning to false, nothing will be rendered or updated anymore
    stop = function(){

        console.info('Gameloop stopped');
        isRunning = false;

    };

    return {

        addObject: addObject,
        canvas: getCanvas,
        context: getContext,
        deltaTime: deltaTime,
        fps: fps,
        gameObjects: gameObjects,
        init: init,
        input: input,
        removeObject: removeObject,
        start: start,
        startTime: startTime,
        stop: stop

    };

}(window, document));
