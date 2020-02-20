/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class LiveListSimpleItem extends ListBaseItem {
      protected _quickbetButton: eui.Component & IQuickBetAnimButton;
      protected _bigRoad: we.ba.BALobbyBigRoad;
      protected _alreadyBetSign: eui.Group;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this._chipLayer.isAlreadyBet()) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected onTableBetInfoUpdate() {
        super.onTableBetInfoUpdate();
        if (this._chipLayer.isAlreadyBet()) {
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
        this._quickbetButton.tween(!this.list.isLocked);
        super.showQuickBetGroup();
        if (this._tableLayer) {
          egret.Tween.removeTweens(this._tableLayer);
          egret.Tween.get(this._tableLayer).to({ y: this._targetQuickbetPanelY, alpha: 1 }, this._tweenInterval1);
        }
      }

      protected hideQuickBetGroup() {
        this._quickbetButton.tween(!this.list.isLocked);
        super.hideQuickBetGroup();
        if (this._tableLayer) {
          egret.Tween.removeTweens(this._tableLayer);
          egret.Tween.get(this._tableLayer).to({ y: this._originalQuickBetPanelY, alpha: 0 }, this._tweenInterval1);
        }
      }

      protected setBetRelatedComponentsEnabled(enable) {
        super.setBetRelatedComponentsEnabled(enable);
        if (!this._mouseOutside && enable) {
          this._quickbetButton.tween(false, false);
        }
      }

      public onRollover(evt: egret.Event) {
        super.onRollover(evt);
        if (!this.list.isLocked) {
          if (this._quickbetEnable) {
            this._quickbetButton.tween(false);
          }
        }
      }

      protected animateQuickBetButton(show: boolean) {
        super.animateQuickBetButton(show);
        egret.Tween.removeTweens(this._quickbetButton);
        if (show) {
          egret.Tween.get(this._quickbetButton)
            .set({ visible: true })
            .to({ y: this._originalQuickBetButtonY, alpha: 1 }, this._tweenInterval1);
        } else {
          egret.Tween.get(this._quickbetButton)
            .to({ y: this._targetQuickBetButtonY, alpha: 0 }, 250)
            .set({ visible: false });
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo>evt.data;
          if (tableInfo.tableid === this._tableId) {
            if (this._bigRoad) {
              this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
            }
          }
        }
      }

      protected initChildren() {
        super.initChildren();
        if (this._chipLayer && this._tableLayer) {
          this.addChild(this._tableLayer);
          this.setChildIndex(this._tableLayer, 30000);
        }
      }
    }
  }
}
