var mainCanvasWidth, mainCanvasHeight;

var N = 10;
var net;

function setup() {
    mainCanvasWidth = (mainCanvasWidth)? mainCanvasWidth : windowWidth;
    mainCanvasHeight = (mainCanvasHeight)? mainCanvasHeight : Math.min(mainCanvasWidth, windowHeight);

    createCanvas(mainCanvasWidth, mainCanvasHeight);
    frameRate(8);

    net = new Net(N, mainCanvasWidth, mainCanvasHeight);
    
    noLoop();
}


function draw() {
    background(255);

    fill(0);
    stroke(0)

    for (p of net.points) {    
        ellipse(...p.shape);
    }

    for (let i = 0; i < net.size; i++) {
        for (let j = i + 1; j < net.size; j++) {
            if (net.lines[i][j] == 0) {
                line(...net.points[i].pos, ...net.points[j].pos);
            }
        }
    }
}

function keyPressed() {
}