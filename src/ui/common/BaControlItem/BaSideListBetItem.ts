namespace we {
  export namespace ba {
    export class BaSideListBetItem extends BaListBaseItem {
      protected _resultTable: eui.Image;
      protected _bettingGroup: eui.Group;
      protected _resultGroup: eui.Group;
      protected _betEnabled: boolean = false; //

      public constructor(skinName: string = 'BaSideListBetItemSkin') {
        super(skinName);
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
        this._betChipSet.resetDenomNum(2);
        this._bettingTable.setGameMode(false);
        console.log('BaSideListBetItem::initChildren - run 1');
        console.log('BaSideListBetItem::initChildren - run 2');
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
        this._betEnabled = !this._betEnabled;
        this._bettingTable.setTouchEnabled(this._betEnabled);
      }
    }
  }
}
