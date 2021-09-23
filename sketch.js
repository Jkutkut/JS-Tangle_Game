var mainCanvasWidth;
var mainCanvasHeight;

var N = 5;
var net;

var animation;
const animationTime = 100;
const animationFrameRate = 30;

/**
 * Create the canvas and the net.
 */
function setup() {
    mainCanvasWidth = windowWidth * 0.995;
    mainCanvasHeight = windowHeight * 0.995;
    
    createCanvas(mainCanvasWidth, mainCanvasHeight);
    frameRate(30);

    net = new Net(N, mainCanvasWidth, mainCanvasHeight);

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

function resetLevel() {
    net = new Net(N, mainCanvasWidth, mainCanvasHeight);
    fill(0);
    draw();
}

function restartLevel() {
    net.createNet();
    net.tangleNet();
    draw()
}

function keyPressed() {
    if (key === "r") { // If r pressed, reset the net
        restartLevel();
    }
    else if (key === "s") { // Solve
        frameRate(animationFrameRate);
        loop();
        animation = net.solveAnimation(animationTime);
    }
    else if (key == "n") {
        let newN = parseInt(prompt("How many points?", N), 10);
        if (/^[0-9]+$/.test(newN)) { // If integer given
            N = newN;
            resetLevel();
        }
        else {
            alert("Not valid! It must be an integer!")
        }
    }
    else if (key == " " && net.isValid()) { // If space pressed and net untangled, go to the next.
        N++;
        resetLevel();
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
    if (animation)  {
        mouseReleased();
    }

    if (pointDragged != null) {
        pointDragged.moveTo(mouseX, mouseY);
    }
}
  
function mouseReleased() {
    pointDragged = null;

    if (animation) return;
    checkIsValid();
    noLoop();
}

var initialN = N;
function checkIsValid() {
    if (net.isValid()) {
        fill(0, 255, 70);
        if (N == initialN) {
            alert("Niiice! Press space to go to the next level.\n\n(You can see the rest of the controls here:\nhttps://github.com/Jkutkut/JS-Tangle_Game)");
        }
    }
    else {
        fill(0);
    }
}