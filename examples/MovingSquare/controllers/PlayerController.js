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
  controller.render = function(canvas, context){
    player.render(context);
  };

  controller.update = function(inputHash){
    player.update(inputHash.keysPressed);
  };

  return controller;

};

