var mainCanvasWidth, mainCanvasHeight;

var N = 20;
var net;

function setup() {
    mainCanvasWidth = (mainCanvasWidth)? mainCanvasWidth : windowWidth;
    mainCanvasHeight = (mainCanvasHeight)? mainCanvasHeight : Math.min(mainCanvasWidth, windowHeight);

    createCanvas(mainCanvasWidth, mainCanvasHeight);
    frameRate(8);

    net = new Net(N, mainCanvasWidth, mainCanvasHeight);
}


function draw() {
    background(255);

    fill(0);
    stroke(0)

    for (p of net.points) {    
        ellipse(...p.shape);
    }
}

function keyPressed() {
}