
var canvasHeight = 600;
var canvasWidth = 400;
var blockSize = 10;
var startPtX;
var startPtY;
var currentX;
var currentY;
var filledPts = {};


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(150);
  noStroke();
  fill("red");
  
  randomSeed(87);
  startPtX = cutToBlockSize(random(blockSize, canvasWidth - blockSize));
  startPtY = cutToBlockSize(random(blockSize, canvasHeight - blockSize));
  
  console.log(startPtX, startPtY);
  rect(startPtX, startPtY, blockSize, blockSize);
  saveFilledPt(startPtX, startPtY);
  
  currentX = startPtX;
  currentY = startPtY;
 
}

function draw() {
  
  var choices = [
    [currentX, currentY - blockSize],
    [currentX, currentY + blockSize],
    [currentX - blockSize, currentY],
    [currentX + blockSize, currentY],
  ];
  var chosen = random(choices);
  
  currentX = chosen[0];
  currentY = chosen[1];
  
  rect(currentX, currentY, blockSize, blockSize);
  saveFilledPt(currentX, currentY);
  console.log(filledPts);
}

function cutToBlockSize(num) {
  return num - (num % blockSize);
}

function saveFilledPt(x, y) {
  if (!(x in filledPts)) {
    filledPts[x] = {};
  }
  if (!(y in filledPts[x])) {
    filledPts[x][y] = true;
  }
  filledPts[x][y] = true;
}

/* 
Requirements
- One continous line but branches off
- unless connected to the line, there's always one block of space between the line and the wall
- No squares
- https://twitter.com/arachni_dev/status/1406405092862050309

- pick random starting point on the grid
- loop until no options left
  - figure out all possible moves from current point
  - if there are options, pick one randomly
  - if no options, pick a new point on the line where you can go from
- if there are no options possbile, the line should be complete
*/