namespace we {
  export namespace ba {
    export class BALobbyBigRoad extends core.BaseEUI implements we.ui.ILobbyRoad {
      protected bigRoad: BABigRoad;
      protected parser: BARoadParser;
      protected useParser: boolean = false;

      protected beadRoadGrid: egret.Shape;

      public constructor() {
        super();
        // this.cacheAsBitmap = true;
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();

        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        // this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
      }

      protected init() {
        // this.parser = new BARoadParser([25, 25]);
        // this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.bigRoad = new BABigRoad(25, 23);
        this.bigRoad.scaleX = this.bigRoad.scaleY = 576 / 575;
        this.bigRoad.setGridCorners({ tl: 0, tr: 0, bl: 10, br: 10 });

        // grid bg rectangle
        this.beadRoadGrid = new egret.Shape();
        this.addChild(this.beadRoadGrid);
        this.addChild(this.bigRoad);
        this.bigRoad.initRoadData();
      }
      // public onRemoved(e) {
      //   this.bigRoad.onRemoved(e);
      // }
      // public onAdded(e) {
      //   this.bigRoad.onAdded(e);
      // }

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
        // if (this.parser.hasEventListener('onUpdate')) {
        //   this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
        // }
      }
    }
  }
}
