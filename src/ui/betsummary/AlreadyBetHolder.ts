namespace we {
  export namespace ui {
    export class AlreadyBetHolder extends ui.TableListItemHolder {
      private _gameType: we.core.GameType;
      protected _displayItem: we.ui.AlreadyBetItem;

      public constructor() {
        super();
        this.touchEnabled = true;
        this.mount();
      }

      protected async mount() {
        console.log('we.live.BetInfoHolder::mount()');
        this.gameType = we.core.GameType.BAC;
        // dir.evtHandler.addEventListener(core.Event.LIVE_DISPLAY_MODE, this.switchMode, this);
      }

      set gameType(value: we.core.GameType) {
        if (this._gameType === value) {
          return;
        }
        switch (value) {
          case we.core.GameType.BAC:
          default:
            this.width = 442;
            this.height = 388;
            this._displayItem = new we.ui.AlreadyBetItem();
            this.setDisplayItem(this._displayItem);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
            this._displayItem.addEventListener(mouse.MouseEvent.ROLL_OVER, this._displayItem.onRollover.bind(this._displayItem), this);
            this._displayItem.addEventListener(mouse.MouseEvent.ROLL_OUT, this._displayItem.onRollout.bind(this._displayItem), this);
            if (this.tableInfo) {
              this.updateDisplayItem();
            }
            break;
        }
        this._gameType = value;
      }

      get gameType() {
        return this._gameType;
      }

      public onTouchTapWhole(evt: egret.Event) {
        const target = this._displayItem.getQuickbetButton();
        if (evt.target === target || this.isFocus) {
          return;
        }
        console.log('we.live.AlreadyBetHolder::onclick - tableid' + this.itemData);
        dir.socket.enterTable(this.itemData);
        dir.sceneCtr.goto('ba', { tableid: this.itemData });
      }

      public itemDataChanged() {
        super.itemDataChanged();
        console.log('AlreadyBetHolder::itemDataChanged::this.itemData - ', this.itemData);
        switch (this._gameType) {
          case we.core.GameType.BAC:
          default:
            this.updateDisplayItem();
            egret.Tween.removeTweens(this);
        }
      }

      protected updateDisplayItem() {
        this._displayItem.setData(this.tableInfo);
        this._displayItem.updateGame();
        this._displayItem.labelRenderText = () => `${i18n.t('baccarat.baccarat')} ${env.getTableNameByID(this.itemData)}`;
        this.setZIndex();
      }

      private setZIndex() {
        if (this.isFocus) {
          if (this.parent) {
            this.parent.setChildIndex(this, 1000);
          }
        } else {
          if (this.parent) {
            this.parent.setChildIndex(this, 1);
          }
        }
      }
    }
  }
}
