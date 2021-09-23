class Point {
    static radius = 20;

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    // GETTERS

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
        return [Point.radius, Point.radius];
    }

    get shape() {
        return [...this.pos, ...this.size];
    }

    // SETTERS

    moveTo(x, y) {
        this._x = x;
        this._y = y;
    }

    advance(x, y) {
        this._x += x;
        this._y += y;
    }

    advanceWithDirection(p) {
        this.checkPoint(p);
        this.advance(p.x, p.y);
    }


    // Operations

    dist(p) {
        this.checkPoint(p);
        let delta = this.minus(p);
        return delta.mag();
    }

    mag() {
        return Point.mag(this.x, this.y);
    }

    static mag(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    plus(p) {
        this.checkPoint(p);
        return new Point(this.x + p.x, this.y + p.y);
    }

    minus(p) {
        this.checkPoint(p);
        return this.plus(p.times(-1));
    }

    times(n) {
        return new Point(this.x * n, this.y * n);
    }

    checkPoint(p) {
        if (p instanceof Point) {
            return true;
        }

        console.error(`Error with the given point!\n`, p, "\nIt is not a point!\n");
        throw new Error(`The given argument is not a point!`);
    }
}