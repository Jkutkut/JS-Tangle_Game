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

        // Reset variables
        this.points.length = 0;
        this.lines.length = 0;

        let startPos = this.screenSize.map(x => x * this.offset);
        let cellSize = this.screenSize.map(x => x * (1 - this.offset * 2) / this.grid);

        let randomChance = () => {
            return Math.random() < (this.size - this.points.length) / this.size;
        };
        let addPoint = (x, y) => {
            this.points.push(new Point(startPos[0] + x * cellSize[0], startPos[1] + y * cellSize[1]));
        };
        let getDepth = (x, y) => {
            return Math.max(Math.abs(center - x), Math.abs(center - y));
        };
        let sigueDesde = (x, y, depth=1) => {
            let currentIndex = this.points.length; // Is going to increment the real length in the next action
            addPoint(x, y);

            // add neighbors

            // Get the min and max values in horizontal and vertical axis
            let startX = (x > 0)? -1 : 0;
            let endX = (x + 1 < this.grid) ? 1 : 0;
            let startY = (y > 0)? -1 : 0;
            let endY = (y + 1 < this.grid)? 1 : 0;

            for (let i = startX; i <= endX; i++) { // For each
                for (let j = startY; j <= endY; j++) {
                    if (i == j) continue;

                    // If coordinates on valid position and valid to place a point
                    if (getDepth(x + i, y + j) == depth && randomChance()) {
                        addPoint(x + i, y + j);
                    }
                }
            }

            // Create the lines
            let maxDist = Point.mag(...cellSize);
            for (let i = currentIndex; i < this.points.length; i++) {
                let p1 = this.points[i];
                for (let j = i + 1; j < this.points.length; j++) {
                    let p2 = this.points[j];
                    
                    // console.log(`${p1.dist(p2)} vs ${maxDist} => ${p1.dist(p2) < maxDist}`);
                    if (p1.dist(p2) < maxDist) {
                        this.lines.push([p1, p2]);
                    }
                }
            }

            for (let i = currentIndex + 1; i < this.points.length; i++) {
                
                // sigueDesde()
            }
        };

        let center = this.grid >> 1;
        sigueDesde(center, center);


        console.log(`Faltan ${this.size - this.points.length}/${this.size}`);


        // let siguientes = [
        //     (x, y) => {
        //         if (y + 1 < this.grid && randomChance()) {
        //             sigueDesde(x, y + 1);
        //         }
        //     },
        //     (x, y) => {
        //         if (x + 1 < this.grid && randomChance()) {
        //             sigueDesde(x + 1, y);
        //         }
        //     }
        // ];
        // let sigueDesde = (x, y) => {
        //     this.points.push(new Point(startPos[0] + x * cellSize[0], startPos[1] + y * cellSize[1]));
            
        //     if (Math.random() < 0.5) {
        //         siguientes[0](x, y);
        //         siguientes[1](x, y);
        //     }
        //     else {
        //         siguientes[1](x, y);
        //         siguientes[0](x, y);
        //     }
        // };

        // // while (this.points.length < this.size) {
        // sigueDesde(0, 0);

        //     attempts--; if (attempts == 0) break;
        // }


        // for (let i = 0; i < this.size;) {
        //     let coord = [0, 0];
        //     for (let j = 0; j < 2; j++) {
        //         coord[j] = ((Math.random() * (this.grid + 1)) << 0) * cellSize[j] + startPos[j];
        //     }

        //     let found = false;
        //     for (let p of this.points) {
        //         if (coord[0] == p.pos[0] && coord[1] == p.pos[1]) {
        //             found = true;
        //             break;
        //         }
        //     }
            
        //     if (!found) {
        //         this._points.push(new Point(...coord));
        //         i++;
        //     }
        // }

        // this._lines = matrix.make.zero(this.size, this.size);
        // for (let i = 0; i < this.size; i++) {
        //     for (let j = 0; j < this.size; j++) {
        //         if (i == j) continue

        //         if (this.points[i].dist(this.points[j]) < 1.5 * cellSize[0]) {
        //             this.lines[i][j] = 1;
        //             this.lines[j][i] = 1;
        //         }
        //     }
        // }
        // for (let i = 0; i < this.size; i ++) {
        //     let p = this.points[i];

        //     let currentDist = []
        //     for (let k = 0; k < (Math.random() * 4 >> 0) + 2; k++) {
        //         currentDist.push({point: null, dist: Infinity});
        //     }

        //     for (let j = 0; j < this.size; j++) {
        //         if (i === j) continue;
                
        //         let p2 = this.points[j];

        //         let d = p.dist(p2);
        //         // console.log(d);

        //         for (let k = 0; k < currentDist.length; k++) {
        //             if (d < currentDist[k].dist) {
        //                 currentDist[k].dist = d;
        //                 currentDist[k].point = p2;
        //                 break;
        //             }
        //         }
        //     }

        //     print(currentDist);

        //     let connected = false;
        //     for (let k = 0; k < currentDist.length; k++) {
        //         let newLine = [...p.pos, ...currentDist[k].point.pos];

        //         let collide = false;
        //         for (let m = 0; m < this.lines.length; m++) {
        //             let currentL = [...this.lines[m][0].pos, ...this.lines[m][1].pos];

        //             if (SegmentCollision.collision(...newLine, ...currentL)) {
        //                 collide = true;
        //                 console.log("collide!")
        //                 break;
        //             }
        //         }

        //         if (!collide) {
        //             this._lines.push([p, currentDist[k].point]);
        //             console.log("Line added");
        //             connected = true;
        //         }
        //     }

        //     if (!connected) {
        //         console.error(`The current node at the index ${i} is not connected`);
        //     }
        // }
            
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