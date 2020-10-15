namespace we {
  export namespace bab {
    export class BasePanel extends ui.Panel {
      protected _gameData;
      protected _closeButton;

      protected mount() {
        super.mount();
        this.createBg();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.hide(), this);
      }

      protected createBg() {
        const image = new eui.Image();
        image.width = this.width;
        image.height = this.height;
        image.source = 'd_bcba_panel_bg_png';
        image.scale9Grid = new egret.Rectangle(169, 118, 2, 802);
        this.content && this.content.addChildAt(image, 0);
      }
    }
  }
}
