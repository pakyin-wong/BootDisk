// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalBettingRandomPanel extends core.BaseEUI {
      public _btnRandomOne: ui.RoundRectButton;
      public _btnRandomFive: ui.RoundRectButton;
      public _btnAllClear: ui.RoundRectButton;

      constructor() {
        super();
        this.initSkin();
      }

      protected initSkin() {
        this.skinName = 'skin_desktop.lo.SSCTraditionalBettingRandomPanel';
      }

      public init() {}
    }
  }
}
