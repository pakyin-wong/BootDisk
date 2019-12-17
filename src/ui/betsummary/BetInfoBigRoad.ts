namespace we {
  export namespace ba {
    export class BetInfoBigRoad extends ui.Panel {
      private bigRoad: BABigRoad;
      private parser: BARoadParser;
      private useParser: boolean = false;

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        this.parser = new BARoadParser([25, 16]);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.bigRoad = new BABigRoad(16, 23);
        this.bigRoad.scaleX = this.bigRoad.scaleY = (364 / 575) * 1.5625;
        this.addChild(this.bigRoad);
      }

      private onParserUpdate(e: egret.Event) {
        this.bigRoad.parseRoadData(this.parser.bigRoadResult);
      }

      public updateRoadData(roadmapData: any) {
        if (roadmapData) {
          if (this.useParser) {
            // option 1. parse from bead road data
            this.parser.parseData(roadmapData.bead);
          } else {
            // option 2. just display all road data as it is
            if (this.bigRoad) {
              this.bigRoad.parseRoadData(roadmapData.bigRoadLobby);
            }
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
