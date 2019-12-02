namespace we {
  export namespace live {
    export class LiveListItem extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;
      private _idata: any;

      private rect: eui.Rect;
      private label: eui.Label;

      protected destinationX: number = Infinity;
      protected destinationY: number = Infinity;
      protected isDirty = true;

      public constructor() {
        super();
        this.skinName = utils.getSkin('LobbyBaccaratListItem');
      }

      // public get data() {
      //   return this._idata;
      // }

      // public set data(data: any) {
      //   this.isDirty = true;
      //   this._idata = data;
      //   // console.log(table);
      //   this.label.text = `${this._idata}`;
      //   egret.Tween.removeTweens(this);
      //   // if (data === null) {
      //   //   this.visible = false;
      //   // } else {
      //   //   this.rect.fillColor = data;
      //   //   this.visible = true;
      //   // }
      // }

      public itemDataChanged() {
        super.itemDataChanged();
        // console.log(table);
        this.label.text = `${this.itemData}`;
        egret.Tween.removeTweens(this);
      }
    }
  }
}
