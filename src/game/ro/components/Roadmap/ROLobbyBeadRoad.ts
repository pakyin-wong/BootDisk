namespace we {
  export namespace ro {
    export class ROLobbyBeadRoad extends core.BaseEUI implements we.ui.ILobbyRoad {
      protected beadRoad: ROBeadRoad;

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

      public isSmall: boolean = false;

      protected beadRoadGrid: egret.Shape;

      public constructor() {
        super();
        // this.cacheAsBitmap = true;
        this.initParams();
        this.init();
      }

      protected initParams() {

      }

      protected childrenCreated() {
        super.childrenCreated();
      }

      protected init() {
        this.beadRoad = new ROBeadRoad(this.roadRow, this.roadCol, this.roadGridSize, 1, this.roadOffsetX, this.roadOffsetY, this.roadEmptyColor, this.roadEmptyAlpha, this.isSmall);
        this.beadRoad.x = this.roadIndentX;
        this.beadRoad.y = this.roadIndentY;
        this.beadRoad.scaleX = this.beadRoad.scaleY = this.roadScale;
        // const rdata: any = [];
        // this.beadRoad.parseRoadData(rdata);

        // grid bg rectangle
        this.beadRoadGrid = new egret.Shape();
        this.addChild(this.beadRoadGrid);
        this.addChild(this.beadRoad);
        this.beadRoad.initRoadData();
      }

      public drawGridBg(width: number, height: number) {
        this.beadRoadGrid.graphics.beginFill(0xffffff, 1);
        this.beadRoadGrid.graphics.lineStyle(1, 0xafafaf, 1, true);
        RoundRect.drawRoundRect(this.beadRoadGrid.graphics, 0, 0, width, height, { tl: 0, tr: 0, bl: 10, br: 10 });
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

    export class ROLiveListRoadmap extends ROLobbyBeadRoad {
      protected initParams() {
        this.roadGridSize = 40;
        this.roadCol = 12;
        this.roadRow = 3;
        this.roadIndentX = 4;
        this.roadIndentY = 2.5;
        this.roadOffsetX = 8;
        this.roadOffsetY = 5;
        this.roadEmptyColor = 0xc1c1c1;
        this.roadEmptyAlpha = 0.2;
      }
    }

    export class ROSideListRoadmap extends ROLobbyBeadRoad {
      protected initParams() {
        this.height = 95;
        this.roadGridSize = 30;
        this.roadCol = 9;
        this.roadRow = 3;
        this.roadIndentX = 3;
        this.roadIndentY = 2;
        this.roadOffsetX = 7.5;
        this.roadOffsetY = 2.5;
        this.roadEmptyColor = 0xc1c1c1;
        this.roadEmptyAlpha = 0.2;
      }
    }

    export class ROLargeListRoadmap extends ROLobbyBeadRoad {
      protected initParams() {
        this.roadGridSize = 82;
        this.roadCol = 11;
        this.roadRow = 3;
        this.roadIndentX = 15;
        this.roadIndentY = 8;
        this.roadOffsetX = 20;
        this.roadOffsetY = 10;
        this.roadEmptyColor = 0xc1c1c1;
        this.roadEmptyAlpha = 0.2;
      }
    }

    export class ROSmallListRoadmap extends ROLobbyBeadRoad {
      protected initParams() {
        this.roadGridSize = 52;
        this.roadCol = 9;
        this.roadRow = 3;
        this.roadIndentX = 8;
        this.roadIndentY = 8;
        this.roadOffsetX = 8;
        this.roadOffsetY = 8;
        this.roadEmptyColor = 0xc1c1c1;
        this.roadEmptyAlpha = 0.2;
        this.isSmall = true;
      }
    }

  }
}
