class Net {
    offset = 0.1;
    grid = 5;

    constructor(size, width, height) {
        this.screenSize = [width, height];

        this._size = size;
        
        this._points = [];
        this._lines = [];

        this.createNewNet();
    }

    /**
     * This method inits the set of points
     */
    createNewNet() {
        if (this.size > this.grid * this.grid) {
            console.error("The size of the net is too great.")
        }
        this.points.length = 0;

        let startPos = this.screenSize.map(x => x * this.offset);
        let cellSize = this.screenSize.map(x => x * (1 - this.offset * 2) / this.grid);

        for (let i = 0; i < this.size;) {
            let coord = [0, 0];
            for (let j = 0; j < 2; j++) {
                coord[j] = ((Math.random() * (this.grid + 1)) << 0) * cellSize[j] + startPos[j];
            }

            let found = false;
            for (let p of this.points) {
                if (coord[0] == p.pos[0] && coord[1] == p.pos[1]) {
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                this._points.push(new Point(...coord));
                i++;
            }
        }

        // this._lines = matrix.make.zero(this.size, this.size);
        this._lines = [];
        // for (let i = 0; i < this.size; i++) {
        //     for (let j = 0; j < this.size; j++) {
        //         if (i == j) continue

        //         if (this.points[i].dist(this.points[j]) < 1.5 * cellSize[0]) {
        //             this.lines[i][j] = 1;
        //             this.lines[j][i] = 1;
        //         }
        //     }
        // }
        for (let i = 0; i < this.size; i ++) {
            let p = this.points[i];

            let currentDist = []
            for (let k = 0; k < (Math.random() * 4 >> 0) + 2; k++) {
                currentDist.push({point: null, dist: Infinity});
            }

            for (let j = 0; j < this.size; j++) {
                if (i === j) continue;
                
                let p2 = this.points[j];

                let d = p.dist(p2);
                // console.log(d);

                for (let k = 0; k < currentDist.length; k++) {
                    if (d < currentDist[k].dist) {
                        currentDist[k].dist = d;
                        currentDist[k].point = p2;
                        break;
                    }
                }
            }

            print(currentDist);

            let connected = false;
            for (let k = 0; k < currentDist.length; k++) {
                let newLine = [...p.pos, ...currentDist[k].point.pos];

                let collide = false;
                for (let m = 0; m < this.lines.length; m++) {
                    let currentL = [...this.lines[m][0].pos, ...this.lines[m][1].pos];

                    if (SegmentCollision.collision(...newLine, ...currentL)) {
                        collide = true;
                        console.log("collide!")
                        break;
                    }
                }

                if (!collide) {
                    this._lines.push([p, currentDist[k].point]);
                    console.log("Line added");
                    connected = true;
                }
            }

            if (!connected) {
                console.error(`The current node at the index ${i} is not connected`);
            }
        }
            
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
    updateLines() {

    }
}