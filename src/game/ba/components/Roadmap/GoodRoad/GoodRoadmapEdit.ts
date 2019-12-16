namespace we {
  export namespace ba {
    export class GoodRoadmapEdit extends ui.Panel {
      private bigRoad: BABigRoad;

      private parser: GoodRoadParser;

      // private isActive: number;
      private roadId: string;
      private roadName: string;
      // private isDefault: number;

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      private init() {
        this.parser = new GoodRoadParser([10, 10, 24, 12, 12]);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.bigRoad = new BABigRoad(10, 29);
        this.bigRoad.x = 1;
        this.bigRoad.y = 0;
        this.addChild(this.bigRoad);

        this.onParserUpdate(null);

        // add banker win
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
      }

      // add banker win
      private onClick(e: egret.TouchEvent) {
        if (e.localY < 300) {
          if (e.localX > 200) {
            // add banker
            if (this.parser.checkCanAddBanker()) {
              this.parser.addWin(0);
            }
          } else {
            // add player
            if (this.parser.checkCanAddPlayer()) {
              this.parser.addWin(1);
            }
          }
        } else {
          console.log(this.getRoadData());
        }
      }

      private onParserUpdate(e: egret.Event) {
        if (this.parser.bigRoadResult) {
          this.bigRoad.parseRoadData(this.parser.bigRoadResult);

          console.log(this.parser.checkCanSubmit(), this.parser.checkCanAddBanker(), this.parser.checkCanAddPlayer());
        }
      }

      public updateRoadData(roadmapData: any) {
        const data = [];
        const arr = roadmapData
          .toLowerCase()
          .split('')
          .forEach(e => data.push({ V: e }));

        this.parser.parseData(data);
      }

      public getRoadData(): any {
        let rslt = '';
        this.parser.beadRoadResult.forEach(e => (rslt += e.V.toLowerCase()));
        return rslt;
      }

      public dispose() {
        if (this.parser.hasEventListener('onUpdate')) {
          this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
        }
      }
    }
  }
}
