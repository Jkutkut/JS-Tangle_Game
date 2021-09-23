var mainCanvasSize;

var N = 5;
var net;

var animation;
const animationTime = 100;
const animationFrameRate = 30;

/**
 * Create the canvas and the net.
 */
function setup() {
    mainCanvasSize = Math.min(windowWidth, windowHeight);
    
    createCanvas(mainCanvasSize, mainCanvasSize);
    frameRate(30);

    net = new Net(N, mainCanvasSize, mainCanvasSize);

    fill(0);
    stroke(0);
    
    noLoop();
}


/**
 * Clear the canvas, draw the lines and the points.
 */
function draw() {
    background(255);

    // Draw lines
    for (let i = 0; i < net.lines.length; i++) {
        line(...net.lines[i][0].pos, ...net.lines[i][1].pos)
    }

    // Draw points
    for (let i = 0; i < net.points.length; i++) {
        ellipse(...net.points[i].shape);
    }
    if (pointDragged != null) {
        push();
        fill(0, 120, 255);
        ellipse(...pointDragged.shape);
        pop();
    }

    if (animation) {
        if (animation.next().done) {
            animation = undefined;
            noLoop();
            checkIsValid();
            draw();
        }
    }
}

function keyPressed() {
    if (key === "r") { // If r pressed, reset the net
        net.createNet();
        net.tangleNet();
        draw()
    }
    else if (key === "s") {
        frameRate(animationFrameRate);
        loop();
        animation = net.solveAnimation(animationTime);
    }
    else if (key == " " && net.isValid()) { // If space pressed and net untangled, go to the next.
        net = new Net(++N, mainCanvasWidth, mainCanvasHeight);
        fill(0);
        draw();
    }
}


pointDragged = null; // * When null, there's no point dragged. Else, the content is the point dragged.

function mousePressed() {
    let mouse = new Point(mouseX, mouseY);
    for (let i = 0; i < net.points.length; i++) {
        if (mouse.dist(net.points[i]) < Point.radius * 1.2) { // If mouse near point
            pointDragged = net.points[i];
            loop();
            return; // Stop looking
        }
    }
    pointDragged = null;
}
  
function mouseDragged() {
    if (pointDragged != null) {
        pointDragged.moveTo(mouseX, mouseY);
    }
}
  
function mouseReleased() {
    pointDragged = null;

    checkIsValid();
    noLoop();
}

function checkIsValid() {
    if (net.isValid()) {
        fill(0, 255, 70);
    }
    else {
        fill(0);
    }
}