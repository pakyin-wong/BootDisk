namespace we {
  export namespace ba {
    export class BALobbyBigRoad extends ui.Panel implements we.ui.ILobbyRoad {
      protected bigRoad: BABigRoad;
      protected parser: BARoadParser;
      protected useParser: boolean = false;

      public constructor() {
        super();
        this.cacheAsBitmap = true;
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        this.parser = new BARoadParser([25, 25]);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.bigRoad = new BABigRoad(25, 23);
        this.bigRoad.scaleX = this.bigRoad.scaleY = 578 / 575;
        this.addChild(this.bigRoad);
      }

      protected onParserUpdate(e: egret.Event) {
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
              this.bigRoad.parseRoadData(roadmapData.lobbyUnPro.bigRoad);
            }
          }
        }
      }

      public updateLobbyRoadData(roadmapData: any) {
        if (roadmapData) {
          if (this.bigRoad) {
            this.bigRoad.parseRoadData(roadmapData.lobbyUnPro.bigRoad);
          }
        }
      }

      public updateSideBarRoadData(roadmapData: any) {
        if (roadmapData) {
          if (this.bigRoad) {
            this.bigRoad.parseRoadData(roadmapData.sideBar.bigRoad);
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
