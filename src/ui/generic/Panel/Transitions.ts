namespace we {
  export namespace ui {
    export interface ITransitable {
      content: egret.DisplayObject;
    }
    export namespace Transition {
      export async function defaultIn(target: egret.DisplayObject, duration: number = 300) {
        await new Promise((resolve, reject) => {
          target.alpha = 0;
          egret.Tween.get(target)
            .to({ $alpha: 1 }, duration)
            .call(resolve);
        });
      }
      export async function defaultOut(target: egret.DisplayObject, duration: number = 300) {
        await new Promise((resolve, reject) => {
          target.alpha = 1;
          egret.Tween.get(target)
            .to({ $alpha: 0 }, duration)
            .call(resolve);
        });
      }

      export async function MoveInFromLeft(target: egret.DisplayObject, isFade: boolean = false, duration: number = 300) {
        await new Promise((resolve, reject) => {
          const destinationX: number = target.x;
          target.x = target.x - target.width - 20;
          if (isFade) {
            target.alpha = 0;
          }
          egret.Tween.get(target)
            .to({ $x: destinationX, $alpha: 1 }, duration)
            .call(resolve);
        });
      }

      export async function MoveInFromRight(target: egret.DisplayObject, isFade: boolean = false, duration: number = 300) {
        await new Promise((resolve, reject) => {
          const destinationX: number = target.x;
          target.x = target.x + target.width + 20;
          if (isFade) {
            target.alpha = 0;
          }
          egret.Tween.get(target)
            .to({ $x: destinationX, $alpha: 1 }, duration)
            .call(resolve);
        });
      }

      export async function MoveOutToLeft(target: egret.DisplayObject, isFade: boolean = false, duration: number = 300) {
        await new Promise((resolve, reject) => {
          const destinationX: number = -target.width - 20;
          const destinationAlpha = isFade ? 0 : 1;
          egret.Tween.get(target)
            .to({ $x: destinationX, $alpha: destinationAlpha }, duration)
            .call(resolve);
        });
      }

      export async function MoveOutToRight(target: egret.DisplayObject, isFade: boolean = false, duration: number = 300) {
        await new Promise((resolve, reject) => {
          const destinationX = target.width + 20;
          const destinationAlpha = isFade ? 0 : 1;
          egret.Tween.get(target)
            .to({ $x: destinationX, $alpha: destinationAlpha }, duration)
            .call(resolve);
        });
      }
    }
  }
}
