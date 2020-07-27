// TypeScript file
namespace we {
  export namespace lo {
    export namespace NoteCountFunc {
      export function StringNoteCount(data, combinations) {
        // for directionalSelection type
        let noteMultiplier;

        if (combinations === null) {
          noteMultiplier = 1;
        } else {
          noteMultiplier = combinations.length;
        }

        let notes = 1;
        for (let i = 0; i < data.length; i++) {
          notes *= data[i].length;
        }

        return notes * noteMultiplier;
      }

      export function SeparatorNoteCount(data, combinations) {
        let noteMultiplier;

        if (combinations === null) {
          noteMultiplier = 1;
        } else {
          noteMultiplier = combinations.length;
        }
        const datas = data.split('|');
        return datas.length;
      }

      export function DirectionalGroup(data, combinations) {
        let noteMultiplier;

        if (combinations === null) {
          noteMultiplier = 1;
        } else {
          noteMultiplier = combinations.length;
        }

        let notes = 1;
        for (let i = 0; i < data.length; i++) {
          notes *= data[i].length;
        }

        return notes * noteMultiplier * data.length;
      }

      export namespace FiveStar {
        export function FiveStarGroup120(data, combinations = null) {
          // Y为选号数量:注数=Y(Y-1)(Y-2)(Y-3)(Y-4)/120

          const y = data[0].length();

          return (y * (y - 1) * (y - 2) * (y - 3) * (y - 4)) / 120;
        }

        export function FiveStarGroup60(data, combinations = null) {
          // N为二重号个数,Y为单号个数;[Y(Y-1)(Y-2)/6]*(N-重)+[(Y-1)(Y-2)(Y-3)/6]*重
          const double = data[0].split('');
          const single = data[1].split('');

          const doubleCount = double.length;
          const singleCount = single.length;

          const repeatN = repeatCount(double, single);

          return ((singleCount * (singleCount - 1) * (singleCount - 2)) / 6) * (doubleCount - repeatN) + (((singleCount - 1) * (singleCount - 2) * (singleCount - 3)) / 6) * repeatN;
        }

        export function FiveStarGroup30(data, combinations = null) {
          // N为二重号个数,Y为单号个数;[Y(Y-1)(Y-2)/6]*(N-重)+[(Y-1)(Y-2)(Y-3)/6]*重
          const double = data[0].split('');
          const single = data[1].split('');

          const doubleCount = double.length;
          const singleCount = single.length;

          const repeatN = repeatCount(double, single);

          return sumUp(doubleCount - 1) * (singleCount - repeatN) + sumUp(doubleCount - 2) * repeatN;
        }

        export function FiveStarGroup20(data, combinations = null) {
          const triple = data[0].split('');
          const single = data[1].split('');

          const tripleCount = triple.length;
          const singleCount = single.length;

          const repeatN = repeatCount(triple, single);

          return sumUp(tripleCount - 1) * (singleCount - repeatN) + sumUp(tripleCount - 2) * repeatN;
        }

        export function FiveStarGroup10(data, combinations = null) {
          const triple = data[0].split('');
          const double = data[1].split('');

          const tripleCount = triple.length;
          const doubleCount = double.length;

          const repeatN = repeatCount(triple, double);

          return tripleCount * doubleCount - repeatN;
        }

        export function FiveStarGroup5(data, combinations = null) {
          const quadruple = data[0].split('');
          const single = data[1].split('');

          const quadrupleCount = quadruple.length;
          const singleCount = single.length;

          const repeatN = repeatCount(quadruple, single);

          return quadrupleCount * singleCount - repeatN;
        }
      }
      
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

      function sumUp(n: number): number {
        return (n * n + n) / 2;
      }
    }
  }
}
