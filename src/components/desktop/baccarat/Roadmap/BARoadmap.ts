namespace baccarat {
  export class BARoadmap extends egret.DisplayObjectContainer {
    private beadRoad: baccarat.BABeadRoad;
    private bigRoad: baccarat.BABigRoad;
    private bigEyeRoad: baccarat.BABigEyeRoad;
    private smallRoad: baccarat.BASmallRoad;
    private cockroachRoad: baccarat.BACockroachRoad;
    private tableid: string;

    private parser: baccarat.BARoadParser;
    private predictTimeout: number;
    private useParser: boolean = false;

    public constructor(tableid: string) {
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

      this.tableid = tableid;
      this.onDisplayUpdate(null);

      // predict banker win
      this.touchEnabled = true;
      this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    // predict banker win
    private onClick(e: egret.TouchEvent) {
      if (this.useParser) {
        this.parser.predictWin(0);
      } else {
        if (env.tableInfos[this.tableid]) {
          if (env.tableInfos[this.tableid].roadmap) {
            const data = env.tableInfos[this.tableid].roadmap;
            const animated = data.animateCell;
            if (animated[0] > -1) {
              data.bbead[animated[0]].isPredict = 1;
            }
            if (animated[1] > -1) {
              data.bbigRoad[animated[1]].isPredict = 1;
            }
            if (animated[2] > -1) {
              data.bbigEye[animated[2]].isPredict = 1;
            }
            if (animated[3] > -1) {
              data.bsmall[animated[3]].isPredict = 1;
            }
            if (animated[4] > -1) {
              data.broach[animated[4]].isPredict = 1;
            }
            if (animated[5] > -1) {
              data.pbead[animated[5]].isPredict = 1;
            }
            if (animated[6] > -1) {
              data.pbigRoad[animated[6]].isPredict = 1;
            }
            if (animated[7] > -1) {
              data.pbigEye[animated[7]].isPredict = 1;
            }
            if (animated[8] > -1) {
              data.psmall[animated[8]].isPredict = 1;
            }
            if (animated[9] > -1) {
              data.proach[animated[9]].isPredict = 1;
            }

            this.beadRoad.parseRoadData(data.bbead);
            this.bigRoad.parseRoadData(data.bbigRoad);
            this.bigEyeRoad.parseRoadData(data.bbigEye);
            this.smallRoad.parseRoadData(data.bsmall);
            this.cockroachRoad.parseRoadData(data.broach);
          }
        }
      }
      if (this.predictTimeout) {
        egret.clearTimeout(this.predictTimeout);
      }
      this.predictTimeout = egret.setTimeout(this.clearPredict, this, 3000);
    }

    private clearPredict() {
      if (this.useParser) {
        this.parser.clearPredict();
      } else {
        this.onDisplayUpdate(null);
      }
    }

    private onDisplayUpdate(e: egret.Event) {
      if (this.predictTimeout) {
        egret.clearTimeout(this.predictTimeout);
      }

      if (env.tableInfos[this.tableid]) {
        if (env.tableInfos[this.tableid].roadmap) {
          const data = env.tableInfos[this.tableid].roadmap;
          this.updateRoadData(data);
        }
      }
    }

    private onParserUpdate(e: egret.Event) {

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

    public updateRoadData(roadmapData: any) {
      if (this.useParser) {
        // option 1. parse from bead road data
        this.parser.parseData(roadmapData.bead);
      } else {
        // option 2. just display all road data as it is
        this.beadRoad.parseRoadData(roadmapData.bead);
        this.bigRoad.parseRoadData(roadmapData.bigRoad);
        this.bigEyeRoad.parseRoadData(roadmapData.bigEye);
        this.smallRoad.parseRoadData(roadmapData.small);
        this.cockroachRoad.parseRoadData(roadmapData.roach);
      }
    }

    public dispose() {
      if (this.parser.hasEventListener('onUpdate')) {
        this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
      }
    }
  }
}
