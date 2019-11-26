namespace we {
  export namespace ba {
    export class BALobbyBigRoad extends ui.Panel {
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
        this.parser = new BARoadParser([25, 25]);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.bigRoad = new BABigRoad(25, 23);
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
            this.bigRoad.parseRoadData(roadmapData.bigRoad);
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
