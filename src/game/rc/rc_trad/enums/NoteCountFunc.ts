// TypeScript file
namespace we {
  export namespace rc {
    export namespace NoteCountFunc {
      export function NormalCount(data, combinations = []): number[] {
        let notes = 0;
        const noteData = data[0].split('|');
        notes = 1;
        if (combinations.length === 0) {
          return [noteData.length];
        }
      }
      export function FixPos(data, combinations = []): number[] {
        const count = [];
        if (data[0].length > 0) {
          count.push(data[0].split('|').length);
        }
        if (data[1].length > 0) {
          count.push(data[1].split('|').length);
        }
        if (data[2].length > 0) {
          count.push(data[2].split('|').length);
        }
        if (data[3].length > 0) {
          count.push(data[3].split('|').length);
        }
        if (data[4].length > 0) {
          count.push(data[4].split('|').length);
        }
        return count;
      }

      export function TextAreaCount(data, combinations = []): number[] {
        return [data[0].split(';').length];
      }

      export function Top2(data, combinations = []): number[] {
        const len1 = data[0].split('|').length;
        const len2 = data[1].split('|').length;
        let count = 0;
        for (let i = 0; i < data[0].split('|').length; i++) {
          if (containsAndCount(data[1].split('|'), data[0].split('|')[i]).contain) {
            count++;
          }
        }
        return [len1 * len2 - count];
      }

      export function Top3(data, combinations = []): number[] {
        const len1 = data[0].split('|').length;
        const len2 = data[1].split('|').length;
        const len3 = data[2].split('|').length;

        let doubleCount = 0;
        let tripleCount = 0;

        for (let i = 0; i < 10; i++) {
          const str = i.toString();

          const eachContain1 = containsAndCount(data[0].split('|'), str);
          const eachContain2 = containsAndCount(data[1].split('|'), str);
          const eachContain3 = containsAndCount(data[2].split('|'), str);

          if (eachContain1.contain && eachContain2.contain && eachContain3.contain) {
            tripleCount++;
          } else if (eachContain1.contain && eachContain2.contain) {
            doubleCount += len3;
          } else if (eachContain1.contain && eachContain3.contain) {
            doubleCount += len2;
          } else if (eachContain2.contain && eachContain3.contain) {
            doubleCount += len1;
          }
        }
        const notes = len1 * len2 * len3 - (len1 + len2 + len3 - 2) * tripleCount - doubleCount;
        return [notes];
      }
      // TODO Top4
      // TODO Top5

      function repeatCount(array1, array2): number {
        let count = 0;
        for (let i = 0; i < array1.length; i++) {
          for (let k = 0; k < array2.length; k++) {
            if (array1[i] === array2[k]) {
              count++;
            }
          }
        }
        return count;
      }

      function containsAndCount(s: string[], e: string) {
        let contain = false;
        let count = 0;
        for (let i = 0; i < s.length; i++) {
          count++;
          if (s[i] === e) {
            contain = true;
          }
        }
        return { contain, count };
      }
    }
  }
}
