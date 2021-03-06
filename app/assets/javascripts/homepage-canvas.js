const CANVAS_BORDER_WIDTH = 15;
const CANVAS_SIZE = 670;

const canvas = document.getElementById('home-page__header__canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4;
ctx.strokeStyle = '#2A2A2A';

let shouldDrawBacktrace = false;
let lastX;
let lastY;


/**
 * draw path between two points (x1, y1) and (x2, y2)
 */
function drawPath(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}


/**
 * When the 'mouseenter' DOM event is triggered, the coordinates
 * registered are already inside the element. As such, in order
 * to draw a path extending to the edge of the canvas, we need to
 * extrapolate a point ("theta") guaranteed to be outside the canvas
 * and draw a line from the first observed path point within the canvas
 * to theta.
 *
 * This is achieved in this manner:
 * 1) calculate absolute values of differences between x and y coords
 * 2) take the smallest nonzero value of the two - thetaBasis
 * 3) divide canvas size by thetaBasis - thetaFactor
 * 4) calculate theta x and y values by multiplying thetaFactor
 *    by xDiff and yDiff (not abs vals) between original two points
 *    and adding each of those factors to corresponding x and y
 *    coordinates of (x1, y1)
 * 5) draw path from first point to theta
 *
 * The above procedure ensures that theta will be a point outside
 * of the canvas, and we draw a path from the first path point registered
 * inside the canvas to that point.
 */
function drawBacktrace(x1, y1, x2, y2) {
  // step 1
  const xDiff = x2 - x1;
  const yDiff = y2 - y1;
  const xDiffAbs = Math.abs(xDiff);
  const yDiffAbs = Math.abs(yDiff);

  // step 2
  // use smallest nonzero dimension as demoninator to ensure we go off canvas
  let thetaBasis = xDiffAbs - yDiffAbs >= 0 ? yDiffAbs : xDiffAbs;
  thetaBasis = thetaBasis || yDiffAbs || xDiffAbs;

  // step 3
  // find the factor by which to multiply x and y dimensions
  const thetaFactor = Math.floor(CANVAS_SIZE / thetaBasis)

  // step 4
  // calculate theta x and y values
  const thetaX = x1 - thetaFactor * xDiff;
  const thetaY = y1 - thetaFactor * yDiff;

  // step 5
  // draw path from first point to theta
  drawPath(x1, y1, thetaX, thetaY);
}


/**
 * register new lastX and lastY when mouse enters
 * and queue up flag to draw backtrace
 */
function onMouseEnter(event) {
  lastX = event.layerX - CANVAS_BORDER_WIDTH;
  lastY = event.layerY - CANVAS_BORDER_WIDTH;
  shouldDrawBacktrace = true;
}


/**
 * draw path from lastX and lastY to point registered
 * when cursor leaves canvas, and reset lastX and lastY
 */
function onMouseLeave(event) {
  const x = event.layerX - CANVAS_BORDER_WIDTH;
  const y = event.layerY - CANVAS_BORDER_WIDTH;

  // by the time the DOM event is triggered, the x and y
  // coordinates registered fall outside of the element
  // so we can simply draw from last coords to event coords
  drawPath(lastX, lastY, x, y);

  lastX = null;
  lastY = null;
}


/**
 * draw path between the last registered point and the point
 * currently registered in triggered mousemove DOM event.
 * draw backtrace if needed.
 */
function onMouseMove(event) {
  const x = event.layerX - CANVAS_BORDER_WIDTH;
  const y = event.layerY - CANVAS_BORDER_WIDTH;

  // upon cursor entering the canvas, the 'mouseenter' and 'mousemove'
  // events both trigger, registering the same point.  We need to make
  // sure that two different points are registered from which we extrapolate
  // a back-tracing trajectory.
  if (lastX === x && lastY === y) {
    return;
  }

  // draw path from last registered point to current
  drawPath(lastX, lastY, x, y);

  // if first entering canvas, need to draw an extrapolated
  // backtracing path along the line defined by the last and
  // current registered points
  if (shouldDrawBacktrace) {
    drawBacktrace(lastX, lastY, x, y);
    shouldDrawBacktrace = false;
  }

  lastX = x;
  lastY = y;
}

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseenter', onMouseEnter);
canvas.addEventListener('mouseleave', onMouseLeave);
