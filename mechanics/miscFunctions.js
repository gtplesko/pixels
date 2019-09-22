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
