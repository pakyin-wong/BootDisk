namespace we {
  export namespace live {
    export class LiveBannerItem extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private image: eui.Image;

      protected destinationX: number = Infinity;
      protected destinationY: number = Infinity;
      protected isDirty = true;

      public constructor() {
        super();
        this.height = 400;
        this.image = new eui.Image();
        this.image.percentWidth = 100;
        this.image.percentHeight = 100;
        this.addChild(this.image);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
      }

      public itemDataChanged() {
        super.itemDataChanged();
        this.image.source = RES.getRes(this.itemData);
        this.image.fillMode = egret.BitmapFillMode.SCALE;
      }
    }
  }
}
