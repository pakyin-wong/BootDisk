namespace we {
  export namespace utils {
    export const sleep = m => new Promise(r => setTimeout(r, m));

    export const debounce = (callback, time, _this) => {
      let timeout;
      return function () {
        const args = arguments;
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
          timeout = null;
          callback.apply(_this, args);
        }, time);
      };
    };

    export const playAnimation = async (display: dragonBones.EgretArmatureDisplay, animName: string, loopTime: number = 0, fadeInGroup: string = 'null') => {
      if (display && display.animation) {
        let p1;
        if (loopTime > 0) {
          p1 = we.utils.waitDragonBone(display, animName);
        }
        if (fadeInGroup) {
          display.animation.fadeIn(animName, 0, loopTime, 0, fadeInGroup);
        } else {
          display.animation.play(animName);
        }
        if (loopTime > 0) {
          await p1;
        }
      }
      return new Promise(resolve => resolve());
    };

    let tickerTimeoutId = -1;
    export const startTicker = function(ticker) {
      const requestAnimationFrame = function (callback) {
          tickerTimeoutId = window.setTimeout(callback, 1000 / 10);
      };
      requestAnimationFrame(onTick);
      function onTick() {
          requestAnimationFrame(onTick);
          ticker.update();
      }
    }

    export const stopTicker = function() {
      if (tickerTimeoutId>-1) {
        window.clearTimeout(tickerTimeoutId);
      }
    }

    export const addChild = function(container: egret.DisplayObjectContainer, child: egret.DisplayObject): void {
      if (child.$parent != container) {
        if (child.$parent)
            removeFromParent(child);
        container.$children.push(child);
        child.$parent = container;
      }
    }

        /**
         * addChildAt 的高效实现，慎用
         * @param container
         * @param child
         * @param index
         */
        export const addChildAt = function(container: egret.DisplayObjectContainer, child: egret.DisplayObject, index: number): void {
            if (child.$parent != container) {
                if (child.$parent)
                    this.removeFromParent(child);
                container.$children.splice(index, 0, child);
                child.$parent = container;
            }
        }

        /**
         * removeFromParent 的高效实现，慎用
         * @param child
         */
        export const removeFromParent = function(child: egret.DisplayObject): void {
            if (child && child.$parent) {
                var index = child.$parent.$children.indexOf(child);
                child.$parent.$children.splice(index, 1);
                child.$parent = null;
            }
        }

        /**
         * removeChildAt 的高效实现，慎用
         * @param container
         * @param index
         */
        export const removeChildAt = function(container: egret.DisplayObjectContainer, index: number): void {
            var child: egret.DisplayObject = container.$children[index];
            if (child) {
                container.$children.splice(index, 1);
                child.$parent = null;
                child.visible = false;
            }
        }

        /**
         * removeAllChild 的高效实现，慎用
         * @param container
         */
        export const removeAllChild = function(container: egret.DisplayObjectContainer): void {
            while (container.$children.length) {
                removeChildAt(container, 0);
            }
        }

  }
}
