// Gameloop Collisions

window.GameLoop = GameLoop || {};

GameLoop.Collision = (function() {
    'use strict';

    var dotProduct,
        topAreaCollision,
        bottomAreaCollision,
        leftAreaCollision,
        rightAreaCollision,
        gameAreaCollision,
        boxCollision,
        _boxCollision;

    _boxCollision = function(r1, r2)  {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    };

    dotProduct = function(a, b) {
        var dx, dy;

        dx = a.x*b.x;
        dy = a.y*b.y;

        return dx + dy;

    };

    bottomAreaCollision = function(y, canvasHeight) {

        if (y >= canvasHeight) {
            return true;
        }

        return false;

    };

    topAreaCollision = function(y) {

        if ( y <= 0 ) {
            return true;
        }

        return false;

    };

    leftAreaCollision = function(x) {
        if (x <= 0 ) {
            return true;
        }

        return false;
    };

    rightAreaCollision = function(x, canvasWidth) {

        if (x >= canvasWidth) {
            return true;
        }

        return false;

    };

    gameAreaCollision = function(obj, cnvs) {

        if (leftAreaCollision(obj.x) ||
            rightAreaCollision((obj.x + obj.width),cnvs.width)) {
            return true;
        }

        if (topAreaCollision(obj.y)||
            bottomAreaCollision((obj.y+obj.height),cnvs.height)) {
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
