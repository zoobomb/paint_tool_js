const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

/* initial values */
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; // w/o this, img file bg is transparent
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // (x-position, y-position, width, height)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  // console.log(event);
  /* whole screen clientX, clientY */
  /* on canvas offsetX, offsetY */
  const x = event.offsetX;
  const y = event.offsetY;
  //   console.log(x, y);
  if (!painting) {
    // console.log("creating path in ", x, y);
    ctx.beginPath(); // path is line!!
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
    // ctx.closePath(); // fix the start point
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  //   console.log(color);
}

function handleRangeChange(event) {
  const range = event.target.value;
  ctx.lineWidth = range;
  //   console.log(range);
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill ";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  return event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // mouse move event
  canvas.addEventListener("mousedown", startPainting); // mouse click-down event
  canvas.addEventListener("mouseup", stopPainting); // mouse click-up event
  canvas.addEventListener("mouseleave", stopPainting); // mouse leave event
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM); // prevent right-mouse-click
}

// console.log(Array.from(colors));
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
