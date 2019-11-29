namespace we {
  export namespace live {
    export class LiveBaccaratListHolder extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private _item: we.live.LiveBaccaratListItem;
      protected destinationX: number = Infinity;
      protected destinationY: number = Infinity;
      protected isDirty = true;

      public constructor() {
        super();
        this.touchEnabled = true;
        this.mount();
      }

      private async mount() {
        this.height = 388;
        this.width = 578;
        console.log('we.live.LiveBaccaratListHolder::mount()');
        console.log(this.itemData);
        this._item = new we.live.LiveBaccaratListItem();
        this.addChild(this._item);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
      }
      public onTouchTapWhole(evt: egret.Event) {
        if (evt.target === this._item.getQuickbetButton() || env.livepageLocked) {
          return;
        }
        console.log('we.live.LiveBaccartListItem::onclick - tableid' + this.itemData);
        dir.socket.enterTable(this.itemData);
        dir.sceneCtr.goto('ba', { tableid: this.itemData });
      }

      public itemDataChanged() {
        super.itemDataChanged();
        const table = env.tableInfos[this.itemData];
        this._item.setTableId(this.itemData);
        this._item.bigRoad.updateRoadData(table.roadmap);
        this.setZIndex();
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
