// TypeScript file
namespace we {
  export namespace ui {
    export class MobileSlideUpMenuPage extends core.BaseEUI {
      public title: string = '';
      public menu: MobileSlideUpMenu;

      constructor(skin: string = null) {
        super(skin, false);
      }

      protected mount() {
        super.mount();
      }

      public enterPage() {}

      public exitPage() {}
    }
  }
}
