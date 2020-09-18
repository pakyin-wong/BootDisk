namespace we {
  export namespace utils {
    export const sleep = m => new Promise(r => setTimeout(r, m));

    export const debounce = (callback, time, _this) => {
      let timeout;
      return function () {
        let args = arguments;
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
          timeout = null;
          callback.apply(_this, args);
        }, time);
      };
    };
  }
}
