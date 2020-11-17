namespace we {
  export namespace utils {
    export function wait(target: egret.EventDispatcher, ev: string) {
      return new Promise((resolve, reject) => {
        target.once(ev, resolve, target);
      });
    }
    function onDBSoundEvent(event: dragonBones.Event) {
      const evtName = event.eventObject.name;
      const type = evtName.split('_')[0];
      if (type === 'audio') {
        const audioResName = evtName.substr(6);
        dir.audioCtr.play(audioResName);
      }
    }

    export function dblistenToSoundEffect(target: dragonBones.IEventDispatcher) {
      target.addDBEventListener(dragonBones.Event.ANIMATION_FRAME_EVENT, onDBSoundEvent, null);
    }

    export function waitDragonBone(target, animName: string = null) {
      return we.utils.waitDragonBoneEvent(target, dragonBones.EventObject.COMPLETE, animName);
    }
    export function waitDragonBoneEvent(target: dragonBones.IEventDispatcher, ev: string, animName: string = null) {
      const p = new Promise((resolve, reject) => {
        const r = (event) => {
          if (!(animName && event.animationName != animName)) {
            target.removeDBEventListener(ev, r, target);
            resolve();
          }
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
