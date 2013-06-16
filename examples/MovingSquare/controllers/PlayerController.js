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
  controller.render = function(context){
    player.render(context);
  };

  controller.update = function(k){
    player.update(k);
  };

  return controller;

};

