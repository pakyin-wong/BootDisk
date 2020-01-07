/* tslint:disable triple-equals */
namespace we {
  export namespace ba {
    export class LiveListSimpleItem extends BaListBaseItem {
      protected _quickbetButton: ui.RoundButton;
      protected _bigRoad: we.ba.BALobbyBigRoad;
      protected _denomLayer: eui.Component;
      protected _alreadyBetSign: eui.Group;

      public constructor(skinName: string = 'BaLiveListSimpleItemSkin') {
        super(skinName);
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this._bettingTable.isAlreadyBet()) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected onTableBetInfoUpdate() {
        super.onTableBetInfoUpdate();
        if (this._bettingTable.isAlreadyBet()) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected addEventListeners() {
        super.addEventListeners();
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._quickbetButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
      }

      public getActionButton(): eui.Component {
        return this._quickbetButton;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
          }
        }
      }

      protected showQuickBetGroup() {
        this._quickbetButton.tweenLabel(!this.list.isLocked);
        super.showQuickBetGroup();
        if (this._denomLayer) {
          egret.Tween.removeTweens(this._denomLayer);
          egret.Tween.get(this._denomLayer).to({ y: this._targetQuickbetPanelY, alpha: 1 }, this._tweenInterval1);
        }
      }

      protected hideQuickBetGroup() {
        this._quickbetButton.tweenLabel(!this.list.isLocked);
        super.hideQuickBetGroup();
        if (this._denomLayer) {
          egret.Tween.removeTweens(this._denomLayer);
          egret.Tween.get(this._denomLayer).to({ y: this._originalQuickBetPanelY, alpha: 0 }, this._tweenInterval1);
        }
      }

      protected setBetRelatedComponentsEnabled(enable) {
        super.setBetRelatedComponentsEnabled(enable);
        if (!this._mouseOutside && enable) {
          this._quickbetButton.tweenLabel(false, false);
        }
      }

      public onRollover(evt: egret.Event) {
        super.onRollover(evt);
        if (!this.list.isLocked) {
          if (this._quickbetEnable) {
            this._quickbetButton.tweenLabel(false);
          }
        }
      }

      protected animateQuickBetButton(show: boolean) {
        super.animateQuickBetButton(show);
        egret.Tween.removeTweens(this._quickbetButton);
        if (show) {
          egret.Tween.get(this._quickbetButton).to({ y: this._originalQuickBetButtonY, alpha: 1 }, this._tweenInterval1);
        } else {
          egret.Tween.get(this._quickbetButton).to({ y: this._targetQuickBetButtonY, alpha: 0 }, 250);
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

      protected initChildren() {
        super.initChildren();
        if (this._bettingTable && this._bettingTable.denomLayer) {
          this._denomLayer = this._bettingTable.denomLayer;
          this._denomLayer.y = this._bettingTable.y;
          this._denomLayer.x = this._bettingTable.x;
          this._denomLayer.alpha = 0;
          this.addChild(this._denomLayer);
          this.setChildIndex(this._denomLayer, 30000);
        }
      }
    }
  }
}
