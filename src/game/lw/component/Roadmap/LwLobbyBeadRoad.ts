namespace we {
  export namespace lw {
    export class LwLobbyBeadRoad extends ui.Panel implements we.ui.ILobbyRoad {
      protected beadRoad: LwBeadRoad;

      public roadIndentX: number = 0;
      public roadIndentY: number = 0;

      public roadRow: number = 3;
      public roadCol: number = 10;
      public roadCellWidth: number = 10;
      public roadCellHeight: number = 10;
      public roadImageWidth: number = 10;
      public roadImageHeight: number = 10;
      public roadScale: number = 1;
      public roadGridColor: number = 0xffffff;
      public roadGridAlpha: number = 1;
      public roadGridBorderColor: number = 0x000000;

      public constructor() {
        super();
        this.cacheAsBitmap = true;
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        this.beadRoad = new LwBeadRoad(
          this.roadRow,
          this.roadCol,
          this.roadCellWidth,
          this.roadCellHeight,
          this.roadImageWidth,
          this.roadImageHeight,
          1,
          this.roadGridColor,
          this.roadGridAlpha,
          this.roadGridBorderColor,
          false
        );
        this.beadRoad.x = this.roadIndentX;
        this.beadRoad.y = this.roadIndentY;
        this.beadRoad.scaleX = this.beadRoad.scaleY = this.roadScale;

        // const rdata: any = [];
        // this.beadRoad.parseRoadData(rdata);
        this.addChild(this.beadRoad);
        this.beadRoad.initRoadData();
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

      // public updateSideBarRoadData(roadmapData: data.RoadmapData) {
      //   console.log('roadmapData', roadmapData);
      //   if (roadmapData && roadmapData.inGame) {
      //     if (this.beadRoad) {
      //       this.beadRoad.parseRoadData(roadmapData.inGame.bead);
      //     }
      //   }
      // }

      public updateSideBarRoadData(roadmapData: any) {
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
