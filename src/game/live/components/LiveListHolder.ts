namespace we {
  export namespace live {
    export class LiveListHolder extends ui.TableListItemHolder {
      public selected: boolean;
      public itemIndex: number;

      private _mode: we.lobby.mode;
      protected _displayItem: we.ui.TableListItem;

      public constructor() {
        super();
        // this.touchEnabled = true;
        // this.mount();
      }

      protected async mount() {
        super.mount();
        this.mode = env.lobbyGridType;
        dir.evtHandler.addEventListener(core.Event.LIVE_DISPLAY_MODE, this.switchMode, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
        // console.log('we.live.LiveListHolder::mount()');
      }

      protected destroy() {
        super.mount();
        dir.evtHandler.removeEventListener(core.Event.LIVE_DISPLAY_MODE, this.switchMode, this);
        // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
      }

      private switchMode(evt: egret.Event) {
        logger.l('LiveListHolder::switchMode', evt.data);
        this.mode = evt.data;
      }

      set mode(value: we.lobby.mode) {
        if (this._mode === value) {
          return;
        }
        switch (value) {
          case we.lobby.mode.NORMAL:
            this.width = 578;
            this.height = 388;
            this._displayItem = new we.ba.BaLiveListItem();
            this.setDisplayItem(this._displayItem);
            // this._displayItem.addEventListener(mouse.MouseEvent.ROLL_OVER, this._displayItem.onRollover.bind(this._displayItem), this);
            // this._displayItem.addEventListener(mouse.MouseEvent.ROLL_OUT, this._displayItem.onRollout.bind(this._displayItem), this);
            if (this.tableInfo) {
              this.updateDisplayItem();
            }
            break;
          case we.lobby.mode.SIMPLE:
          case we.lobby.mode.ADVANCED:
          default:
            this.width = 578;
            this.height = 219;
            this._displayItem = new we.ba.BaLiveListSimpleItem();
            this.setDisplayItem(this._displayItem);
            // this._displayItem.addEventListener(mouse.MouseEvent.ROLL_OVER, this._displayItem.onRollover.bind(this._displayItem), this);
            // this._displayItem.addEventListener(mouse.MouseEvent.ROLL_OUT, this._displayItem.onRollout.bind(this._displayItem), this);
            if (this.tableInfo) {
              this.updateDisplayItem();
            }
        }
        this._mode = value;
      }

      get mode() {
        return this._mode;
      }

      // public onTouchTapWhole(evt: egret.Event) {
      //   const target = this._displayItem.getActionButton();
      //   if (evt.target === target || this.isFocus) {
      //     return;
      //   }
      //   console.log('we.live.LiveBaccartListItem::onclick - tableid' + this.itemData);
      //   dir.socket.enterTable(this.itemData);
      //   dir.sceneCtr.goto('ba', { tableid: this.itemData });
      // }

      public itemDataChanged() {
        super.itemDataChanged();
        // console.log('LiveListHolder::itemDataChanged::this.itemData - ', this.itemData);
        switch (this._mode) {
          case we.lobby.mode.NORMAL:
          case we.lobby.mode.SIMPLE:
          case we.lobby.mode.ADVANCED:
          default:
            this.updateDisplayItem();
            egret.Tween.removeTweens(this);
        }
      }

      protected updateDisplayItem() {
        this._displayItem.setData(this.tableInfo);
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
