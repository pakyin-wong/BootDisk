namespace evt {
  export function wait(target: egret.EventDispatcher, ev: string) {
    return new Promise((resolve, reject) => {
      target.once(ev, resolve, target);
    });
  }
}
