namespace we {
  export namespace ba {
    export class BABigRoad extends BARoadBase {
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
          { v: 'b', t: 0, b: 0, p: 0 },
          { v: 'p', t: 0, b: 0, p: 0 },
          { v: 't', t: 0, b: 0, p: 0 },
          { v: 'b', t: 1, b: 1, p: 1 },
          { v: 'p', t: 1, b: 1, p: 1 },
          { v: 't', t: 1 },
          { v: 'b', t: 3 },
          { v: 'p', t: 4 },
          { v: 't', t: 5 },
        ]);
      }

      protected createIcon(size: number): BABigRoadIcon {
        return new BABigRoadIcon(size);
      }
    }
  }
}
