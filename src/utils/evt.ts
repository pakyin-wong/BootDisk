namespace we {
  export namespace utils {
    export function wait(target: egret.EventDispatcher, ev: string) {
      return new Promise((resolve, reject) => {
        target.once(ev, resolve, target);
      });
    }
    export function addButtonListener(i: egret.DisplayObject, callback) {
        i.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, this);
        mouse.setButtonMode(i, true);
      }
  }
}
