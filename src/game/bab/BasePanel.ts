namespace we {
  export namespace bab {
    export class BasePanel extends ui.Panel {
      protected _gameData;

      protected mount() {
        super.mount();
        this.createBg();
      }

      protected createBg() {
        const rect = new eui.Rect();
        rect.width = this.width;
        rect.height = this.height;
        rect.fillColor = 0x222222;
        rect.alpha = 0.8;
        this.content && this.content.addChildAt(rect, 0);
      }

      public setValue(gameData: any) {}
    }
  }
}
