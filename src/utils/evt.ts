namespace we {
  export namespace utils {
    export function wait(target: egret.EventDispatcher, ev: string) {
      return new Promise((resolve, reject) => {
        target.once(ev, resolve, target);
      });
    }
    export function waitDragonBone(target) {
      return we.utils.waitDragonBoneEvent(target, dragonBones.EventObject.COMPLETE);
    }
    export function waitDragonBoneEvent(target: dragonBones.IEventDispatcher, ev: string) {
      const p = new Promise((resolve, reject) => {
        const r = () => {
          target.removeDBEventListener(ev, r, target);
          resolve();
        };
        target.addDBEventListener(ev, r, target);
      });
      return p;
    }
    export function addButtonListener(i: egret.DisplayObject, callback, thisArg) {
      i.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, thisArg);
      mouse.setButtonMode(i, true);
    }
    export function removeButtonListener(i: egret.DisplayObject, callback, thisArg) {
      i.removeEventListener(egret.TouchEvent.TOUCH_TAP, callback, thisArg);
      mouse.setButtonMode(i, false);
    }
  }
}
