class Net {
    offset = 0.1;

    constructor(size, width, height) {
        this.screenSize = new Point(width, height);
        this.startPos = this.screenSize.times(this.offset);
        
        this._size = size;
        this.spacing = (this.screenSize.x / this.size * 2) >> 0;
        
        this._points = [];
        this._lines = [];

        this.createNet();
        this.tangleNet();
    }


    /**
     * Creates the points and the lines.
     */
    createNet() {
        let tries = 1000;

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
                    Math.random() * availableSpace.x + this.startPos.x, 
                    Math.random() * availableSpace.y + this.startPos.y
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
                
                if (tries-- <= 0) {
                    alert("Not able to generate the net :S");
                    throw new Error("Not able to generate the net :S");
                }
                console.log("Failed layout");
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
        let center = new Point(this.screenSize.x >> 1, this.screenSize.y >> 1);
        let r = center.minus(this.startPos);

        let dTheta = Math.PI * 2 / this.size;

        let indices = [];
        for (let i = 0; i < this.size; i++) {
            indices.push(i);
        }

        let i = 0;
        while(indices.length > 0) {
            let ind = (Math.random() * indices.length) >> 0;
            let index = indices.splice(ind, 1)[0];
            
            let x = r.x * Math.cos(dTheta * i) + center.x;
            let y = r.y * Math.sin(dTheta * i) + center.y;

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
    }

    /**
     * This method allows the user to move the points to the original position.
     */
    *solveAnimation(steps) {
        if (this.isValid()) {
            return;
        }

        // Get vectors
        let fraction = 1 / steps;
        let directions = [];
        for (let i = 0; i < this.size; i++) {
            let p = this.points[i];
            let d = p.initialPos.minus(p).times(fraction);

            directions.push(d);
        }; 

        for (let i = 0; i < steps; i++) {
            for (let j = 0; j < this.size; j++) {
                this.points[j].advanceWithDirection(directions[j]);
            }
            yield i;
        }
    }
}