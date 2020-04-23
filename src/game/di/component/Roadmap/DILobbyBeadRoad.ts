namespace we {
  export namespace di {
    export class DiLobbyBeadRoad extends ui.Panel implements we.ui.ILobbyRoad {
      protected beadRoad: DiBeadRoad;

      public roadGridSize: number = 40;
      public roadCol: number = 10;
      public roadRow: number = 3;
      public roadIndentX: number = 0;
      public roadIndentY: number = 0;
      public roadOffsetX: number = 0;
      public roadOffsetY: number = 0;
      public roadIconItemYOffset: number = 10;
      public roadIconItemColors: any = [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1];
      public roadScale: number = 1;

      public constructor() {
        super();
        this.cacheAsBitmap = true;
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        this.beadRoad = new DiBeadRoad(this.roadRow, this.roadCol, this.roadGridSize, 1, this.roadOffsetX, this.roadOffsetY, this.roadIconItemYOffset, this.roadIconItemColors);
        this.beadRoad.x = this.roadIndentX;
        this.beadRoad.y = this.roadIndentY;
        this.beadRoad.scaleX = this.beadRoad.scaleY = this.roadScale;

        const rdata: any = [];
        this.beadRoad.parseRoadData(rdata);
        this.beadRoad.setLayout(3);
        this.addChild(this.beadRoad);
      }

      public updateRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData) {
          if (this.beadRoad) {
            this.beadRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }

      public updateLobbyRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData && roadmapData.inGame) {
          if (this.beadRoad) {
            this.beadRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }

      public updateSideBarRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData && roadmapData.inGame) {
          if (this.beadRoad) {
            this.beadRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }

      public dispose() {}
    }
  }
}
