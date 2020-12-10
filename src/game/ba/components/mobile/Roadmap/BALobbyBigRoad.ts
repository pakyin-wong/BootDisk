namespace we {
  export namespace ba {
    export class BAMobileLobbyBigRoad extends core.BaseEUI implements we.ui.ILobbyRoad {
      protected bigRoad: BABigRoad;
      protected parser: BARoadParser;
      protected useParser: boolean = false;
      protected beadRoadGrid: egret.Shape;
      public constructor() {
        super();
        // this.cacheAsBitmap = true;
        this.init();
      }

      protected childrenCreated() {
        super.childrenCreated();
      }

      protected init() {
        this.parser = new BARoadParser([17, 17]);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.bigRoad = new BABigRoad(17, 32);
        this.bigRoad.scaleX = this.bigRoad.scaleY = 578 / 575;

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

      protected onParserUpdate(e: egret.Event) {
        this.bigRoad.parseRoadData(this.parser.bigRoadResult);
      }

      public updateRoadData(roadmapData: any) {
        if (roadmapData) {
          if (this.useParser) {
            // option 1. parse from bead road data
            this.parser.parseData(roadmapData.bead);
          } else {
            // option 2. just display all road data as it is
            if (this.bigRoad) {
              this.bigRoad.parseRoadData(roadmapData.lobbyUnPro.bigRoad);
            }
          }
        }
      }

      public clearRoadData() {
        if (this.bigRoad) {
          this.bigRoad.clearRoadData();
        }
      }

      public updateLobbyRoadData(roadmapData: any) {
        if (roadmapData) {
          if (this.bigRoad) {
            this.bigRoad.parseRoadData(roadmapData.lobbyUnPro.bigRoad);
          }
        }
      }

      public updateSideBarRoadData(roadmapData: any) {
        if (roadmapData) {
          if (this.bigRoad) {
            this.bigRoad.parseRoadData(roadmapData.sideBar.bigRoad);
          }
        }
      }

      public dispose() {
        if (this.parser.hasEventListener('onUpdate')) {
          this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
        }
      }
      public destroy() {
        super.destroy();
        this.bigRoad.dispose();
      }
    }
  }
}
