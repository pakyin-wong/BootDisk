/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class NotificationQuickBetContent extends ui.ControlItem {
      protected _bigRoad: we.ba.BALobbyBigRoad;
      protected _beadRoad;
      protected _dibeadRoad: we.di.DiLobbyBeadRoad;
      protected _denomLayer: eui.Component;
      protected _alreadyBetSign: eui.Group;
      protected _goodRoadLabel: ui.GoodRoadLabel;
      protected _betChipSetGridSelected: ui.BetChipSetGridSelected;
      protected _betChipSetGridEnabled: boolean = false;

      protected _closeButton: ui.BaseImageButton;
      protected _prevButton: ui.BaseImageButton;

      protected _contentMask: eui.Rect;

      public constructor(skinName: string = 'BaQuickBetContainerSkin') {
        super(skinName);
        this._betChipSet.setUpdateChipSetSelectedChipFunc(this._betChipSetGridSelected.setSelectedChip.bind(this._betChipSetGridSelected));
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        this._betChipSet.init(null, denominationList);
        if (this._beadRoad) {
          if (skinName === 'DiQuickBetContainerSkin') {
            // this._beadRoad.x = 0;
            // this._beadRoad.y = 0;
            // this._beadRoad.scaleX = this._beadRoad.scaleY =1;
            // this._beadRoad.setLayout(3);
            this._beadRoad.roadGridSize = 30;
            this._beadRoad.roadCol = 8;
            this._beadRoad.roadRow = 1;
            this._beadRoad.roadIndentX = 6;
            this._beadRoad.roadIndentY = 5;
            this._beadRoad.roadOffsetX = 12;
            this._beadRoad.roadOffsetY = 5;
            this._beadRoad.roadIconItemYOffset = 4;
            this._beadRoad.roadIconItemColors = [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1]; // [r_color,g_color,b_color, hightlight_color, hightlight_alpha]
            // this._beadRoad.roadImageWidth = 18;
            // this._beadRoad.roadImageHeight = 18;
            // this._beadRoad.roadScale = 1;
            // this._beadRoad.roadGridColor = 0xffffff;
            // this._beadRoad.roadGridAlpha = 1;
            // this._beadRoad.roadGridBorderColor = 0xdfdfdf;
          } else {
            this._beadRoad.roadRow = 3;
            this._beadRoad.roadCol = 8;
            this._beadRoad.roadCellWidth = 42;
            this._beadRoad.roadCellHeight = 42;
            this._beadRoad.roadImageWidth = 27;
            this._beadRoad.roadImageHeight = 35;
            this._beadRoad.roadScale = 1;
            this._beadRoad.roadGridColor = 0xffffff;
            this._beadRoad.roadGridAlpha = 1;
            this._beadRoad.roadGridBorderColor = 0xdfdfdf;
          }
        }
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this._chipLayer.isAlreadyBet()) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (evt && evt.data) {
          const tableBetInfo = <data.GameTableBetInfo> evt.data;
          if (tableBetInfo.tableid === this._tableId) {
            if (this._chipLayer.isAlreadyBet()) {
              this._alreadyBetSign.visible = true;
            } else {
              this._alreadyBetSign.visible = false;
            }
          }
        }
      }

      protected addEventListeners() {
        super.addEventListeners();
        this._betChipSetGridSelected.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        this._closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        this._prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._betChipSetGridSelected.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        this._closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        this._prevButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
      }

      public getActionButton(): eui.Component {
        return null;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            this._bigRoad.updateSideBarRoadData(tableInfo.roadmap);
          }
          if (this._beadRoad) {
            this._beadRoad.updateSideBarRoadData(tableInfo.roadmap);
          }
        }
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

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo>evt.data;
          if (tableInfo.tableid === this._tableId) {
            if (this._bigRoad) {
              this._bigRoad.updateSideBarRoadData(tableInfo.roadmap);
            }
            if (this._beadRoad) {
              this._beadRoad.updateSideBarRoadData(tableInfo.roadmap);
            }
          }
        }
      }

      protected initChildren() {
        super.initChildren();
        this._betChipSet.resetFormat(1);
        this._goodRoadLabel.visible = false;
        this._contentContainer.mask = this._contentMask;
      }

      protected onBetDetailUpdateInBetState() {
        super.onBetDetailUpdateInBetState();
        if (this.hasBet()) {
          this.removeSelf();
        }
      }

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        this.removeSelf();
      }

      protected onMatchGoodRoadUpdate() {
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          this.removeSelf();
        }
      }

      protected removeSelf() {
        this.dispatchEvent(new egret.Event('DISMISS'));
      }

      public onClickUndoButton(evt: egret.Event) {
        this._undoStack.popAndUndo();
      }

      protected onClickBetChipSelected() {
        this._betChipSetGridEnabled ? this.hideBetChipPanel() : this.showBetChipPanel();
      }

      protected showBetChipPanel() {
        egret.Tween.get(this._betChipSet).to({ y: 390, alpha: 1 }, 250);
        this._betChipSetGridEnabled = true;
      }

      protected hideBetChipPanel() {
        egret.Tween.get(this._betChipSet).to({ y: 0, alpha: 0 }, 250);
        this._betChipSetGridEnabled = false;
      }
    }
  }
}
