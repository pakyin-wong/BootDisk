namespace we {
  export namespace ui {
    export class LiveListAdvancedItem extends LiveListItem {
      protected _advancedRoadNode: eui.Component;
      protected _advancedRoad: IAdvancedRoad & eui.Component;
      protected _analysisNode: eui.Component;
      protected _analysis: IAnalysis & eui.Component;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      public destroy() {
        super.destroy();
        dir.advancedRoadPool.release(this._advancedRoad, this.tableInfo.gametype);
        dir.analysisPool.release(this._analysis, this.tableInfo.gametype);
      }

      protected checkSkin() {
        if (this.skinName !== utils.getSkinByClassname('LiveListAdvancedItemCompleteSkin')) {
          this.clearComponents();
          this.updateSkin('LiveListAdvancedItemCompleteSkin', false);
          this.validateNow();
          this.initComponents();
          this.arrangeComponents();
          this.setData(this.tableInfo);
        }
      }

      public get advancedRoad() {
        return this._advancedRoad;
      }

      protected initChildren() {
        this.generateAnalysis();
        this.generateAdvancedRoad();
        super.initChildren();
      }

      protected onTouchTap(evt: egret.Event) {
        const target = evt.target;

        if (target instanceof eui.Image && target.name === 'askRoad') {
          evt.stopPropagation();
          return;
        }

        super.onTouchTap(evt);
      }

      protected arrangeComponents() {
        super.arrangeComponents();
        for (const att of this._arrangeProperties) {
          if (this._analysisNode && this._analysis) {
            this._analysis[att] = this._analysisNode[att];
          }
          if (this._advancedRoadNode && this._advancedRoad) {
            this._advancedRoad[att] = this._advancedRoadNode[att];
          }
        }
      }

      protected generateAdvancedRoad() {
        if (this.itemInitHelper) {
          this._advancedRoad = this.itemInitHelper.generateAdvancedRoad(this._advancedRoadNode);
        }
      }

      protected generateAnalysis() {
        if (this.itemInitHelper) {
          this._analysis = this.itemInitHelper.generateAnalysis(this._analysisNode);
          if (this._analysis) {
            this._analysis.cacheAsBitmap = true;
          }
        }
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 350;
        this._originalQuickBetButtonY = 300;
        this._targetQuickbetPanelY = 378;
        this._originalQuickBetPanelY = 100;
        this._offsetLimit = 900;
        this._offsetMovement = 800;
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        // console.log('LiveListAdvancedItem', this._tableId);
        // console.log('LiveListAdvancedItem::onRoadDataUpdate', evt.data);
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
          if (tableInfo.tableid === this._tableId) {
            if (this._analysis) {
              this._analysis.tableId = this._tableId;
              this._analysis.updateRoad();
            }
            if (this._tableInfo && this._advancedRoad) {
              this._advancedRoad.tableInfo = this._tableInfo;
              this._advancedRoad.update(this._tableInfo.roadmap);
            }
          }
        }
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (tableInfo.gametype === we.core.GameType.DI) {
          this._dealerImage.texture = RES.getRes('advanced_dealer_sicbo_png');
        } else {
          const randNo = Math.round(Math.random()) + 1;
          this._dealerImage.texture = RES.getRes('advanced_dealer_' + randNo + '_png');
        }
        if (tableInfo.tableid === this._tableId) {
          if (this._analysis) {
            this._analysis.tableId = this._tableId;
            this._analysis.updateRoad();
          }
          if (this._tableInfo && this._advancedRoad) {
            this._advancedRoad.tableInfo = this._tableInfo;
            this._advancedRoad.update(this._tableInfo.roadmap);
          }
        }
      }

      protected addRoundCornerMask() {}

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        // console.log('LiveListAdvancedItem', this._tableId);
        // console.log('LiveListAdvancedItem::onTableBetInfoUpdate', evt.data);
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
          if (tableInfo.tableid === this._tableId) {
            if (this._analysis) {
              this._analysis.tableId = this._tableId;
              this._analysis.updateTableBetInfo();
            }
          }
        }
      }
    }
  }
}
