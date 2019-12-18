namespace we {
  export namespace ui {
    export class TestItem extends ItemRenderer {
      protected _label: eui.Label;
      public moveArea: eui.Component;

      constructor() {
        super();
        this.skinName = 'TestItemSkin';
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
      }

      public onTap() {
        this.height = this.height === 400 ? 200 : 400;
      }

      public itemDataChanged() {
        this._label.text = `${this.itemData}`;
      }
    }
  }
}
