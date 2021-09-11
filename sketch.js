var N = 20;
var points = new Set();

function setup() {
    createCanvas(500, 500);
    frameRate(8);

    points.add(new Point(250, 250));
}


function draw() {
    background(255);

    fill(0);
    stroke(0)

    for (p of points) {    
        ellipse(...p.shape);
        // print(p.shape)
        // ellipse(...p.pos, p.size);
        // print(p)
    }
}

function keyPressed() {
}