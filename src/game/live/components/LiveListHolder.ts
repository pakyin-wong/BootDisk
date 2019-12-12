namespace we {
  export namespace live {
    export class LiveListHolder extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private _item: we.live.LiveBaListItem;

      public constructor() {
        super();
        this.touchEnabled = true;
        this.mount();
      }

      private async mount() {
        this.width = 578;
        this.height = 388;
        console.log('we.live.LiveListHolder::mount()');
        this._item = new we.live.LiveBaListItem();
        this.addChild(this._item);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
        this._item.addEventListener(mouse.MouseEvent.ROLL_OVER, this._item.onRollover.bind(this._item), this);
        this._item.addEventListener(mouse.MouseEvent.ROLL_OUT, this._item.onRollout.bind(this._item), this);
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

        this._item.tableId = this.itemData;
        this._item.setupTableInfo();
        this._item.updateGame();
        this._item.labelText = this.itemData;
        this.setZIndex();

        const table = env.tableInfos[this.itemData];
        this._item.bigRoad.updateRoadData(table.roadmap);

        egret.Tween.removeTweens(this);
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
