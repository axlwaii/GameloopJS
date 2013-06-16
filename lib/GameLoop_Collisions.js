// Collisions
GameLoop.boxCollision = function(x1,y1,w1,h1,x2,y2,w2,h2){
  if( (x1 > x2+w2) ||
      (y1 > y2 + h2) ||
      (x2 > x1+w1) ||
      (y2 > y1+h1)
    )
  {
    return 0;
  }
  return 1;
};

// Detects collision of canvas borders and level tile map
GameLoop.levelCollision = function (x, y, minX, height, width){

  var level = GameLoop.getLevel();
  var collides, mapRow, mapColumn;
  if(level.tileMap !== undefined){

    if(level.tileMap.length > 0){
      mapRow = parseInt((y+height/2)/(canvas.height/level.tileMap.length));
      mapColumn = parseInt((x+width/2)/(canvas.width/level.tileMap[0].length));


      if(mapRow >= level.tileMap.length) {
        mapRow = level.tileMap.length-1;
      };

      if(mapColumn >= level.tileMap[0].length) {
        mapColumn = level.tileMap[0].length-1;
      };

      if(level.tileMap[mapRow][mapColumn] === 1){
        return true;
      }
    }
  }

  if (y - 1 > minX && y + height < canvas.height &&
      x + 1 > 0 && x+width < canvas.width ) {
        return false;
      };

  return true;
};

// checks the collision beetween
GameLoop.checkCollision = function(obj, colObjects){
  var e1 = obj;

  for(var i=0; i < colObjects.length; i++){
    var e2 = colObjects[i];

    var x1,x2,y1,y2;
    x1 = e1.position.x;
    x2 = e2.position.x;
    y1 = e1.position.y;
    y2 = e2.position.y;

    if(GameLoop.boxCollision(x1,y1,25,25,x2,y2,e2.img.width-5,e2.img.height-5) > 0 )
    {
      return colObjects[i]._id;
    }
  }
  return -1;
};

//TODO: Add A* Algorythm
//
// At initialization add the starting location to the open list and empty the closed list
// While there are still more possible next steps in the open list and we haven't found the target:
// Select the most likely next step (based on both the heuristic and path costs)
//   Remove it from the open list and add it to the closed
//   Consider each neighbor of the step. For each neighbor:
//   Calculate the path cost of reaching the neighbor
//   If the cost is less than the cost known for this location then remove it from the open or closed lists (since we've now found a better route)
//   If the location isn't in either the open or closed list then record the costs for the location and add it to the open list (this means it'll be considered in the next search). Record how we got to this location
