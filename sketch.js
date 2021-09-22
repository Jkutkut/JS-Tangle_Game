var mainCanvasWidth, mainCanvasHeight;

var N = 15;
var net;

function setup() {
    mainCanvasWidth = (mainCanvasWidth)? mainCanvasWidth : windowWidth;
    mainCanvasHeight = (mainCanvasHeight)? mainCanvasHeight : Math.min(mainCanvasWidth, windowHeight);

    createCanvas(mainCanvasWidth, mainCanvasHeight);
    frameRate(30);

    net = new Net(N, mainCanvasWidth, mainCanvasHeight);


    fill(0);
    stroke(0);
    
    noLoop();
}


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
}

function keyPressed() {
}


pointDragged = null;

function mousePressed() {
    let mouse = new Point(mouseX, mouseY);
    for (let i = 0; i < net.points.length; i++) {
        if (mouse.dist(net.points[i]) < Point.radius * 1.2) {
            pointDragged = net.points[i];
            loop();
            return;
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