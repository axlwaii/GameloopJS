// GameLoop model
// to use collisions

/*global GameLoop: true*/

GameLoop.Model = function(){
    var model;

    model = {};

    model.x = 0;
    model.y = 0;
    model.height = 0;
    model.width = 0;

    model.lastUpdateAt = Date.now();

    return model;
};
