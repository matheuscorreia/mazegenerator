var config = function (p){

  p.setup = function (){
    this.createCanvas(cols * w, rows * w);

    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var cell = new Cell(x, y, this);
        grid.push(cell);
      }
    }

    current = grid[0];
  };

  p.draw = function () {

    current.visited = true;
    current.highlight();

    for (var i = 0; i < grid.length; i++) {
      grid[i].show();
    }

    var next = current.checkNeighbors();
    if(next){
      stack.push(current);
      current.removeWallBetween(next);
      current = next;
    }else{
      current = stack.pop();
      if(current === undefined){
        this.noLoop();
      }
    }
  };
};
