// GameLoop model
// to use collisions

/* @desc model constructor
 * @param x x-positon
 * @param y y-positon
 * @param h height of the game object
 * @param w width  of the game object
 * @param z used for rendering order in the gameloop
 */

GameLoop.Model = function(x, y , w, h, z){

    'use strict';

    this.x            = x || 0;
    this.y            = y || 0;
    this.z            = z || 0;
    this.height       = h || 0;
    this.width        = w || 0;

    this.lastUpdateAt = Date.now();

};
