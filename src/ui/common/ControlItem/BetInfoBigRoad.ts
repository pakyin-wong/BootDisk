namespace we {
  export namespace ba {
    export class BetInfoBigRoad extends BALobbyBigRoad {
      public constructor() {
        super();
      }

      protected init() {
        this.parser = new BARoadParser([25, 16]);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.bigRoad = new BABigRoad(16, 23);
        this.bigRoad.scaleX = this.bigRoad.scaleY = 337 / 368;
        this.bigRoad.x = 1;
        this.bigRoad.setGridCorners({ tl: 0, tr: 0, bl: 8, br: 8 });
        utils.addChild(this,this.bigRoad);
        // this.addChild(this.bigRoad);
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
