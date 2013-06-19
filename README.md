GameLoopJS
==========

This is a just a game loop.

How To Use:
----------
Add your canvas

    GameLoop.init('yourCanvasId');

Add game elements (controllers)
-------------------------------
A controller or object can have 3 functions to interact with the loop:

    var YourController = function(){

      var controller = {};
      controller.emit = function(){
        //Will be called last each frame
      };

      controller.render = function(context){
        //basicaly returns the context so that you can draw your object(s)
      };

      controller.update = function(keysPressed,mousePressed){
        // you can add listeners
        // for keyboard and mouse input
      };

      // your code

      return controller;
    };

Push controllers into the loop
------------------------------

    var yourController = new YourController();
    GameLoop.addController(yourController);

Add Listeners
-------------
GameLoop provides two arrays (GameLoop.keyPressed and GameLoop.mousepressed)
to store key or mouse events, which will be given as arguments to the update method.

Start the Game
--------------
Start the loop

    GameLoop.start();

Delta Time
-------------
For smooth movement use:

    GameLoop.deltaTime();

Notice
------
GameLoop is still in an early stage of development and may change in future versions.

License
  -
The MIT License (MIT)

  Copyright (c) 2013 Markus Waitl

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.




