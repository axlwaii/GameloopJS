// GameLoopJS Core

/*jslint browser:true*/


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

GameLoop = (function (){

    "use strict";

    var addObject,
        canvas,
        context,
        controllers,
        deltaTime,
        fps,
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

    fps = function(fps){
        skipTicks = 1000/fps;
    };

    addObject = function (obj) {

        if(typeof obj === 'object'){
            gameObjects.push(obj);
        }
    };

    removeController = function (obj) {
        if(controllers.indexOf(obj) >= 0){
            controllers.splice( controllers.indexOf(obj, 1));
    removeObject = function (obj) {
        if(gameObjects.indexOf(obj) >= 0){
            gameObjects.splice( gameObjects.indexOf(obj, 1));
        }
    };

    deltaTime = function(){
        return 0.01 * (parseInt(Date.now() - lastTick, 10));
    };

    tick = function(){
        if(new Date().getTime() > nextTick){
            return true;
        }
        return false;
    };

    play = function(){
        if(tick()){
            render();
            update();

            nextTick = new Date().getTime() + skipTicks;
            lastTick = new Date().getTime();
        }

        if(!isRunning) { return; }

        // RequestAnimationFrame is burning the cpu with its update circles
        setTimeout( function(){
            window.requestAnimFrame(play);
        }, 25);
    };

    render = function(){
        var i, controller;
        var i, gameObj;
        context.clearRect(0,0,canvas.width, canvas.height);
        context.save();

        // render controllers
        for(i = 0; i < controllers.length; i++){
            controller = controllers[i];
            if(controller.render !== undefined){
                controller.render(canvas,context);
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
            console.error("No canvas object is defined");
            return false;
        }

        gameObjects = [];

        canvas = document.getElementById(canvasId);
        context = canvas.getContext('2d');
    };

    start = function(){
        if(controllers.length === 0) {
            console.warn("No controllers in the Game.");
        }

        startTime = Date.now();
        nextTick = new Date().getTime();
        lastTick = new Date().getTime();
        isRunning = true;
        play();
        console.info("Gameloop is running");
    };

    stop = function(){
        console.info("Gameloop stopped");
        isRunning = false;
    };

    return {
        addController: addController,
        deltaTime: deltaTime,
        fps: fps,
        getCanvas: getCanvas,
        getContext: getContext,
        init: init,
        input: input,
        removeController: removeController,
        start: start,
        startTime: startTime,
        stop: stop
    };

}());
