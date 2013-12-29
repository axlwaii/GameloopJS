var PlayerController;

PlayerController = function(){

  var controller, player;

  controller = {};
  player =  null;

  controller.setPlayer = function(gameObj){
    if ( typeof gameObj === 'object'){
      player = gameObj;
    }
  };

  // GameLoop Methods
  controller.render = function(){
    player.render();
  };

  controller.update = function(){
    player.update(GameLoop.input.keysPressed);
  };

  return controller;

};

