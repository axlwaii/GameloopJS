var Player;

Player = function(newX, newY){

    'use strict';

    var model = {};

    model.speed = 1;
    model.color = 0;

    model.position = {
        x: newX,
        y: newY
    };

    model.render = function(can, ctx){
        GameLoop.clearCanvas();

        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x,this.position.y,50,50);

        ctx.restore();
    };

    model.update = function(cnvs, ctx){

        var i;
        for(i = 0; i< keysArray.length; i++){
            switch(keysArray[i]){
                case 38: //up
                    this.position.y -= this.speed * GameLoop.deltaTime();
                    break;
                case 40: // down
                    this.position.y += this.speed * GameLoop.deltaTime();
                    break;
                case 37: // left
                    this.position.x -= this.speed * GameLoop.deltaTime();
                    break;
                case 39: // right
                    this.position.x += this.speed * GameLoop.deltaTime();
                    break;
                default:
                    break;
            }
        }

    };
    return model;
};
