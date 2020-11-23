// TypeScript file
namespace we {
  export namespace ui {
    export class MobileSlideUpMenuPage extends core.BaseEUI {
      public title: string = 'test';

      constructor(skin: string = null) {
        super(skin, false);
      }

      protected mount() {
        super.mount();
        const rect: eui.Rect = new eui.Rect();
        rect.fillColor = 0x780000;
        rect.left = 0;
        rect.right = 0;
        rect.height = 2000;
        this.addChild(rect);
        for (let i = 0; i < 1000; i++) {
          const label = new eui.Label();
          label.text = i.toString();
          label.y = 20 * i;
          this.addChild(label);
        }
      }

      public enterPage() {}

      public exitPage() {}
    }
  }
}
