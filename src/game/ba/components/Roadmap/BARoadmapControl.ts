namespace we {
  export namespace ba {
    export class BARoadmapControl {
      private beadRoad: BABeadRoad;
      private bigRoad: BABigRoad;
      private bigEyeRoad: BABigEyeRoad;
      private smallRoad: BASmallRoad;
      private cockroachRoad: BACockroachRoad;
      public tableid: string;

      private parser: BARoadParser;
      private predictTimeout: number;
      private useParser: boolean = false;

      public constructor(tableid: string = null) {
        this.tableid = tableid;
      }

      public setRoads(r1, r2, r3, r4, r5, columnArray) {
        this.beadRoad = r1;
        this.bigRoad = r2;
        this.bigEyeRoad = r3;
        this.smallRoad = r4;
        this.cockroachRoad = r5;

        this.parser = new BARoadParser(columnArray);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.onDisplayUpdate(null);

        // predict banker win
        this.bigRoad.touchEnabled = true;
        this.bigRoad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
      }

      // predict banker win
      private onClick(e: egret.TouchEvent) {
        this.beadRoad.DarkMode = ++this.beadRoad.DarkMode % 2;
        this.bigRoad.DarkMode = this.beadRoad.DarkMode;
        this.bigEyeRoad.DarkMode = this.beadRoad.DarkMode;
        this.smallRoad.DarkMode = this.beadRoad.DarkMode;
        this.cockroachRoad.DarkMode = this.beadRoad.DarkMode;

        if (this.useParser) {
          this.parser.predictWin(0);
        } else {
          if (env.tableInfos[this.tableid]) {
            if (env.tableInfos[this.tableid].roadmap) {
              const data = env.tableInfos[this.tableid].roadmap;
              const animated = data.animateCell;
              const animatedIndex = ['bbead', 'bbigRoad', 'bbigEye', 'bsmall', 'broach', 'pbead', 'pbigRoad', 'pbigEye', 'psmall', 'proach'];

              for (let i = 0; i < animated.length; i++) {
                if (animated[i] > -1) {
                  data[animatedIndex[i]][animated[i]].isPredict = 1;
                }
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
        this.beadRoad.parseRoadData(this.parser.beadRoadResult);
        this.bigRoad.parseRoadData(this.parser.bigRoadResult);
        this.bigEyeRoad.parseRoadData(this.parser.bigEyeRoadResult);
        this.smallRoad.parseRoadData(this.parser.smallRoadResult);
        this.cockroachRoad.parseRoadData(this.parser.cockroachRoadResult);
      }

      public updateRoadData(roadmapData: any) {
        if (roadmapData) {
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
      }

      public dispose() {
        if (this.parser.hasEventListener('onUpdate')) {
          this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
        }
      }
    }
  }
}
