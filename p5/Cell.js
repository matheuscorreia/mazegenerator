function Cell(x, y, p5) {
  this.p5 = p5;
  this.x = x;
  this.y = y;
  this.visited = false;
  this.walls = {
    top: true,
    right: true,
    bottom: true,
    left: true
  };

  this.highlight = function () {
    var x = this.x * w;
    var y = this.y * w;
    this.p5.noStroke();
    this.p5.fill(0,0,255,100)
    this.p5.rect(x,y,w,w);
  }

  this.getGridIndex = function () {
    return (this.y * cols) + this.x;
  }

  this.removeWallBetween = function (n) {
    var thisIndex = this.getGridIndex();
    var nIndex = n.getGridIndex();

    var diff = thisIndex - nIndex;

    if(diff % cols === 0){
      //top or bottom
      if(diff > 0){
        //top
        this.walls.top = false;
        grid[nIndex].walls.bottom = false;
      }else{
        //Bottom
        this.walls.bottom = false;
        grid[nIndex].walls.top = false;
      }
    }else{
      //left or right
      if(diff > 0){
        //left
        this.walls.left = false;
        grid[nIndex].walls.right = false;
      }else{
        //right
        this.walls.right = false;
        grid[nIndex].walls.left = false;
      }
    }
  }


  this.checkNeighbors = function () {
    var neighbors = [];

    var x = this.x;
    var y = this.y;

    var thisIndex = this.getGridIndex();

    var hasTop    = !(y === 0)           ? (thisIndex - cols) : false;
    var hasRight  = !(x === (cols - 1))  ? (thisIndex + 1) : false;
    var hasBottom = !(y === (rows - 1))  ? (thisIndex + cols) : false;
    var hasLeft   = !(x === 0)           ? (thisIndex - 1) : false;

    if(hasTop !== false && !grid[hasTop].visited){
      neighbors.push(grid[hasTop]);
    }
    if(hasRight !== false && !grid[hasRight].visited){
      neighbors.push(grid[hasRight]);
    }
    if(hasBottom !== false && !grid[hasBottom].visited){
      neighbors.push(grid[hasBottom]);
    }
    if(hasLeft !== false && !grid[hasLeft].visited){
      neighbors.push(grid[hasLeft]);
    }

    if(neighbors.length > 0){
      return this.p5.random(neighbors);
    }else{
      return undefined;
    }

  }

  this.show = function() {
    // For purposes of rendering, x and y in this method refer to the coordinates in screen

    var x = this.x * w;
    var y = this.y * w;

    var topLeft     = {x: x       , y: y}
    var topRight    = {x: x + w   , y: y}
    var bottomRight = {x: x + w   , y: y + w}
    var bottomLeft  = {x: x       , y: y + w}

    this.p5.strokeWeight(1);
    this.p5.stroke(255);

    if(this.walls.top){
      this.p5.line(topLeft.x, topLeft.y, topRight.x, topRight.y);
    }
    if(this.walls.right){
      this.p5.line(topRight.x, topRight.y, bottomRight.x, bottomRight.y);
    }
    if(this.walls.bottom){
      this.p5.line(bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y);
    }
    if(this.walls.left){
      this.p5.line(bottomLeft.x, bottomLeft.y, topLeft.x, topLeft.y);
    }

    if(this.visited) {
      this.p5.noStroke();
      this.p5.fill(255,0,255,100);
      this.p5.rect(x,y,w,w);
    }



  }

}
