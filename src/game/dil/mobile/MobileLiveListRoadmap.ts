// TypeScript file
namespace we {
  export namespace dil {
    export class MobileLiveListRoadmap extends ui.Panel implements we.ui.ILobbyRoad {
      protected bigRoad: DilBeadRoad;

      public roadGridSize: number = 104;
      public roadCol: number = 8;
      public roadRow: number = 2;
      public roadIndentX: number = 38;
      public roadIndentY: number = 24;
      public roadOffsetX: number = 32;
      public roadOffsetY: number = 32;
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
        this.bigRoad = new DilBeadRoad(this.roadRow, this.roadCol, this.roadGridSize, this.roadScale, this.roadOffsetX, this.roadOffsetY, 0x262a2b, 1);
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

      protected destroy() {
        super.destroy();
        this.bigRoad.dispose();
      }
      // public dispose() {}
    }
  }
}
