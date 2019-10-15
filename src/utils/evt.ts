namespace evt {
  export function wait(target: egret.EventDispatcher, ev: string) {
    return new Promise((resolve, reject) => {
      function s(...args: any[]) {
        resolve(args);
      }
      target.once(ev, s, target);
    });
  }
}
