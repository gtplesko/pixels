
var primary = {
 colorValue: '#000000',
 updateColor() {
   document.getElementById('Foreground').value =  this.color;
 },
 get color() {
   return this.colorValue;
 },
 set color(colorVal) {
   this.colorValue = colorVal;
   this.updateColor();
 }
}
var secondary = {
  colorValue: '#000000',
  updateColor() {
    document.getElementById('Background').value =  this.color;
  },
  get color() {
    return this.colorValue;
  },
  set color(colorVal) {
    this.colorValue = colorVal;
    this.updateColor();
  }
}
function selectTool(id){
  let btnContainer = document.getElementById("toolbar");
  let btns = btnContainer.getElementsByClassName("btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("selected");
      current[0].className = current[0].className.replace(" selected", "");
      this.className += " selected";
    });
  }
}
function changeColor(main = true, color){ // FIX ADDING IN EXTRA #
  if(main){
    primary.color = '#'+color;
    document.getElementById('Foreground').style.background = "#" + color
    document.getElementById('Foreground').style.color = "#" + invertHex(color);
    console.log(invertHex(color));
  } else{
    secondary.color = '#'+color;
    document.getElementById('Background').style = "background-color: #" + color;
    document.getElementById('Foreground').style.color = "#" + invertHex(color);
  }
  // console.log(main, primary.color, secondary.color);
}
function invertHex(hex) {
  // console.log(hex);
  return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
}
function palletePick(e, c){
  console.log(e, e.button);
    if(e.button == 0){
      primary.color = c;
    }else if (e.button ==2) {
      secondary.color = c;
    }else{
      primary.color = c;
      secondary.color = c;
    }
}
function loadPallete(id){
  let target = document.getElementById("swatchList");
  target.innerHTML = "";
  for(i in palleteList[id]){
    target.innerHTML+='<li class="swatch" value="'+palleteList[id][i]+'" style="background-color:'+palleteList[id][i]+'" onmousedown="palletePick(event, \''+palleteList[id][i]+'\')"></li>';
  }
  // target.innerHTML+='<li id="add" class="swatch">+</li>';
}

let gameBoy = ["#c4cfa1", "#8b956d", "#4d533c", "#1f1f1f"];
let commodore64 = ["#000000", "#626262", "#898989", "#adadad", "#ffffff",
"#9f4e44", "#cb7e75", "#6d5412", "#a1683c", "#c9d487", "#9ae29b", "#5cab5e",
"#6abfc6", "#887ecb", "#50459b", "#a057a3"];
let nykra = ["#be4a2f", "#d77643", "#ead4aa", "#e4a672", "#b86f50", "#733e39",
"#3e2731", "#a22633", "#e43b44", "#f77622", "#feae34", "#fee761", "#63c74d",
"#3e8948", "#265c42", "#193c3e", "#124e89", "#0099db", "#2ce8f5", "#ffffff",
"#c0cbdc", "#8b9bb4", "#5a6988", "#3a4466", "#262b44", "#181425", "#ff0044",
"#68386c", "#b55088", "#f6757a","#e8b796", "#c28569"];
let palleteList = [gameBoy, commodore64, nykra];
