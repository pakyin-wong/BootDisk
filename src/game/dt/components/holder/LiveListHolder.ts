namespace we {
  export namespace dt {
    export class LiveListHolder extends ui.TableListItemHolder {
      public selected: boolean;
      public itemIndex: number;

      private _mode: we.lobby.mode;
      protected _displayItem: we.ui.TableListItem;

      public constructor() {
        super();
      }

      protected async mount() {
        super.mount();
        this._mode = env.lobbyGridType;
        dir.evtHandler.addEventListener(core.Event.LIVE_DISPLAY_MODE, this.switchMode, this);
      }

      protected destroy() {
        super.mount();
        dir.evtHandler.removeEventListener(core.Event.LIVE_DISPLAY_MODE, this.switchMode, this);
      }

      private switchMode(evt: egret.Event) {
        logger.l('LiveListHolder::switchMode', evt.data);
        this.mode = evt.data;
      }

      protected initDisplayItem() {
        logger.l(this.tableInfo);

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

      // public onTouchTapWhole(evt: egret.Event) {
      //   const target = this._displayItem.getActionButton();
      //   if (evt.target === target || this.isFocus) {
      //     return;
      //   }
      //   console.log('we.live.LiveBaccartListItem::onclick - tableid' + this.itemData);
      //   dir.socket.enterTable(this.itemData);
      //   dir.sceneCtr.goto('ba', { tableid: this.itemData });
      // }

      protected updateDisplayItemMode() {
        let itemName;

        switch (this._mode) {
          case we.lobby.mode.NORMAL:
            this.width = 578;
            this.height = 388;
            itemName = 'LiveListItem';
            break;
          case we.lobby.mode.ADVANCED:
            this.width = 1204;
            this.height = 450;
            itemName = 'LiveListAdvancedItem';
            break;
          case we.lobby.mode.SIMPLE:
            this.width = 578;
            this.height = 219;
            itemName = 'LiveListSimpleItem';
            break;
          default:
            logger.e('LiveListHolder::initDisplayItem() - no "mode" can be read');
        }

        const listItem = new we.ui[itemName](`${itemName}CompleteSkin`);
        listItem.itemInitHelper = new we.dt.LiveListItemInitHelper();

        this._displayItem = listItem;
        this.setDisplayItem(this._displayItem);
        if (this.tableInfo) {
          this.updateDisplayItem();
        }
      }

      public itemDataChanged() {
        super.itemDataChanged();
        this.updateDisplayItem();
        egret.Tween.removeTweens(this);
        // console.log('LiveListHolder::itemDataChanged::this.itemData - ', this.itemData);
        /*
        switch (this._mode) {
          case we.lobby.mode.NORMAL:
          case we.lobby.mode.SIMPLE:
          case we.lobby.mode.ADVANCED:
          default:
            this.updateDisplayItem();
            egret.Tween.removeTweens(this);
        }
        */
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
