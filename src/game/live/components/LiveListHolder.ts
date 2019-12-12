namespace we {
  export namespace live {
    export class LiveListHolder extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private _mode: we.lobby.mode;
      private _item: we.live.LiveBaListSimpleItem;

      public constructor() {
        super();
        this.touchEnabled = true;
        this.mount();
      }

      private async mount() {
        this.mode = we.lobby.mode.NORMAL;
        dir.evtHandler.addEventListener(core.Event.LIVE_DISPLAY_MODE, this.switchMode, this);
        console.log('we.live.LiveListHolder::mount()');
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
            this.removeChildren();
            this._item = new we.live.LiveBaListItem();
            this.addChild(this._item);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
            this._item.addEventListener(mouse.MouseEvent.ROLL_OVER, this._item.onRollover.bind(this._item), this);
            this._item.addEventListener(mouse.MouseEvent.ROLL_OUT, this._item.onRollout.bind(this._item), this);
            break;
          case we.lobby.mode.SIMPLE:
          case we.lobby.mode.ADVANCED:
          default:
            this.width = 578;
            this.height = 219;
            this.removeChildren();
            this._item = new we.live.LiveBaListSimpleItem();
            this.addChild(this._item);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
            this._item.addEventListener(mouse.MouseEvent.ROLL_OVER, this._item.onRollover.bind(this._item), this);
            this._item.addEventListener(mouse.MouseEvent.ROLL_OUT, this._item.onRollout.bind(this._item), this);
        }
        this._mode = value;
      }

      get mode() {
        return this._mode;
      }

      public onTouchTapWhole(evt: egret.Event) {
        const target = this._item.getQuickbetButton();
        if (evt.target === target || env.livepageLocked === this.itemData.toString()) {
          return;
        }
        console.log('we.live.LiveBaccartListItem::onclick - tableid' + this.itemData);
        dir.socket.enterTable(this.itemData);
        dir.sceneCtr.goto('ba', { tableid: this.itemData });
      }

      public itemDataChanged() {
        super.itemDataChanged();
        logger.l('LiveListHolder::itemDataChanged::this.itemData', this.itemData);
        switch (this._mode) {
          case we.lobby.mode.NORMAL:
          case we.lobby.mode.SIMPLE:
          case we.lobby.mode.ADVANCED:
          default:
            this._item.tableId = this.itemData;
            this._item.setupTableInfo();
            this._item.updateGame();
            this._item.labelText = this.itemData;
            this.setZIndex();

            const table = env.tableInfos[this.itemData];
            this._item.bigRoad.updateRoadData(table.roadmap);

            egret.Tween.removeTweens(this);
        }
      }

      private setZIndex() {
        if (env.livepageLocked && env.livepageLocked.toString() === this.itemData.toString()) {
          this.parent.setChildIndex(this, 1000);
        } else {
          this.parent.setChildIndex(this, 1);
        }
      }
    }
  }
}
