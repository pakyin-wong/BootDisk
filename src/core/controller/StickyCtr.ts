namespace we {
  export namespace core {
    export class StickyCtr {
      private _props = {};

      constructor() {}

      public register(item: ui.IStickyComponent) {
        // item.$parent && item.$parent.removeChild(item);
        const onTouchMove = () => {};

        item.$addListener(egret.TouchEvent.TOUCH_MOVE, onTouchMove, item);
      }

      public drop(item: ui.IStickyComponent) {}
    }
  }
}
