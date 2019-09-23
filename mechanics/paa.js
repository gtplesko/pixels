let canvas, clear, save;
let pixelSize = 20;
let xRes = 120;
let yRes = 60;
let noise;
let currentMatrix = {};
let grid = true;
let xsym = true;
let ysym = true;
let toolBarWidth = 200;
let alignH = true;
let prvX,prvY = -1;

function setup() {
  canvas = createCanvas(windowWidth-toolBarWidth, windowHeight).canvas;
  if(xRes < yRes){
    alignH = false;
  }
  pixelSize = (alignH ? (width)/xRes : (windowHeight)/yRes);
  noStroke();
}
function windowResized() {
  resizeCanvas(windowWidth-toolBarWidth, windowHeight);
  pixelSize = (alignH ? (windowWidth)/xRes : (windowHeight)/yRes);
}
function clearCanvas(){
  if(confirm('Clear the canvas?')){
    Object.keys(currentMatrix).forEach((item)=>{
      delete(currentMatrix[item]);
    });
  }
}
function saveCanvas(){
  saveCanvas(canvas, 'pixels','png');
}
function mouseDragged() {
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      // console.log(primary.color);
          pencilTool(true, primary.color);
    }
    if (mouseButton === RIGHT) {
          pencilTool(false, secondary.color);
    }

    if (mouseButton === CENTER) {
    }
  }

  return false;
}

// function mouseWheel(event) {
//   //move the square according to the vertical scroll amount
//   pixelSize+= event.delta;
//   return false;
// }
function mouseMoved(){
    prvX = mouseX/pixelSize>>0;
    prvY = mouseY/pixelSize>>0;
    if(prvX > xRes){
      prvX = xRes;
    }else if(prvX < 0){
      prvX = 0;
    }
    if(prvY > yRes){
      prvY = yRes;
    }else if(prvY < 0){
      prvY = 0;
    }
}
// function gridToggle() {
//   grid = this.checked()
// }
// function xsymmetry() {
//   xsym = this.checked()
// }function ysymmetry() {
//   ysym = this.checked()
// }

function draw() {
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
          pencilTool(true, primary.color);
    }
    if (mouseButton === RIGHT) {
          pencilTool(false, secondary.color);
    }

    if (mouseButton === CENTER) {
    }
  }
  background('#fff');
  if(grid){

    stroke(255,0,0);
    if(xsym){
      line(xRes*pixelSize/2, 0, xRes*pixelSize/2, yRes*pixelSize);
    }
    if(ysym){
      line(0, yRes*pixelSize/2, xRes*pixelSize, yRes*pixelSize/2);
    }
    stroke(0);
    line(1,0,pixelSize*xRes,0);
    line(pixelSize*xRes,0,pixelSize*xRes,pixelSize*yRes);
    line(1,0,1,pixelSize*yRes);
    line(pixelSize*xRes,pixelSize*yRes,0,pixelSize*yRes);
    for(i = 0; i < xRes; i++){
      for(j = 0; j < yRes; j++){
        point(i*pixelSize,j*pixelSize);
      }
    }
    noStroke();
  }
  Object.keys(currentMatrix).forEach((item)=>{
    fill(currentMatrix[item]);
    square(item % xRes * pixelSize, floor(item/xRes) * pixelSize, pixelSize);

    if(currentMatrix[item] && currentMatrix[item]==null){
      // console.log(currentMatrix[item]);
      delete(currentMatrix[item]);
    }
  });
}
