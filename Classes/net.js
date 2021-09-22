class Net {
    offset = 0.1;
    grid = 5;

    constructor(size, width, height) {
        this.screenSize = new Point(width, height);
        this.startPos = this.screenSize.times(this.offset);
        this.cellSize = this.screenSize.times((1 - this.offset * 2) / (this.grid - 1));

        this._size = size; // TODO Useless at the moment
        
        this._points = [];
        this._lines = [];

        this.createNewNet();
        // this.tangleNet();
    }


    /**
     * Creates the points and the lines.
     */
    createNet() {
        if (this.size > this.grid * this.grid) {
            console.error("The size of the net is too great.")
        }

        // Reset variables
        this.points.length = 0;
        this.lines.length = 0;

        

        // points
        for (let i = 0; i < this.grid; i++) {
            for (let j = i; j < this.grid; j++) {
                let x = this.startPos.x + i * this.cellSize.x;
                let y = this.startPos.y + j * this.cellSize.y;
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
     * Creates the points and the lines.
     */
    createNewNet() {
        if (this.size > this.grid * this.grid) {
            console.error("The size of the net is too great.")
        }

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
            return new Point(
                Math.random() * availableSpace.x + this.startPos.y, 
                Math.random() * availableSpace.x + this.startPos.y
            );
        }


        let space = this.cellSize.x;
        const ATTEMPTS = 1000;
        let attempt;

        while(this.points.length < this.size) {
            attempt = 0;
            this.points.length = 0;

            while (this.points.length < this.size && attempt++ < ATTEMPTS) {
                let newPoint = randomPoint();
                let valid = true;
                for (let i = 0; i < this.points.length; i++) {
                    if (newPoint.dist(this.points[i]) < space) {
                        valid = false;
                    }
                }
                if (valid) {
                    this.points.push(newPoint);
                }
            }
        }

        console.log(`Faltan ${this.size - this.points.length}/${this.size}`);
            
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
        let center = this.screenSize[0] >> 1;
        let r = center - this.startPos[0];

        let dTheta = Math.PI * 2 / this.points.length;

        let indices = [];
        for (let i = 0; i < this.points.length; i++) {
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
}