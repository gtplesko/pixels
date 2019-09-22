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
function changeColor(main = true){
  let parent = document.querySelector(main ? '#Color-Front' : '#Color-Back');
  let picker = new Picker(parent);

  picker.onDone = function(color) {
      parent.style.background = color.rgbaString;
  };
}
