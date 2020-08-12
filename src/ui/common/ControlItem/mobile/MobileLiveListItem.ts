/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileLiveListItem extends MobileLiveListSimpleItem {
      // protected _roadmapControl: ba.BARoadmapControl;
      // protected _roadsContainer: eui.Group;
      // protected _bigRoadMap: ba.BABigRoad;
      // protected _bigEyeRoad: ba.BABigEyeRoad;
      // protected _smallRoad: ba.BASmallRoad;
      // protected _cockroachRoad: ba.BACockroachRoad;

      protected _roadmap: ILobbyRoad;

      public constructor(skinName: string = null) {
        super(skinName);
        this._isSimple = false;
      }

      protected initCustomPos() {
        this._buttonGroupShowY = 194;
        this._buttonGroupHideY = 230;
      }

      protected initChildren() {
        super.initChildren();
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            if (this._bigRoad.setTableInfo) {
              this._bigRoad.setTableInfo(tableInfo);
            }
            this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
          }
        }
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          // this._goodRoadLabel.visible = false;
        }
      }

      // protected initCustomPos() {
      //   this._buttonGroupShowY = 194;
      //   this._buttonGroupHideY = 230;
      // }

      // public setData(tableInfo: data.TableInfo) {
      //   super.setData(tableInfo);
      //   this._roadmapControl.setTableInfo(this._tableInfo);
      // }

      // protected initRORoadMap() {
      //   this._beadRoad = new ro.ROBeadRoad(3, 11, 100, 1, 14, 14, 0xc1c1c1, 0.2);
      //   this._beadRoad.x = 0;
      //   this._beadRoad.y = 20;

      //   this._roadsContainer.addChild(this._beadRoad);
      // }

      // protected initRoadMap() {
      //   this._roadmapControl = new ba.BARoadmapControl(this._tableId);

      //   const gridSizeBR = 48;
      //   const gridSize = 32;
      //   const lineWidth = 2;
      //   const lineColor = 0xaaaaaa;

      //   this._bigRoadMap = new ba.BABigRoad(17, gridSizeBR);
      //   this._bigRoadMap.x = 0;
      //   this._bigRoadMap.y = 0;
      //   this._roadsContainer.addChild(this._bigRoadMap);

      //   this._bigEyeRoad = new ba.BABigEyeRoad(10 * 2, gridSize);
      //   this._bigEyeRoad.x = gridSizeBR * 17;
      //   this._bigEyeRoad.y = gridSize * 3;
      //   this._roadsContainer.addChild(this._bigEyeRoad);

      //   this._smallRoad = new ba.BASmallRoad(10 * 2, gridSize);
      //   this._smallRoad.x = gridSizeBR * 17;
      //   this._smallRoad.y = 0;
      //   this._roadsContainer.addChild(this._smallRoad);

      //   this._cockroachRoad = new ba.BACockroachRoad(10 * 2, gridSize);
      //   this._cockroachRoad.x = gridSizeBR * 17;
      //   this._cockroachRoad.y = gridSize * 6;
      //   this._roadsContainer.addChild(this._cockroachRoad);

      //   const rect: eui.Rect = new eui.Rect(lineWidth, gridSizeBR * 6, lineColor);
      //   const rect2: eui.Rect = new eui.Rect(gridSize * 10, lineWidth, lineColor);
      //   const rect3: eui.Rect = new eui.Rect(gridSize * 10, lineWidth, lineColor);
      //   this._roadsContainer.addChild(rect);
      //   this._roadsContainer.addChild(rect2);
      //   this._roadsContainer.addChild(rect3);
      //   rect.anchorOffsetX = lineWidth * 0.5;
      //   rect2.anchorOffsetY = lineWidth * 0.5;
      //   rect3.anchorOffsetY = lineWidth * 0.5;
      //   rect.x = gridSizeBR * 17;
      //   rect2.x = gridSizeBR * 17;
      //   rect3.x = gridSizeBR * 17;
      //   rect2.y = gridSize * 3;
      //   rect3.y = gridSize * 6;

      //   this._roadmapControl.setRoads(null, this._bigRoadMap, this._bigEyeRoad, this._smallRoad, this._cockroachRoad, [16, 17, 20, 20, 20], null, null, false);
      // }

      // protected onRoadDataUpdate(evt: egret.Event) {
      //   this._roadmapControl.updateRoadData();
      // }

      // public updateLobbyRoadData(roadmapData: any) {
      //   this._roadmapControl.setTableInfo(this._tableInfo);
      // }
    }
  }
}
