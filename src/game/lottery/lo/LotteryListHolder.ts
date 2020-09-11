namespace we {
  export namespace lo {
    export class LotteryListHolder extends ui.TableListItemHolder {
      protected _mode: we.lobby.mode;
      protected _displayItem: we.ui.TableListItem;

      public constructor() {
        super();
      }

      protected async mount() {
        super.mount();
        this._mode = we.lobby.mode.NORMAL;
        dir.evtHandler.addEventListener(core.Event.LIVE_DISPLAY_MODE, this.switchMode, this);
      }

      protected destroy() {
        super.mount();
        dir.evtHandler.removeEventListener(core.Event.LIVE_DISPLAY_MODE, this.switchMode, this);
      }

      private switchMode(evt: egret.Event) {
        logger.l(utils.LogTarget.DEBUG, 'LiveListHolder::switchMode', evt.data);
        this.mode = evt.data;
      }

      protected initDisplayItem() {
        logger.l(utils.LogTarget.DEBUG, this.tableInfo);

        if (!this.tableInfo || this._displayItem) {
          return;
        }

        this.updateDisplayItemMode();
      }

      set mode(value: we.lobby.mode) {
        if (this._mode === value) {
          return;
        }

        this._mode = value;
        this.updateDisplayItemMode();
      }

      get mode() {
        return this._mode;
      }

      protected updateDisplayItemMode() {
        let itemName;

        switch (this._mode) {
          case we.lobby.mode.NORMAL:
            this.width = 786;
            this.height = 410;
            itemName = 'LotteryListItem';
            break;
          case we.lobby.mode.ADVANCED:
            // this.width = 1204;
            // this.height = 450;
            // itemName = 'LiveListAdvancedItem';
            break;
          case we.lobby.mode.SIMPLE:
            // this.width = 578;
            // this.height = 219;
            // itemName = 'LiveListSimpleItem';
            break;
          default:
            logger.e(utils.LogTarget.DEBUG, 'LiveListHolder::initDisplayItem() - no "mode" can be read');
        }

        const listItem = new we.lo[itemName](`${itemName}`);
        listItem.itemInitHelper = new lo.LotteryListItemInitHelper();

        this._displayItem = listItem;
        this.setDisplayItem(this._displayItem);
        if (this.tableInfo) {
          this.updateDisplayItem();
        }
      }

      public itemDataChanged() {
        super.itemDataChanged();
        egret.Tween.removeTweens(this);
        this.updateDisplayItem();
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

      public onTouchTapWhole(evt: egret.Event) {
        // check if the parent name is "ActionButton"
        let t = evt.target;
        if (t.stage) {
          while (!(t instanceof egret.Stage)) {
            if (t.name === 'ActionButton') {
              return;
            } else {
              t = t.parent;
            }
          }
        }
        //
        if (evt.currentTarget !== evt.target) {
          if (evt.target.hasEventListener(egret.TouchEvent.TOUCH_TAP) || evt.target.hasEventListener(eui.UIEvent.CHANGE)) {
            return;
          }
        }
        //
        const target = this._displayItem.getActionButton();
        if (evt.target === target || this.isFocus) {
          return;
        }
        dir.socket.enterTable(this.itemData);
        this.gotoScene();
      }
    }
  }
}
