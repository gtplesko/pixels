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
