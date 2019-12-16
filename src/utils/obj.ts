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
          const value = obj[keys[j]];
          if (value != null) {
            resObj[keys[j]] = obj[keys[j]];
          }
        }
      }
      return resObj;
    }

    export function arrayDiff(array1, array2) {
      const result = [];
      let i = 0;
      array2 = [...array2];
      while (i < array1.length) {
        const t1 = array1[i++];
        const t2 = array2.indexOf(t1);
        if (t2 !== -1) {
          array2.splice(t2, 1);
        } else {
          result.push(t1);
        }
      }
      return result;
    }

    export function arrayMergeUnique(array1: any[], array2: any[]) {
      const a = array1.concat(array2);
      for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j]) {
            a.splice(j--, 1);
          }
        }
      }

      return a;
    }

    export function convertToBoolean(input: string): boolean {
      try {
        return JSON.parse(input);
      } catch (e) {
        return false;
      }
    }

    export function covertToBoolean(input: number): boolean {
      if (input === 0) {
        return false;
      }
      return true;
    }
  }
}
