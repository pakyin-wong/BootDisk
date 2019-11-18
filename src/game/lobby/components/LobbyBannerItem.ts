namespace we {
  export namespace lobby {
    export class LobbyBannerItem extends eui.Component implements eui.IItemRenderer {
      public selected: boolean;
      public itemIndex: number;
      private _data: string;

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

      public get data() {
        return this._data;
      }

      public set data(data: string) {
        this.image.source = RES.getRes(data);
        this.image.fillMode = egret.BitmapFillMode.SCALE;
        this._data = data;
      }
    }
  }
}
