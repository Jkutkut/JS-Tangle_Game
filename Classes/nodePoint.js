class PointNode extends Point {
    constructor(x, y) {
        super(x, y);
        this.connectedNodes = new Set();
    }


    addConnection(p) {
        this.checkPoint(p);

        this.connectedNodes.add(p);
    }
}