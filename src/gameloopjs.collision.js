// Gameloop Collisions

/*global GameLoop: true*/

GameLoop.Collision = (function() {
    "use strict";

    var innerCollision,
        objectsInnerCollision,
        dotProduct,
        collided;


    collided = function(a, b) {

        //check for horz collision
        if(b.x + b.width >= a.x && b.x < a.x + a.width) {
            //check for vert collision
            if(b.y + b.height >= a.y && b.y < a.y + a.height) {
                return true;
            }
        }

        //check a inside b
        if(b.x <= a.x && b.x + b.width >= a.x+a.width) {
            if(b.y <= a.y && b.y + b.height >= a.y + a.height) {
                return true;
            }
        }

        //check b inside a
        if(a.x <= b.x && a.x + a.width >= b.x+b.width) {
            if(a.y <= b.y && a.y + a.height >= b.y+b.height) {
                return true;
            }
        }

        return false;
    };


    objectsInnerCollision = function(a,b){
        //check a inside b
        if(b.x <= a.x && b.x + b.width >= a.x+a.width) {
            if(b.y <= a.y && b.y + b.height >= a.y + a.height) {
                return true;
            }
        }

        //check b inside a
        if(a.x <= b.x && a.x + a.width >= b.x+b.width) {
            if(a.y <= b.y && a.y + a.height >= b.y+b.height) {
                return true;
            }
        }
        return false;
    };

    dotProduct = function(a, b) {
        var dx, dy;

        dx = a.x*b.x;
        dy = a.y*b.y;

        return dx + dy;

    };

    innerCollision = function(aX, aY, aHeight, aWidth, bX, bY, bHeight, bWidth){

        var a = {
                x     : aX,
                y     : aY,
                height: aHeight,
                width : aWidth
            },
            b = {
                x     : bX,
                y     : bY,
                height: bHeight,
                width : bWidth
            };

        return objectsInnerCollision(a,b);

    };

    return {
        dotProduct     : dotProduct,
        innerCollision : innerCollision
    };

}());
