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
        console.log('custom tick');
          requestAnimationFrame(onTick);
          ticker.update();
      }
    }

    export const stopTicker = function() {
      if (tickerTimeoutId>-1) {
        window.clearTimeout(tickerTimeoutId);
      }
    }

  }
}
