var Player;

Player = function(newX, newY, color){

    'use strict';

    var model = new GameLoop.Model(newX, newY, 50, 50);

    model.speed = 1;
    model.color = 0;

    model.render = function(can, ctx){
        GameLoop.clearCanvas();

        ctx.save();
        ctx.fillStyle = color || 'red';
        ctx.fillRect(this.x,this.y,this.width, this.height);

        ctx.restore();
    };

    model.update = function(cnvs, ctx){

        var i;
        for(i = 0; i< keysArray.length; i++){
            switch(keysArray[i]){
                case 38: //up
                    this.y -= this.speed * GameLoop.deltaTime();

                    if(GameLoop.Collision.topAreaCollision(this.y)) {
                        this.y += this.speed * GameLoop.deltaTime();
                    }

                    break;
                case 40: // down
                    this.y += this.speed * GameLoop.deltaTime();
                    if(GameLoop.Collision.bottomAreaCollision(this.y+this.height, cnvs.height)) {
                        this.y -= this.speed * GameLoop.deltaTime();
                    }
                    break;
                case 37: // left
                    this.x -= this.speed * GameLoop.deltaTime();
                    if(GameLoop.Collision.leftAreaCollision(this.x)) {
                        this.x += this.speed * GameLoop.deltaTime();
                    }
                    break;
                case 39: // right
                    this.x += this.speed * GameLoop.deltaTime();
                    if(GameLoop.Collision.rightAreaCollision(this.x+this.width, cnvs.width)) {
                        this.x -= this.speed * GameLoop.deltaTime();
                    }
                    break;
                default:
                    break;
            }
        }

    };
    return model;
};
