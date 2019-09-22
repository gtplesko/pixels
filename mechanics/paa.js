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
  pixelDensity(1);
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
function pencilTool(draw = true){
  let color = draw ? "#000" : null;
  let x = mouseX/pixelSize>>0;
  let y = mouseY/pixelSize>>0;
  if(mouseX < 0 || mouseX > xRes * pixelSize || mouseY < 0 || mouseY > yRes * pixelSize || prvX == -1 || prvY == -1){
    prvX = x;
    prvY = y;
  }
  let xDif = prvX-x;
  let yDif = prvY-y;
  if(x < xRes && y < yRes && x>=0 && y>=0){
    if(color){currentMatrix[(x)+(y*xRes)]=color;}
    else {delete(currentMatrix[x+(y*xRes)]);}
    if(x < xRes && y < yRes && x >= 0 && y >= 0 && prvX < xRes && prvY < yRes && prvX >= 0 && prvY >= 0 && (xDif > 1 || yDif > 1 || xDif < -1 || yDif < -1)){
      intLine(x,y,prvX,prvY,color);
    }
    if(xsym){
      xs = xsym? xRes-1 - x: x;
      ys = y;
      let pxs = xsym? xRes-1 - prvX: prvX;
      let pys = prvY;
      if(color){currentMatrix[(xs)+(ys*xRes)]=color;}
      else {delete(currentMatrix[xs+(ys*xRes)]);}
      if(xs < xRes && ys < yRes && xs >= 0 && ys >= 0 && pxs < xRes && pys < yRes && pxs >= 0 && pys >= 0 && (xDif > 1 || yDif > 1 || xDif < -1 || yDif < -1)){
        intLine(xs,ys,pxs,pys,color);
      }
    }
    if(ysym){
      xs = x;
      ys = ysym? yRes-1 - y: y;
      let pxs = prvX;
      let pys = ysym? yRes-1 - prvY: prvY;
      if(color){currentMatrix[(xs)+(ys*xRes)]=color;}
      else {delete(currentMatrix[xs+(ys*xRes)]);}
      if(xs < xRes && ys < yRes && xs >= 0 && ys >= 0 && pxs < xRes && pys < yRes && pxs >= 0 && pys >= 0 && (xDif > 1 || yDif > 1 || xDif < -1 || yDif < -1)){
        intLine(xs,ys,pxs,pys,color);
      }
    }
    if(xsym&&ysym){
      xs = xRes-1 - x;
      ys = yRes-1 - y;
      let pxs = xRes-1 - prvX;
      let pys = yRes-1 - prvY;
      if(color){currentMatrix[(xs)+(ys*xRes)]=color;}
      else {delete(currentMatrix[xs+(ys*xRes)]);}
      if(xs < xRes && ys < yRes && xs >= 0 && ys >= 0 && pxs < xRes && pys < yRes && pxs >= 0 && pys >= 0 && (xDif > 1 || yDif > 1 || xDif < -1 || yDif < -1)){
        intLine(xs,ys,pxs,pys,color);
      }
    }
      prvX = x;
      prvY = y;
  }
}
function intLine(x0, y0, x1, y1, color) {
   var dx = Math.abs(x1 - x0);
   var dy = Math.abs(y1 - y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx - dy;

   while(true) {
     if(color){
       currentMatrix[(x0)+(y0*xRes)] = color;
     } else {
       delete(currentMatrix[(x0)+(y0*xRes)]);
     }
      if ((x0 === x1) && (y0 === y1)) break;
      var e2 = 2*err;
      if (e2 > -dy) { err -= dy; x0  += sx; }
      if (e2 < dx) { err += dx; y0  += sy; }
   }
}
function eraseTool(){
  let x = mouseX/pixelSize>>0;
  let y = mouseY/pixelSize>>0;
  if(x < xRes && y < yRes && x>=0 && y>=0){
    delete(currentMatrix[(x)+(y*xRes)])

    // if(xsym){
    //   xs = xsym? xRes - x: x;
    //   ys = y;
    //   delete(currentMatrix[(xs)+(ys*xRes)]);
    // }
    // if(ysym){
    //   xs = x;
    //   ys = ysym? yRes - y: y;
    //   delete(currentMatrix[(xs)+(ys*xRes)]);
    // }
    // if(xsym&&ysym){
    //   xs = xRes - x;
    //   ys = yRes - y;
    //   delete(currentMatrix[(xs)+(ys*xRes)]);
    // }

  }
}
function mouseDragged() {
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
          pencilTool(true);
    }
    if (mouseButton === RIGHT) {
          pencilTool(false);
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
          pencilTool(true);
    }
    if (mouseButton === RIGHT) {
          pencilTool(false);
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
      console.log(currentMatrix[item]);
      delete(currentMatrix[item]);
    }
  });
}

function radialRender(neighbors, x, y, r) {
  let rs = r;
  while (r > 0){
    r--;
    neighbors[x-r][y-r]
  }
}
function seededRandom(seed) {
		var x;
    do {
			x = Math.sin(seed++) * 10000;
      x = x - Math.floor(x);
    } while(x < 0.15 || x > 0.9);
    return (x-0.15) * 1 / 0.75;
}
