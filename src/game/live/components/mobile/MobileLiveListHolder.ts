namespace we {
  export namespace live {
    export class MobileLiveListHolder extends ui.TableListItemHolder {
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
        this._mode = env.lobbyGridType;
        dir.evtHandler.addEventListener(core.Event.LIVE_DISPLAY_MODE, this.switchMode, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
        // console.log('we.live.LiveListHolder::mount()');
      }

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.LIVE_DISPLAY_MODE, this.switchMode, this);
        // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
      }

      private switchMode(evt: egret.Event) {
        logger.l('LiveListHolder::switchMode', evt.data);
        this.mode = evt.data;
      }

      protected initDisplayItem() {
        let generalGameType: string;

        if (!this.tableInfo) {
          return;
        }

        switch (this.tableInfo.gametype) {
          //  switch (0) {
          case we.core.GameType.BAC:
          case we.core.GameType.BAI:
          case we.core.GameType.BAS:
            generalGameType = 'ba';
            break;
          case we.core.GameType.DT:
          default:
            generalGameType = 'dt';
        }

        switch (this._mode) {
          case we.lobby.mode.NORMAL:
            this._displayItem = new we.ui.MobileLiveListItem(generalGameType + '.LiveListItemSkin');
            this.setDisplayItem(this._displayItem);
            this.width = 1140;
            this.height = 388;
            if (this.tableInfo) {
              this.updateDisplayItem();
            }
            break;
          case we.lobby.mode.SIMPLE:
          case we.lobby.mode.ADVANCED:
          default:
            this._displayItem = new we.ui.MobileLiveListSimpleItem(generalGameType + '.LiveListSimpleItemSkin');
            this.setDisplayItem(this._displayItem);
            this.width = 578;
            this.height = 219;
            // this._displayItem.addEventListener(mouse.MouseEvent.ROLL_OVER, this._displayItem.onRollover.bind(this._displayItem), this);
            // this._displayItem.addEventListener(mouse.MouseEvent.ROLL_OUT, this._displayItem.onRollout.bind(this._displayItem), this);
            if (this.tableInfo) {
              this.updateDisplayItem();
            }
        }
      }

      set mode(value: we.lobby.mode) {
        if (this._mode === value) {
          return;
        }

        this._mode = value;
        this.initDisplayItem();
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

      public changeState(state: number): boolean {
        switch (state) {
          case ui.TableListItemHolder.STATE_NORMAL:
            if (this.isFocus) {
              this.list.dispatchEvent(new egret.Event(ui.TableList.UNLOCK, false, false, this));
            }
            this._holderState = ui.TableListItemHolder.STATE_NORMAL;
            return true;
          case ui.TableListItemHolder.STATE_FOCUS:
            this.list.dispatchEvent(new egret.Event(ui.TableList.LOCK, false, false, this));
            this._holderState = ui.TableListItemHolder.STATE_FOCUS;
            return true;
        }
      }

      protected updateDisplayItem() {
        if (!this._displayItem) {
          return;
        }
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
