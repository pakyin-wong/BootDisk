namespace baccarat {
  export class BARoadmap extends egret.DisplayObjectContainer {
    private beadRoad: baccarat.BABeadRoad;
    private bigRoad: baccarat.BABigRoad;
    private bigEyeRoad: baccarat.BABigEyeRoad;
    private smallRoad: baccarat.BASmallRoad;
    private cockroachRoad: baccarat.BACockroachRoad;

    private parser: baccarat.BARoadParser;

    public constructor() {
      super();
      this.parser = new baccarat.BARoadParser(12);
      this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

      this.beadRoad = new baccarat.BABeadRoad();
      this.beadRoad.x = 10;
      this.beadRoad.y = 10;
      this.addChild(this.beadRoad);

      this.bigRoad = new baccarat.BABigRoad();
      this.bigRoad.x = 10;
      this.bigRoad.y = 200;
      this.addChild(this.bigRoad);

      this.bigEyeRoad = new baccarat.BABigEyeRoad();
      this.bigEyeRoad.x = 10;
      this.bigEyeRoad.y = 400;
      this.addChild(this.bigEyeRoad);

      this.smallRoad = new baccarat.BASmallRoad();
      this.smallRoad.x = 10;
      this.smallRoad.y = 500;
      this.addChild(this.smallRoad);

      this.cockroachRoad = new baccarat.BACockroachRoad();
      this.cockroachRoad.x = 10;
      this.cockroachRoad.y = 600;
      this.addChild(this.cockroachRoad);
      this.parser.parseData(env.tableHistory);

      dir.evtHandler.addEventListener(enums.event.event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
      /*
      this.parser.parseData([
        { v: 'b', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 0, p: 0, bv: 6, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 0, p: 1, bv: 10, pv: 3 },
        { v: 'p', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 0, p: 0, bv: 5, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 5, pv: 5 },
        { v: 'b', b: 1, p: 1, bv: 10, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 4, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 1, p: 1, bv: 10, pv: 15 },
        { v: 'p', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 1, p: 1, bv: 10, pv: 5 },
        { v: 'p', b: 1, p: 0, bv: 8, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 9, pv: 12 }
      ]);
      */
    }

    private onParserUpdate(e: egret.Event) {
      this.beadRoad.parseRoadData(this.parser.beadRoadResult);
      this.bigRoad.parseRoadData(this.parser.bigRoadResult);
      this.bigEyeRoad.parseRoadData(this.parser.bigEyeRoadResult);
      this.smallRoad.parseRoadData(this.parser.smallRoadResult);
      this.cockroachRoad.parseRoadData(this.parser.cockroachRoadResult);
    }
    private onRoadDataUpdate(e: egret.Event) {
      this.parser.parseData(env.tableHistory);
    }

    public dispose() {
      if (this.parser.hasEventListener('onUpdate')) {
        this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
      }
    }
  }
}
