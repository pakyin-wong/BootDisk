namespace we {
  export namespace ui {
    export class LiveListAdvancedItem extends LiveListItem {
      protected _betChipSetGridSelected: ui.BetChipSetGridSelected;
      protected _betChipSetGridEnabled: boolean = false;
      protected _closeButton: ui.BaseImageButton;

      protected _advancedRoadNode: eui.Component;
      protected _advancedRoad: IAdvancedRoad & eui.Component;
      protected _analysisNode: eui.Component;
      protected _analysis: IAnalysis & eui.Component;

      public constructor(skinName: string = null) {
        super(skinName);
        this._hoverScale = 1.01;
      }

      protected getBetChipSet() {
        const betChipSet = new BetChipSetGrid();
        betChipSet.setUpdateChipSetSelectedChipFunc(this._betChipSetGridSelected.setSelectedChip.bind(this._betChipSetGridSelected));
        return betChipSet;
      }

      public destroy() {
        super.destroy();
        if (this._advancedRoad && this.tableInfo) {
          dir.advancedRoadPool.release(this._advancedRoad, this.tableInfo.gametype);
        }
        if (this._analysis && this.tableInfo) {
          dir.analysisPool.release(this._analysis, this.tableInfo.gametype);
        }
      }

      public get advancedRoad() {
        return this._advancedRoad;
      }

      protected initChildren() {
        const analysis = this.generateAnalysis();
        const advancedRoad = this.generateAdvancedRoad();
        analysis.advancedRoad = advancedRoad;
        advancedRoad.analysis = analysis;
        super.initChildren();
      }

      protected showQuickBetGroup() {
        super.showQuickBetGroup();
        this._quickBetGroup.touchEnabled = true;
        this._quickBetGroup.touchChildren = true;
      }

      protected hideQuickBetGroup() {
        super.hideQuickBetGroup();
        this._quickBetGroup.touchEnabled = false;
        this._quickBetGroup.touchChildren = false;
        this.hideBetChipPanel();
      }

      protected onTouchTap(evt: egret.Event) {
        const target = evt.target;

        if (target instanceof eui.Group && target.name === 'skipEnterScene') {
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
          if (this._advancedRoad) {
            this._advancedRoad.touchEnabled = false;
            this._advancedRoad.touchChildren = false;
          }
        }
        return this._advancedRoad;
      }

      protected generateAnalysis() {
        if (this.itemInitHelper) {
          this._analysis = this.itemInitHelper.generateAnalysis(this._analysisNode);
          if (this._analysis) {
            this._analysis.cacheAsBitmap = true;
            this._analysis.touchEnabled = false;
          }
        }
        return this._analysis;
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 350;
        this._originalQuickBetButtonY = 300;
        this._targetQuickbetPanelY = 541;
        this._originalQuickBetPanelY = 241;
        this._offsetLimit = 900;
        this._offsetMovement = 800;
      }

      protected addEventListeners() {
        super.addEventListeners();
        this._betChipSetGridSelected.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        this._closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._betChipSetGridSelected.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        this._closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
      }

      public onClickUndoButton(evt: egret.Event) {
        this._undoStack.popAndUndo();
      }

      protected onClickBetChipSelected() {
        this._betChipSetGridEnabled ? this.hideBetChipPanel() : this.showBetChipPanel();
      }

      protected showBetChipPanel() {
        if (this._betChipSet) {
          egret.Tween.get(this._betChipSet).to({ y: 590, alpha: 1 }, 250);
        }
        this._betChipSetGridEnabled = true;
      }

      protected hideBetChipPanel() {
        if (this._betChipSet) {
          egret.Tween.get(this._betChipSet).to({ y: 0, alpha: 0 }, 250);
        }
        this._betChipSetGridEnabled = false;
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

      protected tweenChipLayer(isShow: boolean) {}

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
