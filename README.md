GameLoopJS
==========

Introduction
------------
There is nothing fancy about it, GameLoop  just calls ***update()*** and ***render()*** of added Objects by defined frames per second.
The default frames per second are 30, you can change it by calling:
```javascript
GameLoop.fps(60);
```
How To Use:
----------
Lets start with creating the basic HTML:

```html
<html>
  <head>
    <title>Basic HTML</title>
    <script src="gameloop.min.js"></script>
    <!-- your scripts -->
  </head>
  <body>
    <canvas height="640" width="480" id="yourCanvasId"></canvas>
  </body>
</html>
```

Initialize GameloopJS
```javascript
GameLoop.init('yourCanvasId');
```

Add game objects
-------------------------------
Like mentioned before ***GameLoop*** mainly takes care of the update circles.
So your object should have the two functions ***update*** and ***render***.

Update will be called before render.
```javascript

// Example: Bouncing Box
// @desc    red square that moves 
//          down until it hits the canvas height
//          or up until it hits the 0 point of the canvas

var YourObject = function() {
    
    var render, 
        update,
        position,
        speed = 1;
        
    position = {
    	x: 50,
    	y: 50
    };

    render = function() {
            
        var ctx       = GameLoop.context();
        ctx.fillStyle = "red";
    
        ctx.fillRect(this.position.x,this.position.y,50,50);
    };

    update = function() {

        canvas = GameLoop.canvas();

        if(position.y >= canvas.height - 50 /* height of the rectangle */){
            speed = -1;
        } else if(position.y <= 0){
            speed = 1;
        }

        this.position.y += speed * GameLoop.deltaTime();
    };

    return {
        render: render,
        update: update
    };
    
};
```
Now all you have to do is to create an instance of our new Object and add it to the GameLoop

```javascript
// add your object
var yourObject = new YourObject();
GameLoop.addObject(yourObject);
```

Start the Game
--------------
Start the loop
```javascript
GameLoop.start();
```

Stop the Game
--------------
Stop the loop
```javascript
GameLoop.stop();
```

Parameters
-------------
For smooth movement use ***deltaTime()***:
```javascript
GameLoop.deltaTime();
```

***Canvas***:
```javascript
var canvas = GameLoop.canvas();
```

***Context***:
```javascript
var ctx = GameLoop.context();
```

Notice
------
GameLoopJS is still in an early stage of development and may change in future versions.

License
------
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
