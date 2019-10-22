namespace baccarat {
  export class BABeadRoad extends BARoadBase {
    /*
            [
                {v:'b', b:0, p:0},
                {v:'p', b:1, p:0},
                {v:'t', b:0, p:0},
                {},
                {},
            ]

        */

    public constructor() {
      super();

      this.scale = 1;
      this.gridUnit = 1;
      this.gridSize = 30;
      this.numCol = 12;

      this.parseRoadData([
        { v: 't', b: 1, p: 0 },
        { v: 't', b: 1, p: 0 },

        { v: 'b', b: 1, p: 0 },
        { v: 'b', b: 1, p: 0 },
        { v: 'b', b: 1, p: 0 },
        { v: 'b', b: 1, p: 0 },
        { v: 'b', b: 1, p: 0 },
        { v: 'b', b: 1, p: 0 },
        { v: 'b', b: 1, p: 0 },
        { v: 'b', b: 1, p: 0 },
        { v: 'p', b: 1, p: 1 },
        { v: 't', b: 0, p: 0 },
        { v: 'b', b: 1, p: 0 },
        { v: 'b', b: 1, p: 0 },
      ]);
    }

    protected createIcon(size: number): BABeadRoadIcon {
      return new BABeadRoadIcon(size);
    }
  }
}
