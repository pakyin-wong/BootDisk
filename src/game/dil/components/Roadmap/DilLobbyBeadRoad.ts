namespace we {
  export namespace dil {
    export class DilLobbyBeadRoad extends ui.Panel implements we.ui.ILobbyRoad {
      protected beadRoad: DilBeadRoad;

      public roadGridSize: number;
      public roadCol: number;
      public roadRow: number;
      public roadIndentX: number;
      public roadIndentY: number;
      public roadOffsetX: number;
      public roadOffsetY: number;
      public roadEmptyColor: number;
      public roadEmptyAlpha: number;
      public roadScale: number;

      protected beadRoadGrid: egret.Shape;

      public constructor(
        roadGridSize: number = 56,
        roadCol: number = 8,
        roadRow: number = 2,
        roadIndentX: number = 17,
        roadIndentY: number = 7,
        roadOffsetX: number = 14,
        roadOffsetY: number = 12,
        roadEmptyColor: number = 0x262a2b,
        roadEmptyAlpha: number = 1,
        roadScale: number = 1
      ) {
        super();
        this.roadGridSize = roadGridSize;
        this.roadCol = roadCol;
        this.roadRow = roadRow;
        this.roadIndentX = roadIndentX;
        this.roadIndentY = roadIndentY;
        this.roadOffsetX = roadOffsetX;
        this.roadOffsetY = roadOffsetY;
        this.roadEmptyColor = roadEmptyColor;
        this.roadEmptyAlpha = roadEmptyAlpha;
        this.roadScale = roadScale;

        this.cacheAsBitmap = true;
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        this.beadRoad = new DilBeadRoad(this.roadRow, this.roadCol, this.roadGridSize, this.roadScale, this.roadOffsetX, this.roadOffsetY, this.roadEmptyColor, this.roadEmptyAlpha); // in game
        this.beadRoad.x = this.roadIndentX;
        this.beadRoad.y = this.roadIndentY;

        // const rdata: any = [];
        // this.beadRoad.parseRoadData(rdata);

        // grid bg rectangle
        this.beadRoadGrid = new egret.Shape();
        this.addChild(this.beadRoadGrid);
        this.addChild(this.beadRoad);
        this.beadRoad.initRoadData();
      }

      public drawGridBg(width: number, height: number) {
        this.beadRoadGrid.graphics.beginFill(0x1c1c1e, 1);
        this.beadRoadGrid.graphics.lineStyle(1, 0xafafaf, 1, true);
        RoundRect.drawRoundRect(this.beadRoadGrid.graphics, 0, 0, width, height, { tl: 0, tr: 0, bl: 8, br: 8 });
        this.beadRoadGrid.graphics.endFill();
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

      protected destroy() {
        super.destroy();
        this.beadRoad.dispose();
      }
    }
  }
}
