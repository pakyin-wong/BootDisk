namespace we {
  export namespace di {
    export class DILobbyBeadRoad extends ui.Panel {
      public roadGridSize: number = 40;
      public roadCol: number = 10;
      public roadRow: number = 3;
      public roadIndentX: number = 0;
      public roadIndentY: number = 0;
      public roadOffsetX: number = 0;
      public roadOffsetY: number = 0;
      public roadEmptyColor: number = 0x000000;
      public roadEmptyAlpha: number = 1;
      public roadScale: number = 1;

      public constructor() {
        super();
        this.cacheAsBitmap = true;
      }

      protected childrenCreated() {
        super.childrenCreated();
      }

      public updateLobbyRoadData(roadmapData: data.RoadmapData) {}
      public updateSideBarRoadData(roadmapData: data.RoadmapData) {}
    }
  }
}
