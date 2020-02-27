namespace we {
  export namespace ro {
    export class ROLobbyBeadRoad extends ui.Panel {
      protected beadRoad: ROBeadRoad;

      private roadGridSize: number;
      private roadCol: number;
      private roadRow: number;
      private roadOffsetX: number;
      private roadOffsetY: number;
      private roadEmptyColor: number;
      private roadEmptyAlpha: number;
      private roadScale: number;

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
        this.beadRoad.scaleX = this.beadRoad.scaleY = this.roadScale;
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
        if (roadmapData) {
          if (this.beadRoad) {
            this.beadRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }

      public updateSideBarRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData) {
          if (this.beadRoad) {
            this.beadRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }

      public dispose() {}
    }
  }
}
