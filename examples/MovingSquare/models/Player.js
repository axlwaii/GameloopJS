var Player;

Player = function(newX, newY){

  var model = {};

  model.speed = 30;

  model.position = {
    x: newX,
    y: newY
  };

  model.render = function(ctx){
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x,this.position.y,50,50);
  };

  model.update = function(keysArray){
    console.log(GameLoop.deltaTime());
    if(keysArray instanceof Array) {
    for(var i = 0; i< keysArray.length; i++){
      switch(keysArray[i]){
        case 38: //up
            this.position.y -= 1 * this.speed * GameLoop.deltaTime();
          break;
        case 40: // down
            this.position.y += 1 * this.speed * GameLoop.deltaTime();
          break;
        case 37: // left
            this.position.x -= 1 * this.speed * GameLoop.deltaTime();
          break;
        case 39: // right
            this.position.x += 1 * this.speed * GameLoop.deltaTime();
          break;
        default:
            break;
        }
      }
    }
  };
  return model;
};
