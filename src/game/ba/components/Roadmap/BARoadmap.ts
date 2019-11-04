namespace we {
  export namespace ba {
    export class BARoadmap extends egret.DisplayObjectContainer {
      private beadRoad: BABeadRoad;
      private bigRoad: BABigRoad;
      private bigEyeRoad: BABigEyeRoad;
      private smallRoad: BASmallRoad;
      private cockroachRoad: BACockroachRoad;
      private tableid: string;

      private parser: BARoadParser;

      public constructor(tableid: string) {
        super();
        this.parser = new BARoadParser(12);
        // this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.beadRoad = new BABeadRoad();
        this.beadRoad.x = 10;
        this.beadRoad.y = 10;
        this.addChild(this.beadRoad);

        this.bigRoad = new BABigRoad();
        this.bigRoad.x = 10;
        this.bigRoad.y = 200;
        this.addChild(this.bigRoad);

        this.bigEyeRoad = new BABigEyeRoad();
        this.bigEyeRoad.x = 10;
        this.bigEyeRoad.y = 400;
        this.addChild(this.bigEyeRoad);

        this.smallRoad = new BASmallRoad();
        this.smallRoad.x = 10;
        this.smallRoad.y = 500;
        this.addChild(this.smallRoad);

        this.cockroachRoad = new BACockroachRoad();
        this.cockroachRoad.x = 10;
        this.cockroachRoad.y = 600;
        this.addChild(this.cockroachRoad);

        this.tableid = tableid;
        this.onParserUpdate(null);
        /*
        if (env.tableInfos[tableid]) {
          if (env.tableInfos[tableid].roadmap) {
            this.parser.parseData(env.tableInfos[tableid].roadmap);
          }
        }
        */
        // this.parser.parseData(env.tableHistory);

        // dir.evtHandler.addEventListener(enums.event.event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
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
        if (env.tableInfos[this.tableid]) {
          if (env.tableInfos[this.tableid].roadmap) {
            this.parser.parseData(env.tableInfos[this.tableid].roadmap);
          }
        }

        console.dir('beadRoad: -');
        console.dir(this.parser.beadRoadResult);
        console.dir('bigRoad: -');
        console.dir(this.parser.bigRoadResult);

        if (this.parser.beadRoadResult) {
          this.beadRoad.parseRoadData(this.parser.beadRoadResult);
        }

        if (this.parser.bigRoadResult) {
          this.bigRoad.parseRoadData(this.parser.bigRoadResult);
        }

        if (this.parser.bigEyeRoadResult) {
          this.bigEyeRoad.parseRoadData(this.parser.bigEyeRoadResult);
        }

        if (this.parser.smallRoadResult) {
          this.smallRoad.parseRoadData(this.parser.smallRoadResult);
        }

        if (this.parser.cockroachRoadResult) {
          this.cockroachRoad.parseRoadData(this.parser.cockroachRoadResult);
        }
      }
      /*
      private onRoadDataUpdate(e: egret.Event) {
        this.parser.parseData(env.tableHistory);
      }*/

      public updateRoadData(roadmapData: any) {
        this.parser.parseData(roadmapData);
      }

      public dispose() {
        if (this.parser.hasEventListener('onUpdate')) {
          this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
        }
      }
    }
  }
}
