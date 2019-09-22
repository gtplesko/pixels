Class layer = function (){
  constructor(_priority, _width, _height, _xOffset = 0, _yOffset = 0, _data = {}){
    this.priority = _priority;
    this.x = _width;
    this.y = _height;
    this.xOff = _xOffset;
    this.yOff = _yOffset;
    this.data = _data;
    this.blend = 'BLEND';
  }
  this.blendTypes = [
    'BLEND', 'DARKEST', 'LIGHTEST', 'DIFFERENCE',
    'MULTIPLY', 'EXCLUSION', 'SCREEN', 'REPLACE',
    'OVERLAY', 'HARD_LIGHT', 'SOFT_LIGHT', 'DODGE',
    'BURN', 'ADD', 'SUBTRACT'];
  show(pixelSize){
    blendMode(this.blend);
    Object.keys(this.data).forEach((item)=>{
      if(this.data[item] && this.data[item]==null){
        console.log(this.data[item]);
        delete(this.data[item]);
        break;
      }
      fill(this.data[item]);
      square(item % this.x * pixelSize, floor(item/this.x) * pixelSize, pixelSize);
    });
    blendMode('blend'); // reset to default blend mode
  }

}
