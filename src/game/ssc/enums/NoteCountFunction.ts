// TypeScript file
namespace we {
  export namespace lo {
    export namespace NoteCountFunc {
      export function DirectionalSelection(data, combinations = null): number {
        let notes = 0;

        if (combinations.length === 0) {
          notes = 1;
          for (let i = 0; i < data.length; i++) {
            notes *= data[i].length;
          }

          return notes;
        }

        for (let i = 0; i < combinations.length; i++) {
          let currentNote = 1;
          const combinationIds = combinations[i].split('_');
          for (let k = 0; k < combinationIds.length; k++) {
            const index = parseInt(combinationIds[k], 10) - 1;

            currentNote *= data[index].length;
          }
          notes += currentNote;
        }

        return notes;
      }

      export function SeparatorNoteCount(data, combinations = null): number {
        let combinationsCount;

        if (combinations.length === 0) {
          combinationsCount = 1;
        } else {
          combinationsCount = combinations.length;
        }
        const datas = data[0].split('|');
        return datas.length * combinationsCount; // ?
      }

      export function DirectionalCombination(data, combinations = null): number {
        let noteMultiplier;

        if (combinations.length === 0) {
          noteMultiplier = 1;
        } else {
          noteMultiplier = combinations.length;
        }

        let notes = 1;
        for (let i = 0; i < data.length; i++) {
          notes *= data[i].length;
        }

        return notes * noteMultiplier * data.length; // ??
      }

      export function NormalCount(data, combination = null): number {
        return data[0].length;
      }

      export namespace FiveStar {
        export function Group120(data, combinations = null): number {
          // Y为选号数量:注数=Y(Y-1)(Y-2)(Y-3)(Y-4)/120

          const y = data[0].length;

          return (y * (y - 1) * (y - 2) * (y - 3) * (y - 4)) / 120;
        }

        export function Group60(data, combinations = null): number {
          // N为二重号个数,Y为单号个数;[Y(Y-1)(Y-2)/6]*(N-重)+[(Y-1)(Y-2)(Y-3)/6]*重
          const double = data[0].split('');
          const single = data[1].split('');

          const doubleCount = double.length;
          const singleCount = single.length;

          const repeatN = repeatCount(double, single);

          return ((singleCount * (singleCount - 1) * (singleCount - 2)) / 6) * (doubleCount - repeatN) + (((singleCount - 1) * (singleCount - 2) * (singleCount - 3)) / 6) * repeatN;
        }

        export function Group30(data, combinations = null): number {
          // N为二重号个数,Y为单号个数;[Y(Y-1)(Y-2)/6]*(N-重)+[(Y-1)(Y-2)(Y-3)/6]*重
          const double = data[0].split('');
          const single = data[1].split('');

          const doubleCount = double.length;
          const singleCount = single.length;

          const repeatN = repeatCount(double, single);

          return sumUp(doubleCount - 1) * (singleCount - repeatN) + sumUp(doubleCount - 2) * repeatN;
        }

        export function Group20(data, combinations = null) {
          const triple = data[0].split('');
          const single = data[1].split('');

          const tripleCount = triple.length;
          const singleCount = single.length;

          const repeatN = repeatCount(triple, single);

          return sumUp(singleCount - 1) * (tripleCount - repeatN) + sumUp(singleCount - 2) * repeatN;
        }

        export function Group10(data, combinations = null): number {
          const triple = data[0].split('');
          const double = data[1].split('');

          const tripleCount = triple.length;
          const doubleCount = double.length;

          const repeatN = repeatCount(triple, double);

          return tripleCount * doubleCount - repeatN;
        }

        export function Group5(data, combinations = null): number {
          const quadruple = data[0].split('');
          const single = data[1].split('');

          const quadrupleCount = quadruple.length;
          const singleCount = single.length;

          const repeatN = repeatCount(quadruple, single);

          return quadrupleCount * singleCount - repeatN;
        }
      }
      export namespace FourStar {
        export function Group24(data, combinations = null): number {
          // Y为选号数量:注数=Y(Y-1)(Y-2)(Y-3)/24=注数

          const y = data[0].length;
          if (combinations.length > 0) {
            return ((y * (y - 1) * (y - 2) * (y - 3)) / 24) * combinations.length;
          } else {
            return (y * (y - 1) * (y - 2) * (y - 3)) / 24;
          }
        }

        export function Group12(data, combinations = null): number {
          const double = data[0].split('');
          const single = data[1].split('');

          const doubleCount = double.length;
          const singleCount = single.length;

          const repeatN = repeatCount(double, single);

          if (combinations.length > 0) {
            return sumUp(singleCount - 1) * (doubleCount - repeatN) + sumUp(singleCount - 2) * repeatN * combinations.length;
          } else {
            return sumUp(singleCount - 1) * (doubleCount - repeatN) + sumUp(singleCount - 2) * repeatN;
          }
        }

        export function Group6(data, combinations = null): number {
          const double = data[0].split('');

          const doubleCount = double.length;

          if (combinations.length > 0) {
            return ((doubleCount * (doubleCount - 1)) / 2) * combinations.length;
          } else {
            return (doubleCount * (doubleCount - 1)) / 2;
          }
        }

        export function Group4(data, combinations = null): number {
          const triple = data[0].split('');
          const single = data[1].split('');

          const tripleCount = triple.length;
          const singleCount = single.length;

          const repeatN = repeatCount(triple, single);
          if (combinations.length > 0) {
            return tripleCount * singleCount - repeatN * combinations.length;
          } else {
            return tripleCount * singleCount - repeatN;
          }
        }
      }

      export namespace ThreeStar {
        export function Group3(data, combinations = null): number {
          const datas = data[0].split('');
          if (combinations.length > 0) {
            return datas.length * (datas.length - 1) * combinations.length;
          } else {
            return datas.length * (datas.length - 1);
          }
        }

        export function Group6(data, combinations = null): number {
          const datas = data[0].split('');
          if (combinations.length > 0) {
            return ((datas.length * (datas.length - 1) * (datas.length - 2)) / 6) * combinations.length;
          } else {
            return (datas.length * (datas.length - 1) * (datas.length - 2)) / 6;
          }
        }

        export function Group3Tow(data, combinations = null): number {
          // check
          const bravery = data[0].split();
          const tow = data[1].split();

          const braveryCount = bravery.length();
          const towCount = tow.length();

          const repeatN = repeatCount(braveryCount, towCount);

          return braveryCount * towCount - repeatN;
        }

        export function Group6Tow(data, combinations = null): number {
          // check

          const bravery = data[0].split();
          const tow = data[1].split();

          const braveryCount = bravery.length();
          const towCount = tow.length();

          const repeatN = repeatCount(braveryCount, towCount);

          return sumUp(towCount - 1) * (braveryCount - repeatN) + sumUp(towCount - 2) * repeatN;
        }

        export function DirectionalSum(data, combinations = null): number {
          const datas = data[0].split('|');

          let notes = 0;
          for (let i = 0; i < datas.length; i++) {
            let note = 0;
            switch (datas[i]) {
              case '0':
              case '27':
                note = 1;
                break;
              case '1':
              case '26':
                note = 3;
                break;
              case '2':
              case '25':
                note = 6;
                break;
              case '3':
              case '24':
                note = 10;
                break;
              case '4':
              case '23':
                note = 15;
                break;
              case '5':
              case '22':
                note = 21;
                break;
              case '6':
              case '21':
                note = 28;
                break;
              case '7':
              case '20':
                note = 36;
                break;
              case '8':
              case '19':
                note = 45;
                break;
              case '9':
              case '18':
                note = 55;
                break;
              case '10':
              case '17':
                note = 63;
                break;
              case '11':
              case '16':
                note = 69;
                break;
              case '12':
              case '15':
                note = 73;
                break;
              case '13':
              case '14':
                note = 75;
                break;
            }
            notes += note;
          }

          if (combinations.length > 0) {
            return notes * combinations.length;
          } else {
            return notes;
          }
        }
      }
      export namespace TwoStar {
        export function DirectionalSum(data, combinations = null): number {
          const datas = data[0].split('|');

          let combinationsCount;
          let notes = 0;

          if (combinations.length === 0) {
            combinationsCount = 1;
          } else {
            combinationsCount = combinations.length;
          }

          for (let i = 0; i < datas.length; i++) {
            let note = 0;
            switch (datas[i]) {
              case '0':
              case '18':
                note = 1;
                break;
              case '1':
              case '17':
                note = 2;
                break;
              case '2':
              case '16':
                note = 3;
                break;
              case '3':
              case '15':
                note = 4;
                break;
              case '4':
              case '14':
                note = 5;
                break;
              case '5':
              case '13':
                note = 6;
                break;
              case '6':
              case '12':
                note = 7;
                break;
              case '7':
              case '11':
                note = 8;
                break;
              case '8':
              case '10':
                note = 9;
                break;
              case '9':
                note = 10;
                break;
            }
            notes += note;
          }

          if (combinations.length > 0) {
            return notes * combinations.length;
          } else {
            return notes;
          }
        }

        export function GroupDirectionalSelection(data, combinations = null): number {
          const dataCount = data[0].length;
          if (combinations.length > 0) {
            return ((dataCount * (dataCount - 1)) / 2) * combinations.length;
          } else {
            return (dataCount * (dataCount - 1)) / 2;
          }
        }
      }

      export namespace Any {
        export function TwoPos(data, combinations = null): number {
          const dataCount = data[0].length;

          return (dataCount * (dataCount - 1)) / 2;
        }

        export function ThreePos(data, combinations = null): number {
          const dataCount = data[0].length;

          return (dataCount * (dataCount - 1) * (dataCount - 2)) / 2;
        }

        export function AnyThreeGroup3(data, combinations = null): number {
          const datas = data[1].split('');
          if (combinations.length > 0) {
            return datas.length * (datas.length - 1) * combinations.length;
          } else {
            return datas.length * (datas.length - 1);
          }
        }

        export function AnyThreeGroup6(data, combinations = null): number {
          const datas = data[1].split('');
          if (combinations.length > 0) {
            return ((datas.length * (datas.length - 1) * (datas.length - 2)) / 6) * combinations.length;
          } else {
            return (datas.length * (datas.length - 1) * (datas.length - 2)) / 6;
          }
        }

        export function AnyTwoSum(data, combinations = null): number {
          const datas = data[1].split('|');

          let combinationsCount;
          let notes = 0;

          if (combinations.length === 0) {
            combinationsCount = 1;
          } else {
            combinationsCount = combinations.length;
          }

          for (let i = 0; i < datas.length; i++) {
            let note = 0;
            switch (datas[i]) {
              case '0':
              case '18':
                note = 1;
                break;
              case '1':
              case '17':
                note = 2;
                break;
              case '2':
              case '16':
                note = 3;
                break;
              case '3':
              case '15':
                note = 4;
                break;
              case '4':
              case '14':
                note = 5;
                break;
              case '5':
              case '13':
                note = 6;
                break;
              case '6':
              case '12':
                note = 7;
                break;
              case '7':
              case '11':
                note = 8;
                break;
              case '8':
              case '10':
                note = 9;
                break;
              case '9':
                note = 10;
                break;
            }
            notes += note;
          }

          if (combinations.length > 0) {
            return notes * combinations.length;
          } else {
            return notes;
          }
        }

        export function AnyThreeSum(data, combinations = null): number {
          const datas = data[1].split('|');

          let notes = 0;
          for (let i = 0; i < datas.length; i++) {
            let note = 0;
            switch (datas[i]) {
              case '0':
              case '27':
                note = 1;
                break;
              case '1':
              case '26':
                note = 3;
                break;
              case '2':
              case '25':
                note = 6;
                break;
              case '3':
              case '24':
                note = 10;
                break;
              case '4':
              case '23':
                note = 15;
                break;
              case '5':
              case '22':
                note = 21;
                break;
              case '6':
              case '21':
                note = 28;
                break;
              case '7':
              case '20':
                note = 36;
                break;
              case '8':
              case '19':
                note = 45;
                break;
              case '9':
              case '18':
                note = 55;
                break;
              case '10':
              case '17':
                note = 63;
                break;
              case '11':
              case '16':
                note = 69;
                break;
              case '12':
              case '15':
                note = 73;
                break;
              case '13':
              case '14':
                note = 75;
                break;
            }
            notes += note;
          }

          if (combinations.length > 0) {
            return notes * combinations.length;
          } else {
            return notes;
          }
        }
        export function SeparatorNoteCount(data, combinations = null): number {
          let combinationsCount;

          if (combinations.length === 0) {
            combinationsCount = 1;
          } else {
            combinationsCount = combinations.length;
          }
          const datas = data[1].split('|');
          return datas.length * combinationsCount; // ?
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
