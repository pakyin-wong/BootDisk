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
        this.parser.addEventListener('onPredict', this.onParserPredict, this);
        this.parser.addEventListener('onRestore', this.onParserRestore, this);

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

              this.beadRoad.parseRoadData(data.bbead, 1);
              this.bigRoad.parseRoadData(data.bbigRoad, 1);
              this.bigEyeRoad.parseRoadData(data.bbigEye, 1);
              this.smallRoad.parseRoadData(data.bsmall, 1);
              this.cockroachRoad.parseRoadData(data.broach, 1);
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
            this.updateRoadData(data, 2);
          }
        }
      }

      private doParserUpdate(state: number) {
        // stae 0 = update, 1 = predict, 2 = restore from predict
        this.beadRoad.parseRoadData(this.parser.beadRoadResult, state);
        this.bigRoad.parseRoadData(this.parser.bigRoadResult, state);
        this.bigEyeRoad.parseRoadData(this.parser.bigEyeRoadResult, state);
        this.smallRoad.parseRoadData(this.parser.smallRoadResult, state);
        this.cockroachRoad.parseRoadData(this.parser.cockroachRoadResult, state);
      }

      private onParserUpdate(e: egret.Event) {
        this.doParserUpdate(0);
      }

      private onParserPredict(e: egret.Event) {
        this.doParserUpdate(1);
      }

      private onParserRestore(e: egret.Event) {
        this.doParserUpdate(2);
      }

      public updateRoadData(roadmapData: any, state: number = 0) {
        if (roadmapData) {
          if (this.useParser) {
            // option 1. parse from bead road data
            const stats = this.parser.getIconsFromBeadResult(roadmapData.bead);
            this.parser.parseData(roadmapData.bead);
          } else {
            // option 2. just display all road data as it is
            // stae 0 = update, 1 = predict, 2 = restore from predict
            this.beadRoad.parseRoadData(roadmapData.bead, state);
            this.bigRoad.parseRoadData(roadmapData.bigRoad, state);
            this.bigEyeRoad.parseRoadData(roadmapData.bigEye, state);
            this.smallRoad.parseRoadData(roadmapData.small, state);
            this.cockroachRoad.parseRoadData(roadmapData.roach, state);

            const stats = this.parser.getIconsFromRoadData(roadmapData);
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
