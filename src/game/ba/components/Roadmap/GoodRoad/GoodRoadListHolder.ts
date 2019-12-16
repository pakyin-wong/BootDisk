namespace we {
  export namespace ba {
    export class GoodRoadListHolder extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private _item: we.ba.GoodRoadListItem;
      protected destinationX: number = Infinity;
      protected destinationY: number = Infinity;
      protected isDirty = true;

      public constructor() {
        super();
        this.touchEnabled = true;
        this.mount();
      }

      private async mount() {
        this.width = 293;
        this.height = 225;
        this._item = new we.ba.GoodRoadListItem();
        this.addChild(this._item);

        this._item.setRoadType(2);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
      }

      public onTouchTapWhole(evt: egret.Event) {
        console.log('we.live.LiveBaccartListItem::onclick - tableid' + this.itemData);
      }

      public itemDataChanged() {
        super.itemDataChanged();

        console.log(this.itemData);
      }
    }
  }
}
