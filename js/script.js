// jshint esversion: 6
const input = document.getElementById('input');
const output = document.getElementById('output');
const button = document.getElementById('button');

// Convert HEX to RGB Regex
const hexToRgb = hex => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Convert RGB to UIColor CGColor
const rgbToColorType = rgb => {
  const red = Math.round(rgb.r / 255 * 100) / 100;
  const green = Math.round(rgb.g / 255 * 100) / 100;
  const blue = Math.round(rgb.b / 255 * 100) / 100;
  return `${colorType}(red:${red}, green:${green}, blue:${blue}, alpha:1.0)`;
};

const constructString = hex => {
  const rgb = hexToRgb(hex);
  const colorType = rgbToColorType(rgb);
  return colorType;
};

const getColorArray = () => {
  let str = input.value;
  str = str.replace(/(\r\n|\n|\r)/gm, "");
  str = str.split('#');
  const colorArray = [];

  for (let color of str) {
    if (color.length <= 0) {} else {
      colorArray.push(color);
    }
  }

  return colorArray;
};

//  Display Color
button.addEventListener('click', function () {
  const colors = getColorArray();
  const arr = colors.map(color => {
    const colorTypeStr = constructString(color);
    return `<div class="alertBox" id="alertBox">Color Copied!</div><div class="card" ><span class="color" id="output" style="background-color: #${color}">
    <div  class="container"></div>
    </span><span class="icon icon-copy" alt="icon-copy" onclick="copy_data(select_color)"></span><span style="background-color: #${color}"></span><h2 style="font-size: 16px;margin-left: 17px;">Copy to clipboard:</h2><p id="select_color" >${colorTypeStr}</p></div>`;
  });
  output.innerHTML = arr.join("");
}); 

//  Color Copied Alert
const copy_data = select_color => {
  const range = document.createRange();
  range.selectNode(select_color);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  const alertBox = document.querySelector(".alertBox");
  alertBox.classList.toggle('active');
  setTimeout(function () {
    alertBox.classList.remove('active');
  }, 1000);
};

// Color Picker
const colorPicker = () => {
  var x = document.getElementById("myColor").value;
  document.getElementById("input").value = x;
};

// UIColor colorType radio
document.addEventListener('input',(e)=>{
  if(e.target.getAttribute('name')=="myRadios")
  colorType = e.target.value;
  console.log(colorType);
  });
  
  // color Type Unchecked radio Function
  function radioRefresh() {
    document.getElementById('colorTypeUnchecked').checked = false;
    document.getElementById('colorTypeUnchecked2').checked = false;
  }