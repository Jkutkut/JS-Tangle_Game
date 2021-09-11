class Net {
    constructor(size=10) {
        this._size = size;
        
        var points = new Set();

        this.createNewNet();
    }

    createNewNet() {
        this.points.clear()
    }

    get points() {
        return this._points;
    }
}