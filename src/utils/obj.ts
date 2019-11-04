/*tslint:disable prefer-for-of */
namespace we {
  export namespace utils {
    export function varToString(varObj) {
      return Object.keys(varObj)[0];
    }

    export function arrayToKeyValue(array: any[], keyField: string, valueField: string = null) {
      const kvpair = {};
      for (const obj of array) {
        kvpair[obj[keyField]] = valueField ? obj[valueField] : obj;
      }
      return kvpair;
    }

    export function mergeObjects(...arg): any {
      const resObj = {};
      for (let i = 0; i < arg.length; i += 1) {
        const obj = arg[i];
        const keys = Object.keys(obj);
        for (let j = 0; j < keys.length; j += 1) {
          resObj[keys[j]] = obj[keys[j]];
        }
      }
      return resObj;
    }
  }
}
