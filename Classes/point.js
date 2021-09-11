class Point {
    radius = 20;

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get pos() {
        return [this.x, this.y];
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get size() {
        return [this.radius, this.radius];
    }

    get shape() {
        return [...this.pos, ...this.size];
    }
}