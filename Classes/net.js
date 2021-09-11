class Net {
    offset = 0.1;
    grid = 5;

    constructor(size, width, height) {
        this.screenSize = [width, height];

        this._size = size;
        
        this._points = new Set();

        this.createNewNet();
    }

    /**
     * This method inits the set of points
     */
    createNewNet() {
        if (this.size > this.grid * this.grid) {
            console.error("The size of the net is too great.")
        }
        this.points.clear()

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
                this._points.add(new Point(...coord));
                i++;
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
}