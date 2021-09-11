class Net {
    offset = 0.1;
    grid = 20;

    constructor(size, width, height) {
        this._size = size;
        this.screenSize = [width, height]; //.map(x => x * (1 - this.offset * 2));
        
        this._points = new Set();

        this.createNewNet();
    }

    createNewNet() {
        this.points.clear()

        for (let i = 0; i < this.size; i++) {
            let coord = [0, 0];
            for (let j = 0; j < 2; j++) {
                coord[j] = (Math.random() * (1 - this.offset * 2) + this.offset) * this.screenSize[j];
            }

            this._points.add(new Point(...coord));
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