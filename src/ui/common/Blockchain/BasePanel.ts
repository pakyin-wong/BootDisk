namespace we {
  export namespace blockchain {
    export class BasePanel extends ui.Panel {
      protected _gameData;
      protected _closeButton;
      protected _panelBgSource = 'd_bcba_panel_bg_png';

      protected mount() {
        super.mount();
        this.createBg();
      }

      protected createBg() {
        const image = new eui.Image();
        image.width = this.width;
        image.height = this.height;
        image.source = this._panelBgSource;
        image.scale9Grid = new egret.Rectangle(169, 118, 2, 802);
        this.content && this.content.addChildAt(image, 0);
      }
    }
  }
}
