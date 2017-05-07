var cols,rows;
var w = 40;
var grid = [];

var current;

function setup(){
  createCanvas(400,400);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(5);

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var cell = new Cell(x,y);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw(){
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  var next = current.checkNeighbors();
  if(next){
    next.visited;
    current = next;
  }
}

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.visited = false;
  this.walls = {
    top: true,
    right: true,
    bottom: true,
    left: true
  };

  this.checkNeighbors = function () {
    var neighbors = [];

    var leftNeighbor;
    var rightNeighbor;
    var topNeighbor;
    var bottomNeighbor;

    if(this.x === 0){
      leftNeighbor = null;
    }
    if(this.x === cols){
      rightNeighbor = null;
    }
    if(this.y === 0){
      topNeighbor = null;
    }
    if(this.y === rows){
      bottomNeighbor = null;
    }

    var thisIndex = (this.y * cols + this.x);

    leftNeighbor    = leftNeighbor === undefined ? thisIndex - 1 : null;
    rightNeighbor   = rightNeighbor === undefined  ? thisIndex + 1 : null;
    topNeighbor     = topNeighbor === undefined ? thisIndex - (cols + 1) : null;
    bottomNeighbor  = bottomNeighbor === undefined ? thisIndex + (cols + 1) : null;

    console.log(leftNeighbor,rightNeighbor,topNeighbor,bottomNeighbor);

    if(topNeighbor && !grid[topNeighbor].visited) {
      neighbors.push(grid[topNeighbor]);
    }
    if(rightNeighbor && !grid[rightNeighbor].visited) {
      neighbors.push(grid[rightNeighbor]);
    }
    if(bottomNeighbor && !grid[bottomNeighbor].visited) {
      neighbors.push(grid[bottomNeighbor]);
    }
    if(leftNeighbor && !grid[leftNeighbor].visited) {
      neighbors.push(grid[leftNeighbor]);
    }

    if(neighbors.length > 0){
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    }else{
      return undefined;
    }

  }

  this.show = function() {
    var x = this.x * w;
    var y = this.y * w;

    var topLeft     = {x: x       , y: y}
    var topRight    = {x: x + w   , y: y}
    var bottomRight = {x: x + w   , y: y + w}
    var bottomLeft  = {x: x       , y: y + w}

    stroke(255);

    if(this.walls.top)
      line(topLeft.x, topLeft.y, topRight.x, topRight.y);
    if(this.walls.right)
      line(topRight.x, topRight.y, bottomRight.x, bottomRight.y);
    if(this.walls.bottom)
      line(bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y);
    if(this.walls.left)
      line(bottomLeft.x, bottomLeft.y, topLeft.x, topLeft.y);

    if(this.visited) {
      fill(255,0,255,100);
      rect(x,y,w,w);
    }

  }
}
