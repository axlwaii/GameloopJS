/*
*/

// Animation Time
window.requestAnimFrame = (function(){
  return (
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||

    function(/* function */ callback, /* DOMElement */ element){
      window.setTimeout(callback, 1000 / 30);
    }
  );
})();

var GameLoop = (function (){
  // return value
  var gameLoop      = {};
  var canvas, context;
  //private variables
  var controllers;
  var level         = {};

  // private
  var animationObjects = [];
  var startTime;
  var lastTick;
  var nextTick;

  var isRunning = false;

  // fps
  var skipTicks = 1000/30;

  gameLoop.mode = 'game';
  gameLoop.mousePressed  = [];
  gameLoop.keysPressed   = [];

  // public GameLoop functions
  // Getter Setter
  gameLoop.addAnimationObject = function(obj){
    if ( typeof obj === 'object'){
      animationObjects.push(obj);
    }
  };

  gameLoop.getLevel = function() {
      return level;
  };

  gameLoop.setLevel = function(gameobj) {
    if ( typeof gameobj === 'object'){
      level = gameobj;
    }
  };

  gameLoop.getCanvas  = function() { return canvas; }
  gameLoop.getContext = function() { return context; }

  gameLoop.addController = function (obj) {
    if(typeof obj === 'object'){
      controllers.push(obj);
    }
  };

   gameLoop.removeController = function (obj) {
     if(controllers.indexOf(obj) >= 0){
      controllers.splice( controllers.indexOf(obj, 1));
    }
  };

  gameLoop.deltaTime = function(){
    return 0.01 * (parseInt(Date.now() - lastTick, 10));
  }

  // private GameLoop functions

  function tick(){

    if(new Date().getTime() > nextTick){
      return true;
    }

    return false;
  }

  function play(){
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
  }

  function render(){
    context.clearRect(0,0,canvas.width, canvas.height);
    context.save();

    // render controllers
    for(var i = 0; i < controllers.length; i++){
      var controller = controllers[i];
      if(typeof controller.render !== 'undefined'){
        controller.render(canvas,context);
      }
    }

    context.restore();
  }

  function update (){
    var child, i, collider;

    controllers.forEach(function(controller){
      if(typeof controller.update !== 'undefined'){
        controller.update(gameLoop.keysPressed, gameLoop.mousePressed );
      }
    });

    // check for collisions
    controllers.forEach(function(controller){
      if(typeof controller.collisions !== 'undefined'){
        controller.collisions();
      }
    });
  }

  gameLoop.init = function(canvasId){
    if(typeof canvasId === 'undefined'){
      console.error("No canvas object is defined");
      return false;
    }
    controllers = [];

    canvas = document.getElementById(canvasId);
    context = canvas.getContext('2d');
  };

  gameLoop.start = function(){
    if(!controllers.length === 0) {
      console.warn("No controllers in the Game.");
    }

    startTime = Date.now();
    nextTick = new Date().getTime();
    lastTick = new Date().getTime();
    isRunning = true;
    play();
  }

  gameLoop.stop = function(){ isRunning = false; };

  return gameLoop;
}());
