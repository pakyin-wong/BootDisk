namespace utils {
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
}
