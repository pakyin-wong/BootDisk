namespace we {
  export namespace di {
    export class DILobbyBeadRoad extends ui.Panel {
      private roadGridSize: number = 40;
      private roadCol: number = 10;
      private roadRow: number = 3;
      private roadIndentX: number = 0;
      private roadIndentY: number = 0;
      private roadOffsetX: number = 0;
      private roadOffsetY: number = 0;
      private roadEmptyColor: number = 0x000000;
      private roadEmptyAlpha: number = 1;
      private roadScale: number = 1;

      public constructor() {
        super();
        this.cacheAsBitmap = true;
      }

      protected childrenCreated() {
        super.childrenCreated();
      }

      
      public updateLobbyRoadData(roadmapData: data.RoadmapData) {}
    }
  }
}
