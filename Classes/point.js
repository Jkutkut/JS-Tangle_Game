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

    // Operations

    dist(p) {
        let delta = this.minus(p);
        return Math.sqrt(delta.x * delta.x + delta.y * delta.y);
    }

    plus(p) {
        return new Point(this.x + p.x, this.y + p.y);
    }

    minus(p) {
        return this.plus(p.times(-1))
    }

    times(n) {
        return new Point(this.x * n, this.y * n);
    }
}