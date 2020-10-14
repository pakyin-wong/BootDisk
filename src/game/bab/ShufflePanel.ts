namespace we {
  export namespace bab {
    export class ShufflePanel extends BasePanel {
      protected createBg() {
        const rect = new eui.Rect();
        rect.width = this.width;
        rect.height = this.height;
        rect.fillColor = 0x000000;
        rect.alpha = 0.8;
        this.content.addChildAt(rect, 0);
      }

      public anim(gameData: any) {}

      public stat(gameData: any) {}
    }
  }
}
