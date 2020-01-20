namespace we {
  export namespace ui {
    export class SideListBetItem extends ListBaseItem {
      protected _resultTable: eui.Image;
      protected _bettingGroup: eui.Group;
      protected _resultGroup: eui.Group;
      protected _betEnabled: boolean = false;
      protected _quickbetButton: ui.BaseImageButton;
      protected _closeButton: ui.BaseImageButton;
      protected _prevButton: ui.BaseImageButton;
      protected _betChipSetGridSelected: ui.BetChipSetGridSelected;
      protected _betChipSetGridEnabled: boolean = false;

      public constructor(skinName: string = null) {
        super(skinName);
        this._betChipSet.injectSetSelectedChip(this._betChipSetGridSelected.setSelectedChip.bind(this._betChipSetGridSelected));
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chipList;
        this._betChipSetGridSelected.setValue(denominationList[0]);
        this._betChipSetGridSelected.index = 0;
      }

      protected onClickBetChipSelected() {
        this._betChipSetGridEnabled ? this.hideBetChipPanel() : this.showBetChipPanel();
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 168;
        this._originalQuickBetButtonY = 85;
        this._targetQuickbetPanelY = 154;
        this._originalQuickBetPanelY = 0;
        this._offsetLimit = 650;
        this._offsetMovement = 550;
        this._hoverScale = 1;
      }

      protected initChildren() {
        super.initChildren();
        this._betChipSet.resetFormat(1);
        this._bettingTable.setGameMode(false);
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        this._bettingGroup.visible = enable;
        this._bettingTable.setTouchEnabled(this._betEnabled);
      }

      protected setResultRelatedComponentsEnabled(enable: boolean) {
        super.setResultRelatedComponentsEnabled(enable);
        this._resultGroup.visible = enable;
        this._bettingTable.setTouchEnabled(this._betEnabled);
      }

      public onClickButton(evt: egret.Event) {
        super.onClickButton(evt);
      }

      public onClickUndoButton(evt: egret.Event) {
        this._undoStack.popAndUndo();
      }

      protected showBetChipPanel() {
        egret.Tween.get(this._betChipSet).to({ y: 290, alpha: 1 }, 250);
        this._betChipSetGridEnabled = true;
      }

      protected hideBetChipPanel() {
        egret.Tween.get(this._betChipSet).to({ y: 0, alpha: 0 }, 250);
        this._betChipSetGridEnabled = false;
      }

      protected setStateIdle(isInit: boolean = false) {
        super.setStateIdle(isInit);
        this.list.removeTable(this._tableId);
      }

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        if (this._previousState !== we.core.GameState.DEAL) {
          env.tableInfos[this._tableId].prevbets = env.tableInfos[this._tableId].bets;
          env.tableInfos[this._tableId].prevbetsroundid = env.tableInfos[this._tableId].roundid;
        }
      }

      public getActionButton(): eui.Component {
        return this._quickbetButton;
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

      protected hideQuickBetGroup() {
        egret.Tween.removeTweens(this._quickbetButton);
        egret.Tween.get(this._quickbetButton).to({ alpha: 1 }, 250);
        this._betChipSetGridEnabled = false;
        this._betEnabled = false;
        this._bettingTable.setTouchEnabled(this._betEnabled);
        this.hideBetChipPanel();
        super.hideQuickBetGroup();
      }

      protected showQuickBetGroup() {
        egret.Tween.removeTweens(this._quickbetButton);
        egret.Tween.get(this._quickbetButton).to({ alpha: 0 }, 250);
        this._betChipSetGridEnabled = true;
        this._betEnabled = true;
        this._bettingTable.setTouchEnabled(this._betEnabled);
        super.showQuickBetGroup();
      }

      protected addEventListeners() {
        super.addEventListeners();
        this._prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this._closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this._betChipSetGridSelected.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._prevButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
        this._quickbetButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this._closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
      }
    }
  }
}
