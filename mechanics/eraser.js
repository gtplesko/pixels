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
