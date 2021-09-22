class Net {
    offset = 0.1;

    constructor(size, width, height) {
        this.screenSize = new Point(width, height);
        this.startPos = this.screenSize.times(this.offset);
        
        this._size = size;
        this.spacing = (this.screenSize.x / this.size * 2) >> 0;
        print(this.spacing)

        
        this._points = [];
        this._lines = [];

        this.createNet();
        // this.tangleNet();
    }


    /**
     * Creates the points and the lines.
     */
    createNet() {
        do { // TODO Find a more efficient method to create the network
            // Reset variables
            this.points.length = 0;
            this.lines.length = 0;


            let availableSpace = new Point(
                this.screenSize.x - 2 * this.startPos.x,
                this.screenSize.y - 2 * this.startPos.y
            );
            /**
             * @returns a random point inside the screen
             */
            let randomPoint = () => {
                return new PointNode(
                    Math.random() * availableSpace.x + this.startPos.y, 
                    Math.random() * availableSpace.x + this.startPos.y
                );
            }

            // let space = this.cellSize.x;
            const ATTEMPTS = 1000;
            let attempt;

            while(this.points.length < this.size) { // Create the points
                attempt = 0;
                this.points.length = 0;

                while (this.points.length < this.size && attempt++ < ATTEMPTS) {
                    let newPoint = randomPoint();
                    let valid = true;
                    for (let i = 0; i < this.points.length; i++) {
                        if (newPoint.dist(this.points[i]) < this.spacing) {
                            valid = false;
                            break;
                        }
                    }
                    if (valid) {
                        this.points.push(newPoint);
                    }
                }
            }        

            for (let i = 0; i < this.size; i++) {
                let p1 = this.points[i];
                const MAX = (Math.random() * 2 >> 0) + 2;


                let closePoints = []; // This array will have the length = max
                closePoints.length = MAX;
                for (let j = 0; j < this.size; j++) {
                    if (i == j) continue;

                    let p2 = this.points[j];
                    let dist = p1.dist(p2);

                    for (let k = 0; k < closePoints.length; k++) { // Attempt to insert p2 into the array
                        if (!closePoints[k] || closePoints[k].dist > dist) {
                            closePoints.splice(k, 0, {point: p2, dist: dist});
                            closePoints.length = MAX;
                            break;
                        }
                    }
                }

                for (let k = 0; k < closePoints.length; k++) {
                    let alreadyMade = false;
                    for (let q = 0; q < this.lines.length; q++) {// Check not already in
                        if (this.lines[q][0] == closePoints[k].point && this.lines[q][1] == p1) {
                            alreadyMade = true;
                            break;
                        }
                    }

                    if (!alreadyMade) {
                        this.lines.push([p1, closePoints[k].point]);
                        p1.addConnection(closePoints[k].point);
                        closePoints[k].point.addConnection(p1);
                    }
                }
            }
        } while(!this.isValid() || !this.isFullyConnected());
    }

    // GETTERS
    get size() {
        return this._size;
    }

    get points() {
        return this._points;
    }

    get lines() {
        return this._lines;
    }

    // SETTERS

    // Tangle logic

    /**
     * Shuffles the current net, placing all the points forming a circle.
     */
    tangleNet() {
        let center = this.screenSize.x >> 1
        let r = center - this.startPos.x;

        let dTheta = Math.PI * 2 / this.size;

        let indices = [];
        for (let i = 0; i < this.size; i++) {
            indices.push(i);
        }

        let i = 0;
        while(indices.length > 0) {
            let ind = (Math.random() * indices.length) >> 0;
            let index = indices.splice(ind, 1)[0];
            
            let x = r * Math.cos(dTheta * i) + center;
            let y = r * Math.sin(dTheta * i) + center;

            this.points[index].moveTo(x, y);
            i++;
        }
    }

    isValid() {
        // TODO Optimice code (now O(N^2))

        for (let i = 0; i < this.lines.length; i++) {
            let l = this.lines[i];
            let p1 = l[0].pos;
            let p2 = l[1].pos;

            for (let j = i + 1; j < this.lines.length; j++) {
                let l2 = this.lines[j];
                let p3 = l2[0].pos;
                let p4 = l2[1].pos;

                let c = SegmentCollision.intersection(...p1, ...p2, ...p3, ...p4);
                if (c != false) {
                    // let collisionPoint = new Point(c.x, c.y);
                    // console.log(c);

                    // console.log([l, l2]);
                    
                    // // * debug draw
                    // push();
                    // fill(255,0,0);
                    // stroke(255,0,0);
                    
                    // // point
                    // ellipse(...collisionPoint.shape);

                    // // lines
                    // line(...l[0].pos, ...l[1].pos);
                    // line(...l2[0].pos, ...l2[1].pos);
                    // pop();
                    return false;
                }
            }
        }
        return true;
    }

    isFullyConnected() {
        let queue = new Set();
        let seen = new Set();
        let current;

        queue.add(this.points[0]);
        while (queue.size > 0) {
            current = queue.entries().next().value[0];
            queue.delete(current);

            for (let p of current.connections) {
                if (!seen.has(p)) {
                    queue.add(p);
                }
            }
            seen.add(current);
        }

        return seen.size == this.size;
        // Debug code
        // console.error(`${this.size - seen.size} nodes missing :(`);

        // for (let p of seen) {
        //     push()
        //     fill(255,0,0);
        //     ellipse(...p.shape);
        //     pop();
        // }
        return false;
    }
}