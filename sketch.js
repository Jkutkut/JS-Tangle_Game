var mainCanvasWidth, mainCanvasHeight;

var N = 15;
var net;

function setup() {
    mainCanvasWidth = (mainCanvasWidth)? mainCanvasWidth : windowWidth;
    mainCanvasHeight = (mainCanvasHeight)? mainCanvasHeight : Math.min(mainCanvasWidth, windowHeight);

    createCanvas(mainCanvasWidth, mainCanvasHeight);
    frameRate(30);

    net = new Net(N, mainCanvasWidth, mainCanvasHeight);
    
    noLoop();
}


function draw() {
    background(255);

    fill(0);
    stroke(0)

    // Draw line
    // for (let i = 0; i < net.size; i++) {
    //     for (let j = i + 1; j < net.size; j++) {
    //         if (net.lines[i][j] == 1) {
    //             line(...net.points[i].pos, ...net.points[j].pos);
    //         }
    //     }
    // }
    for (let i = 0; i < net.lines.length; i++) {
        line(...net.lines[i][0].pos, ...net.lines[i][1].pos)
    }

    // Draw points
    // for (p of net.points) {    
    //     ellipse(...p.shape);
    // }
    for (let i = 0; i < net.points.length; i++) {
        ellipse(...net.points[i].shape);
    }
    if (pointDragged != null) {
        fill(0, 120, 255);
        ellipse(...pointDragged.shape);
    }
}

function keyPressed() {
}


pointDragged = null;

function mousePressed() {
    let mouse = new Point(mouseX, mouseY);
    for (let i = 0; i < net.points.length; i++) {
        if (mouse.dist(net.points[i]) < Point.radius) {
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
    noLoop();
}