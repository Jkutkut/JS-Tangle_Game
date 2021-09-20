class Net {
    offset = 0.1;
    grid = 4;

    constructor(size, width, height) {
        this.screenSize = [width, height];

        this._size = size; // TODO Useless at the moment
        
        this._points = [];
        this._lines = [];

        this.createNet();
    }


    /**
     * This method inits the set of points.
     */
    createNet() {
        if (this.size > this.grid * this.grid) {
            console.error("The size of the net is too great.")
        }

        // Reset variables
        this.points.length = 0;
        this.lines.length = 0;

        let startPos = this.screenSize.map(x => x * this.offset);
        let cellSize = this.screenSize.map(x => x * (1 - this.offset * 2) / (this.grid - 1));

        // points
        for (let i = 0; i < this.grid; i++) {
            for (let j = i; j < this.grid; j++) {
                let x = startPos[0] + i * cellSize[0];
                let y = startPos[1] + j * cellSize[1];
                this.points.push(new Point(x, y));
            }
        }

        // lines
        for (let j = 0, now = this.grid; j < this.points.length;) {
            let extra = 0;
            for (let i = 1; i < now; i++) {
                this.lines.push([this.points[j], this.points[i + j]]);
                extra++;
            }
            now--;
            j += extra + 1;
        }

        let extra = [
            // horizontal

            [1, 4],
            [2, 5],
            [3, 6],

            [5, 7],
            [6, 8],

            [8, 9],

            // diagonals

            [0, 4],
            [1, 5],
            [2, 6],

            [4, 7],
            [5, 8],

            [7, 9]
        ];
        for (let q of extra) {
            this.lines.push([this.points[q[0]], this.points[q[1]]])
        }

    }

    /**
     * This method inits the set of points.
     * 
     * @deprecated
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
            let p = new Point(startPos[0] + x * cellSize[0], startPos[1] + y * cellSize[1]);
            this.points.push(p);
            return p;
        };
        let getDepth = (x, y) => {
            return Math.max(Math.abs(center - x), Math.abs(center - y));
        };
        // let sigueDesde = (x, y, depth=1) => {
        //     let currentIndex = this.points.length; // Is going to increment the real length in the next action
        //     addPoint(x, y);

        //     // add neighbors

        //     // Get the min and max values in horizontal and vertical axis
        //     let startX = (x > 0)? -1 : 0;
        //     let endX = (x + 1 < this.grid) ? 1 : 0;
        //     let startY = (y > 0)? -1 : 0;
        //     let endY = (y + 1 < this.grid)? 1 : 0;

        //     for (let i = startX; i <= endX; i++) { // For each
        //         for (let j = startY; j <= endY; j++) {
        //             if (i == j) continue;

        //             // If coordinates on valid position and valid to place a point
        //             if (getDepth(x + i, y + j) == depth && randomChance()) {
        //                 addPoint(x + i, y + j);
        //             }
        //         }
        //     }

        //     // Create the lines
        //     let maxDist = Point.mag(...cellSize);
        //     for (let i = currentIndex; i < this.points.length; i++) {
        //         let p1 = this.points[i];
        //         for (let j = i + 1; j < this.points.length; j++) {
        //             let p2 = this.points[j];
                    
        //             // console.log(`${p1.dist(p2)} vs ${maxDist} => ${p1.dist(p2) < maxDist}`);
        //             if (p1.dist(p2) < maxDist) {
        //                 this.lines.push([p1, p2]);
        //             }
        //         }
        //     }

        //     for (let i = currentIndex + 1; i < this.points.length; i++) {
                
        //         // sigueDesde()
        //     }
        // };

        let center = this.grid >> 1;
        // sigueDesde(center, center);
        addPoint(center, center);

        let depth = 1;
        while (this.points.length < this.size && depth < this.grid - 1) {
            // sides
            for (let i = -1; i <= 1; i += 2) {
                let newX = center + depth * i;
                let prev;
                for (let j = -depth; j <= depth; j++) {
                    let newY = center + j;
                    // console.log([newX, newY]);
                    if (!randomChance()) {
                        continue;
                    }

                    let p = addPoint(newX, newY);

                    // if (prev) {
                    //     this.lines.push([prev, p]);
                    // }
                    // prev = p;
                }
            } 
            depth++;
        }


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

    // Tangle logic

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
                    let collisionPoint = new Point(c.x, c.y);
                    console.log(c);

                    console.log([l, l2]);
                    
                    // * debug draw
                    push();
                    fill(255,0,0);
                    stroke(255,0,0);
                    
                    // point
                    ellipse(...collisionPoint.shape);

                    // lines
                    line(...l[0].pos, ...l[1].pos);
                    line(...l2[0].pos, ...l2[1].pos);
                    pop();
                    return false;
                }
            }
        }

        return true;
    }
}