/* tslint:disable triple-equals */
namespace we {
  export namespace ba {
    export class MobileLiveListRoadmap extends ui.Panel implements we.ui.ILobbyRoad {
      protected _roadmapControl: ba.BARoadmapControl;
      protected _roadsContainer: eui.Group;
      protected _bigRoadMap: ba.BABigRoad;
      protected _bigEyeRoad: ba.BABigEyeRoad;
      protected _smallRoad: ba.BASmallRoad;
      protected _cockroachRoad: ba.BACockroachRoad;

      protected beadRoadGrid: egret.Shape;

      public constructor() {
        super();
        this.cacheAsBitmap = true;
      }

      public setTableInfo(tableInfo: data.TableInfo) {
        this._roadmapControl.setTableInfo(tableInfo);
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        this._roadmapControl = new ba.BARoadmapControl();

        const gridSizeBR = 48;
        const gridSize = 32;
        const lineWidth = 2;
        const lineColor = 0xaaaaaa;

        // grid bg rectangle
        this.beadRoadGrid = new egret.Shape();
        this.addChild(this.beadRoadGrid);

        this._bigRoadMap = new ba.BABigRoad(17, gridSizeBR);
        this._bigRoadMap.x = 0;
        this._bigRoadMap.y = 0;
        this.addChild(this._bigRoadMap);

        this._bigEyeRoad = new ba.BABigEyeRoad(10 * 2, gridSize);
        this._bigEyeRoad.x = gridSizeBR * 17;
        this._bigEyeRoad.y = gridSize * 3;
        this.addChild(this._bigEyeRoad);

        this._smallRoad = new ba.BASmallRoad(10 * 2, gridSize);
        this._smallRoad.x = gridSizeBR * 17;
        this._smallRoad.y = 0;
        this.addChild(this._smallRoad);

        this._cockroachRoad = new ba.BACockroachRoad(10 * 2, gridSize);
        this._cockroachRoad.x = gridSizeBR * 17;
        this._cockroachRoad.y = gridSize * 6;
        this.addChild(this._cockroachRoad);

        const rect: eui.Rect = new eui.Rect(lineWidth, gridSizeBR * 6, lineColor);
        const rect2: eui.Rect = new eui.Rect(gridSize * 10, lineWidth, lineColor);
        const rect3: eui.Rect = new eui.Rect(gridSize * 10, lineWidth, lineColor);
        this.addChild(rect);
        this.addChild(rect2);
        this.addChild(rect3);
        rect.anchorOffsetX = lineWidth * 0.5;
        rect2.anchorOffsetY = lineWidth * 0.5;
        rect3.anchorOffsetY = lineWidth * 0.5;
        rect.x = gridSizeBR * 17;
        rect2.x = gridSizeBR * 17;
        rect3.x = gridSizeBR * 17;
        rect2.y = gridSize * 3;
        rect3.y = gridSize * 6;

        this._roadmapControl.setRoads(null, this._bigRoadMap, this._bigEyeRoad, this._smallRoad, this._cockroachRoad, [16, 17, 20, 20, 20], null, null, false);
      }

      public drawGridBg(width: number, height: number) {
        this.beadRoadGrid.graphics.beginFill(0xffffff, 1);
        this.beadRoadGrid.graphics.lineStyle(1, 0xafafaf, 1, true);
        RoundRect.drawRoundRect(this.beadRoadGrid.graphics, 0, 0, width, height, { tl: 0, tr: 0, bl: 8, br: 8 });
        this.beadRoadGrid.graphics.endFill();
      }

      public updateLobbyRoadData(roadmapData: any) {
        this._roadmapControl.updateRoadData();
      }

      public updateSideBarRoadData(roadmapData: any) {
        this._roadmapControl.updateRoadData();
      }

      protected destroy() {
        super.destroy();
        this._bigRoadMap.dispose();
        this._bigEyeRoad.dispose();
        this._smallRoad.dispose();
        this._cockroachRoad.dispose();
      }
    }
  }
}
