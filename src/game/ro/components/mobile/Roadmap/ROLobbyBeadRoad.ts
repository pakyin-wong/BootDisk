namespace we {
  export namespace ro {
    export class ROMobileLobbyBeadRoad extends ui.Panel implements we.ui.ILobbyRoad {
      protected beadRoad: ROBeadRoad;

      public roadGridSize: number = 83;
      public roadCol: number = 1;
      public roadRow: number = 3;
      public roadIndentX: number = 0;
      public roadIndentY: number = 0;
      public roadOffsetX: number = 19;
      public roadOffsetY: number = 10;
      public roadEmptyColor: number = 0xc1c1c1;
      public roadEmptyAlpha: number = 0.2;
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
        this.beadRoad = new ROBeadRoad(this.roadRow, this.roadCol, this.roadGridSize, 1, this.roadOffsetX, this.roadOffsetY, this.roadEmptyColor, this.roadEmptyAlpha);
        this.beadRoad.x = this.roadIndentX;
        this.beadRoad.y = this.roadIndentY;
        this.beadRoad.scaleX = this.beadRoad.scaleY = this.roadScale;

        const rdata: any = [];
        this.beadRoad.parseRoadData(rdata);
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
