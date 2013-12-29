var Player;

Player = function(newX, newY){

    var speed,
        position,
        render,
        update;

    speed = 1;

    position = {
        x: newX,
        y: newY
    };

    render = function(){
        var ctx;

        ctx = GameLoop.context();

        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x,this.position.y,50,50);
    };

    update = function(){

        canvas = GameLoop.canvas();

        if(position.y >= canvas.height - 50 /* height of the rectangle */){
            speed = -1;
        }else if(position.y <= 0){
            speed = 1;
        }

        this.position.y += speed * GameLoop.deltaTime();

    };

    return {

        speed: speed,
        position: position,
        render: render,
        update: update

    };
};
