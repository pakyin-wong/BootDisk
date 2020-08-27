/*tslint:disable prefer-for-of */
namespace we {
  export namespace utils {
    export function varToString(varObj) {
      return Object.keys(varObj)[0];
    }
    export function stringToNumberArray(value: string): number[] {
      const strArray = stringToStringArray(value);
      const numArray = new Array<number>();
      if (!strArray || strArray.length === 0) {
        return [];
      }
      for (let i = 0; i < strArray.length; i++) {
        numArray.push(+strArray[i].trim());
      }
      return numArray;
    }

    export function stringToStringArray(value: string): string[] {
      if (!value || value.length === 0 || value.length <= 2) {
        return [];
      }
      const trimmedStr = value.substring(1, value.length - 1);
      const strArray = trimmedStr.split(',');
      return strArray;
    }

    export function arrayToKeyValue(array: any[], keyField: string, valueField: string = null) {
      const kvpair = {};
      for (const obj of array) {
        kvpair[obj[keyField]] = valueField ? obj[valueField] : obj;
      }
      return kvpair;
    }

    export function mergeObjects(...arg): any {
      const resObj = arg[0];
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

    export function getClass(obj) {
      return obj.__proto__.constructor.name;
    }

    export function clone(obj) {
      const result = JSON.parse(JSON.stringify(obj));
      return result;
    }

    export function disableTouchforChildren(root: egret.DisplayObjectContainer, checker: (obj: egret.DisplayObject) => boolean) {
      for (const child of root.$children) {
        if (child.$children) {
          disableTouchforChildren(child as egret.DisplayObjectContainer, checker);
        } else if (checker(child)) {
          child.touchEnabled = false;
        }
      }
    }
  }
}
