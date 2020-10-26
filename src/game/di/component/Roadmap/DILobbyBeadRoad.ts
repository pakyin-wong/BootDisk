namespace we {
  export namespace di {
    export class DiLobbyBeadRoad extends ui.Panel implements we.ui.ILobbyRoad {
      protected beadRoad: DiBeadRoad;

      public roadGridSize: number = 40;
      public roadCol: number = 10;
      public roadRow: number = 1;
      public roadIndentX: number = 0;
      public roadIndentY: number = 0;
      public roadOffsetX: number = 0;
      public roadOffsetY: number = 0;
      public roadIconItemYOffset: number = 10;
      public textPadding: number = 1;
      public textSize: number = 18;
      public diceSize: number = 22;
      public highlightRadius: number = 8;
      public iconHeight: number = 130;
      public roadIconItemColors: any = [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1];
      public roadScale: number = 1;
      public roadWidth: number = 576;

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
        const options = {
          paddingX: this.roadIndentX,
          paddingY: this.roadIndentY,
          gapX: this.roadOffsetX,
          gapY: this.roadOffsetY,
          iconItemColors: this.roadIconItemColors,
          iconHeight: this.iconHeight,
          iconItemYOffset: this.roadIconItemYOffset,
          textPadding: this.textPadding,
          textSize: this.textSize,
          diceSize: this.diceSize,
          highlightRadius: this.highlightRadius,
          showGrid: true,
          showOuterGrid: true,
        };

        this.beadRoad = new DiBeadRoad(this.roadWidth, this.roadRow, this.roadCol, this.roadGridSize, 1, options);
        // this.beadRoad.x = this.roadIndentX;
        // this.beadRoad.y = this.roadIndentY;
        this.beadRoad.scaleX = this.beadRoad.scaleY = this.roadScale;
        this.beadRoad.initRoadData();
        this.beadRoad.setLayout(3);
        this.beadRoad.setGridCorners({ tl: 0, tr: 0, bl: 10, br: 10 });
        this.beadRoad.expandRoad(false);

        // const rdata: any = [];
        // this.beadRoad.parseRoadData(rdata);

        // grid bg rectangle
        this.beadRoadGrid = new egret.Shape();
        this.addChild(this.beadRoadGrid);
        this.addChild(this.beadRoad);
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
  }
}
