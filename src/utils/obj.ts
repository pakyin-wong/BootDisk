namespace utils {
  export function varToString(varObj) {
    return Object.keys(varObj)[0];
  }

  export function arrayToKeyValue(array: any[], keyField: string, valueField: string) {
    const kvpair = {};
    for (const obj of array) {
      kvpair[obj[keyField]] = obj[valueField];
    }
    return kvpair;
  }
}
