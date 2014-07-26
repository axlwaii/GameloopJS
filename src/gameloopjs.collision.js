// Gameloop Collisions

window.GameLoop = GameLoop || {};

GameLoop.Collision = (function() {
    'use strict';

    var gameAreaCollision,
        boxCollision;

    function _boxCollision(r1, r2)  {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    }

    function dotProduct(a, b) {
        var dx, dy;

        dx = a.x*b.x;
        dy = a.y*b.y;

        return dx + dy;
    }

    function bottomAreaCollision(y, canvasHeight) {

        if (y >= canvasHeight) {
            return true;
        }

        return false;

    }

    function topAreaCollision(y) {

        if ( y <= 0 ) {
            return true;
        }

        return false;

    }

    function leftAreaCollision(x) {
        if (x <= 0 ) {
            return true;
        }

        return false;
    }

    function rightAreaCollision(x, canvasWidth) {

        if (x >= canvasWidth) {
            return true;
        }

        return false;

    }

    gameAreaCollision = function(obj, cnvs) {

        var x = Math.round(obj.x);
        var y = Math.round(obj.y);

        if (leftAreaCollision(x) ||
            rightAreaCollision((x + obj.width),cnvs.width)) {
            return true;
        }

        if (topAreaCollision(y)||
            bottomAreaCollision((y + obj.height),cnvs.height)) {
            return true;
        }

        return false;

    };

    // boxCollision = function(aX, aY, aHeight, aWidth, bX, bY, bHeight, bWidth){
    boxCollision = function(oa, ob){

        // var a = {
        //         left     : aX,
        //         right    : aX + aWidth,
        //         top      : aY,
        //         bottom   : aY + aHeight
        //     },
        //     b = {
        //         left     : bX,
        //         right    : bX + bWidth,
        //         top      : bY,
        //         bottom   : bY + bHeight
        //     };

        var a = {
                left     : oa.x,
                right    : oa.x + a.width,
                top      : oa.y,
                bottom   : oa.y + a.height
            },
            b = {
                left     : ob.x,
                right    : ob.x + b.width,
                top      : ob.y,
                bottom   : ob.y + b.height
            };

        return _boxCollision(a,b);

    };

    return {
        dotProduct           : dotProduct,
        boxCollision         : boxCollision,
        gameAreaCollision    : gameAreaCollision,
        topAreaCollision     : topAreaCollision,
        bottomAreaCollision  : bottomAreaCollision,
        leftAreaCollision    : leftAreaCollision,
        rightAreaCollision   : rightAreaCollision
    };
})();
