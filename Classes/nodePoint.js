class PointNode extends Point {
    constructor(x, y) {
        super(x, y);
        this.initialPos = new Point(x, y);
        this._connectedNodes = new Set();
    }


    addConnection(p) {
        this.checkPoint(p);

        this._connectedNodes.add(p);
    }

    get connections() {
        return this._connectedNodes;
    }
}