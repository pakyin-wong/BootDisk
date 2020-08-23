/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileLiveListSimpleItem extends MobileListBaseItem {
      protected _bigRoad: we.ui.ILobbyRoad;
      protected _alreadyBetSign: eui.Group;
      protected _goodRoadLabel: ui.GoodRoadLabel;

      protected _roadmapNode: eui.Component;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initComponents() {
        super.initComponents();
        this.generateRoadmap();
      }

      protected generateRoadmap() {
        if (this.itemInitHelper) {
          this._bigRoad = this.itemInitHelper.generateRoadmap(this._roadmapNode);
        }
      }

      // set the position of the children components
      protected arrangeComponents() {
        const properties = [
          'x',
          'y',
          'width',
          'height',
          'scaleX',
          'scaleY',
          'left',
          'right',
          'top',
          'bottom',
          'verticalCenter',
          'horizontalCenter',
          'anchorOffsetX',
          'anchorOffsetY',
          'percentWidth',
          'percentHeight',
        ];
        for (const att of properties) {
          if (this._roadmapNode && this._bigRoad) {
            this._bigRoad[att] = this._roadmapNode[att];
          }
        }
      }

      protected initChildren() {
        super.initChildren();
        if (this._goodRoadLabel) {
          this._goodRoadLabel.visible = false;
        }
        if (this._alreadyBetSign) {
          this._alreadyBetSign.visible = false;
        }
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this.tableInfo.totalBet > 0) {
          // this._alreadyBetSign.visible = true;
        } else {
          // this._alreadyBetSign.visible = false;
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (this.tableInfo.totalBet > 0) {
          this._alreadyBetSign.visible = true;
          this._alreadyBetSign.x = this._goodRoadLabel.visible ? this._goodRoadLabel.width + 10 : 0;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (tableInfo.roadmap) {
          if (this._bigRoad) {
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

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
          if (tableInfo.tableid === this._tableId) {
            if (this._bigRoad) {
              this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
            }
          }
        }
      }

      protected onMatchGoodRoadUpdate() {
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          this._goodRoadLabel.visible = false;
        }
      }
    }
  }
}
