namespace evt {
  export function wait(
    target: egret.EventDispatcher,
    successEv: string,
    failEv: string = null
  ) {
    return new Promise((resolve, reject) => {
      function rmv() {
        if (successEv) {
          target.removeEventListener(successEv, s, target);
        }
        if (failEv) {
          target.removeEventListener(failEv, f, target);
        }
      }

      function s(...args: any[]) {
        rmv();
        resolve(args);
      }

      function f(...args: any[]) {
        rmv();
        reject(args);
      }

      if (successEv) {
        target.addEventListener(successEv, s, target);
      }
      if (failEv) {
        target.addEventListener(failEv, f, target);
      }
    });
  }
}
