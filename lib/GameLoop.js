/*
 * This is a just a game loop
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

// Global Game Components
var canvas, context;
// MAIN GAMELOOP
var GameLoop = (function() {
  // return value
  var gameLoop      = {};

  //private variables
  var controllers;
  var level         = {};
  var pause = false;

  // private
  var animationObjects = [];
  var startTime;
  var lastTick;
  var nextTick;

  // fps
  var skipTicks = 1000/30;

  // public modes
  // 'game'
  // 'menu'
  gameLoop.mode = 'game';
  gameLoop.mousePressed  = [];
  gameLoop.keysPressed   = [];

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

      if(!pause){
        update();
      }

      emit();

      nextTick = new Date().getTime() + skipTicks;
      lastTick = new Date().getTime();
    }

    // RequestAnimationFrame is burning the cpu with its update circles
    setTimeout( function(){
      window.requestAnimFrame(play);
    }, 10);
  }

  function emit(){
    controllers.forEach(function(controller){
      if(typeof controller.emit !== 'undefined'){
        controller.emit();
      };
    });
  };

  function render(){
    context.clearRect(0,0,canvas.width, canvas.height);
    context.save();

    if(level.render !== undefined){
      level.render(context);
    }

    // render controllers
    for(var i = 0; i < controllers.length; i++){
      var controller = controllers[i];
      if(typeof controller.render !== 'undefined'){
        controller.render(context);
      }
    }

    // TODO: replace with a 'destroy after time' function
    animationObjects.forEach(function(to){
      if( to.startTime !== undefined){
        to.render(context);
        if( to.animationTime !== undefined){
         if((Date.now() - to.startTime ) > to.animationTime ){
          animationObjects.splice((animationObjects.indexOf(to)), 1);
          }
        } else {
          if((Date.now() - to.startTime ) > 500 ){
            animationObjects.splice((animationObjects.indexOf(to)), 1);
          }
        }
      }
    });

    context.restore();
  }

  function update (){
    var child, i, collider;

    controllers.forEach(function(controller){
      if(typeof controller.render !== 'undefined'){
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

   // INIT
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
    // Start the Loop
    play();
  }

  gameLoop.pause = function(){ pause = true;};
  gameLoop.resume = function(){ pause = false;};

  return gameLoop;
}());
