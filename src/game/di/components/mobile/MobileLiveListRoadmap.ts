// TypeScript file
namespace we {
  export namespace di {
    export class MobileLiveListRoadmap extends ui.Panel implements we.ui.ILobbyRoad {
      protected bigRoad: DiSizeBigRoad;

      public roadGridSize: number = 40;
      public roadCol: number = 1;
      public roadRow: number = 13;
      public roadIndentX: number = 0;
      public roadIndentY: number = 0;
      public roadOffsetX: number = 0;
      public roadOffsetY: number = 0;
      public roadIconItemYOffset: number = 0;
      public roadIconItemColors: any = [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1];
      public roadScale: number = 1;

      protected beadRoadGrid: egret.Shape;

      public constructor() {
        super();
        this.cacheAsBitmap = true;
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        this.bigRoad = new DiSizeBigRoad(this.roadRow, this.roadCol, this.roadGridSize);
        this.bigRoad.x = this.roadIndentX;
        this.bigRoad.y = this.roadIndentY;
        this.bigRoad.scaleX = this.bigRoad.scaleY = this.roadScale;

        const rdata: any = [];
        this.bigRoad.parseRoadData(rdata);

        // grid bg rectangle
        this.beadRoadGrid = new egret.Shape();
        this.addChild(this.beadRoadGrid);
        this.addChild(this.bigRoad);
      }

      public drawGridBg(width: number, height: number) {
        this.beadRoadGrid.graphics.beginFill(0xffffff, 1);
        this.beadRoadGrid.graphics.lineStyle(1, 0xafafaf, 1, true);
        RoundRect.drawRoundRect(this.beadRoadGrid.graphics, 0, 0, width, height, { tl: 0, tr: 0, bl: 8, br: 8 });
        this.beadRoadGrid.graphics.endFill();
      }

      public updateRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData) {
          if (this.bigRoad) {
            this.bigRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }

      public updateLobbyRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData && roadmapData.inGame) {
          if (this.bigRoad) {
            this.bigRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }

      public updateSideBarRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData && roadmapData.inGame) {
          if (this.bigRoad) {
            this.bigRoad.parseRoadData(roadmapData.inGame.bead);
          }
        }
      }

      public dispose() {}
    }
  }
}
