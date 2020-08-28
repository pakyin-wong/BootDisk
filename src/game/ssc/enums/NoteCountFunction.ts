// TypeScript file
namespace we {
  export namespace lo {
    export namespace NoteCountFunc {
      export function DirectionalSelection(data, combinations = []): number[] {
        let notes = 0;

        if (combinations.length === 0) {
          notes = 1;
          for (let i = 0; i < data.length; i++) {
            notes *= data[i].length;
          }

          return [notes];
        }
        const notesArray = [];
        for (let i = 0; i < combinations.length; i++) {
          let currentNote = 1;
          const combinationIds = combinations[i].split('_');
          for (let k = 0; k < combinationIds.length; k++) {
            const index = parseInt(combinationIds[k], 10) - 1;

            currentNote *= data[index].length;
          }
          notesArray.push(currentNote);
        }

        return notesArray;
      }

      export function SeparatorNoteCount(data, combinations = []): number[] {
        let combinationsCount;

        if (combinations.length === 0) {
          combinationsCount = 1;
        } else {
          combinationsCount = combinations.length;
        }
        const datas = data[0].split('|');

        const notes = [];

        for (let i = 0; i < combinationsCount; i++) {
          notes.push(datas.length); // ?
        }

        return notes;
      }

      export function DragonTigerNoteCount(data, combinations = []): number[] {
        const datas = data[0].split('|');

        const notes = [];

        for (let i = 0; i < datas.length; i++) {
          notes.push(1); // ?
        }

        return notes;
      }

      export function DirectionalCombination(data, combinations = []): number[] {
        let combinationsCount;

        if (combinations.length === 0) {
          combinationsCount = 1;
        } else {
          combinationsCount = combinations.length;
        }

        let notes = 1;
        for (let i = 0; i < data.length; i++) {
          notes *= data[i].length;
        }

        const notesArray = [];

        for (let i = 0; i < combinationsCount; i++) {
          notesArray.push(notes * data.length); // ?
        }
        return notesArray; // ??
      }

      export namespace FiveStar {
        export function Group120(data, combinations = []): number[] {
          // Y为选号数量:注数=Y(Y-1)(Y-2)(Y-3)(Y-4)/120

          const y = data[0].length;

          return [(y * (y - 1) * (y - 2) * (y - 3) * (y - 4)) / 120];
        }

        export function Group60(data, combinations = []): number[] {
          // N为二重号个数,Y为单号个数;[Y(Y-1)(Y-2)/6]*(N-重)+[(Y-1)(Y-2)(Y-3)/6]*重
          const double = data[0].split('');
          const single = data[1].split('');

          const doubleCount = double.length;
          const singleCount = single.length;

          const repeatN = repeatCount(double, single);

          return [((singleCount * (singleCount - 1) * (singleCount - 2)) / 6) * (doubleCount - repeatN) + (((singleCount - 1) * (singleCount - 2) * (singleCount - 3)) / 6) * repeatN];
        }

        export function Group30(data, combinations = []): number[] {
          // N为二重号个数,Y为单号个数;[Y(Y-1)(Y-2)/6]*(N-重)+[(Y-1)(Y-2)(Y-3)/6]*重
          const double = data[0].split('');
          const single = data[1].split('');

          const doubleCount = double.length;
          const singleCount = single.length;

          const repeatN = repeatCount(double, single);

          return [sumUp(doubleCount - 1) * (singleCount - repeatN) + sumUp(doubleCount - 2) * repeatN];
        }

        export function Group20(data, combinations = []) {
          const triple = data[0].split('');
          const single = data[1].split('');

          const tripleCount = triple.length;
          const singleCount = single.length;

          const repeatN = repeatCount(triple, single);

          return [sumUp(singleCount - 1) * (tripleCount - repeatN) + sumUp(singleCount - 2) * repeatN];
        }

        export function Group10(data, combinations = []): number[] {
          const triple = data[0].split('');
          const double = data[1].split('');

          const tripleCount = triple.length;
          const doubleCount = double.length;

          const repeatN = repeatCount(triple, double);

          return [tripleCount * doubleCount - repeatN];
        }

        export function Group5(data, combinations = []): number[] {
          const quadruple = data[0].split('');
          const single = data[1].split('');

          const quadrupleCount = quadruple.length;
          const singleCount = single.length;

          const repeatN = repeatCount(quadruple, single);

          return [quadrupleCount * singleCount - repeatN];
        }
      }
      export namespace FourStar {
        export function Group24(data, combinations = []): number[] {
          // Y为选号数量:注数=Y(Y-1)(Y-2)(Y-3)/24=注数

          const y = data[0].length;

          const notesArray = [];

          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push((y * (y - 1) * (y - 2) * (y - 3)) / 24); // ?
            }
            return notesArray;
          } else {
            return [(y * (y - 1) * (y - 2) * (y - 3)) / 24];
          }
        }

        export function Group12(data, combinations = []): number[] {
          const double = data[0].split('');
          const single = data[1].split('');

          const doubleCount = double.length;
          const singleCount = single.length;

          const repeatN = repeatCount(double, single);

          const notesArray = [];

          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(sumUp(singleCount - 1) * (doubleCount - repeatN) + sumUp(singleCount - 2) * repeatN); // ?
            }
            return notesArray;
          } else {
            return [sumUp(singleCount - 1) * (doubleCount - repeatN) + sumUp(singleCount - 2) * repeatN];
          }
        }

        export function Group6(data, combinations = []): number[] {
          const double = data[0].split('');

          const doubleCount = double.length;

          const notesArray = [];

          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push((doubleCount * (doubleCount - 1)) / 2);
            }
            return notesArray;
          } else {
            return [(doubleCount * (doubleCount - 1)) / 2];
          }
        }

        export function Group4(data, combinations = []): number[] {
          const triple = data[0].split('');
          const single = data[1].split('');

          const tripleCount = triple.length;
          const singleCount = single.length;

          const repeatN = repeatCount(triple, single);

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(tripleCount * singleCount - repeatN);
            }
            return notesArray;
          } else {
            return [tripleCount * singleCount - repeatN];
          }
        }
      }

      export namespace ThreeStar {
        export function Group3(data, combinations = []): number[] {
          const datas = data[0].split('');

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(datas.length * (datas.length - 1));
            }
            return notesArray;
          } else {
            return [datas.length * (datas.length - 1)];
          }
        }

        export function Group6(data, combinations = []): number[] {
          const datas = data[0].split('');

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push((datas.length * (datas.length - 1) * (datas.length - 2)) / 6);
            }
            return notesArray;
          } else {
            return [(datas.length * (datas.length - 1) * (datas.length - 2)) / 6];
          }
        }

        export function Group3Tow(data, combinations = []): number {
          // check
          const bravery = data[0].split();
          const tow = data[1].split();

          const braveryCount = bravery.length();
          const towCount = tow.length();

          const repeatN = repeatCount(braveryCount, towCount);

          return braveryCount * towCount - repeatN;
        }

        export function Group6Tow(data, combinations = []): number {
          // check

          const bravery = data[0].split();
          const tow = data[1].split();

          const braveryCount = bravery.length();
          const towCount = tow.length();

          const repeatN = repeatCount(braveryCount, towCount);

          return sumUp(towCount - 1) * (braveryCount - repeatN) + sumUp(towCount - 2) * repeatN;
        }

        export function DirectionalSum(data, combinations = []): number[] {
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

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(notes);
            }
            return notesArray;
          } else {
            return [notes];
          }
        }

        export function GroupSum(data, combinations = []): number[] {
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
              case '1':
              case '26':
                note = 1;
                break;
              case '2':
              case '3':
              case '24':
              case '25':
                note = 2;
                break;
              case '4':
              case '23':
                note = 4;
                break;
              case '5':
              case '22':
                note = 5;
                break;
              case '6':
              case '21':
                note = 6;
                break;
              case '7':
              case '20':
                note = 8;
                break;
              case '8':
              case '19':
                note = 10;
                break;
              case '9':
              case '18':
                note = 11;
                break;
              case '10':
              case '17':
                note = 13;
                break;
              case '11':
              case '12':
              case '15':
              case '16':
                note = 14;
                break;
              case '13':
              case '14':
                note = 15;
                break;
            }
            notes += note;
          }

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(notes);
            }
            return notesArray;
          } else {
            return [notes];
          }
        }
      }

      export namespace TwoStar {
        export function DirectionalSum(data, combinations = []): number[] {
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

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(notes);
            }
            return notesArray;
          } else {
            return [notes];
          }
        }

        export function GroupDirectionalSelection(data, combinations = []): number[] {
          const dataCount = data[0].length;
          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push((dataCount * (dataCount - 1)) / 2);
            }
            return notesArray;
          } else {
            return [(dataCount * (dataCount - 1)) / 2];
          }
        }

        export function GroupSum(data, combinations = []): number[] {
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
              case '1':
              case '2':
              case '16':
              case '17':
                note = 1;
                break;
              case '3':
              case '4':
              case '14':
              case '15':
                note = 2;
                break;
              case '5':
              case '6':
              case '12':
              case '13':
                note = 3;
                break;
              case '7':
              case '8':
              case '10':
              case '11':
                note = 4;
                break;
              case '9':
                note = 5;
                break;
            }
            notes += note;
          }

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(notes);
            }
            return notesArray;
          } else {
            return [notes];
          }
        }
      }

      export namespace Any {
        export function TwoPos(data, combinations = []): number[] {
          const dataCount = data[0].length;

          return [(dataCount * (dataCount - 1)) / 2];
        }

        export function ThreePos(data, combinations = []): number[] {
          const dataCount = data[0].length;

          return [(dataCount * (dataCount - 1) * (dataCount - 2)) / 2];
        }

        export function AnyThreeGroup3(data, combinations = []): number[] {
          const datas = data[1].split('');

          if (combinations.length > 0) {
            const notes = [];
            for (let i = 0; i < combinations.length; i++) {
              notes.push(datas.length * (datas.length - 1));
            }
            return notes;
          } else {
            return [datas.length * (datas.length - 1)];
          }
        }

        export function AnyThreeGroup6(data, combinations = []): number[] {
          const datas = data[1].split('');
          if (combinations.length > 0) {
            const notes = [];
            for (let i = 0; i < combinations.length; i++) {
              notes.push((datas.length * (datas.length - 1) * (datas.length - 2)) / 6);
            }
            return notes;
          } else {
            return [(datas.length * (datas.length - 1) * (datas.length - 2)) / 6];
          }
        }

        export function AnyTwoDirectionalSum(data, combinations = []): number[] {
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

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(notes);
            }
            return notesArray;
          } else {
            return [notes];
          }
        }

        export function AnyThreeDirectionalSum(data, combinations = []): number[] {
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

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(notes);
            }
            return notesArray;
          } else {
            return [notes];
          }
        }

        export function SeparatorNoteCount(data, combinations = []): number[] {
          let combinationsCount;

          if (combinations.length === 0) {
            combinationsCount = 1;
          } else {
            combinationsCount = combinations.length;
          }

          const datas = data[1].split('|');

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(datas.length);
            }
            return notesArray;
          } else {
            return [datas.length];
          }
        }

        export function AnyGroupDirectionalSelection(data, combinations = []): number[] {
          const dataCount = data[1].length;
          const notesArray = [];

          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push((dataCount * (dataCount - 1)) / 2);
            }
            return notesArray;
          } else {
            return [(dataCount * (dataCount - 1)) / 2];
          }
        }

        export function AnyTwoGroupSum(data, combinations = []): number[] {
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
              case '1':
              case '2':
              case '16':
              case '17':
                note = 1;
                break;
              case '3':
              case '4':
              case '14':
              case '15':
                note = 2;
                break;
              case '5':
              case '6':
              case '12':
              case '13':
                note = 3;
                break;
              case '7':
              case '8':
              case '10':
              case '11':
                note = 4;
                break;
              case '9':
                note = 5;
                break;
            }
            notes += note;
          }

          const notesArray = [];

          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(notes);
            }
            return notesArray;
          } else {
            return [notes];
          }
        }

        export function AnyThreeGroupSum(data, combinations = []): number[] {
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
              case '1':
              case '26':
                note = 1;
                break;
              case '2':
              case '3':
              case '24':
              case '25':
                note = 2;
                break;
              case '4':
              case '23':
                note = 4;
                break;
              case '5':
              case '22':
                note = 5;
                break;
              case '6':
              case '21':
                note = 6;
                break;
              case '7':
              case '20':
                note = 8;
                break;
              case '8':
              case '19':
                note = 10;
                break;
              case '9':
              case '18':
                note = 11;
                break;
              case '10':
              case '17':
                note = 13;
                break;
              case '11':
              case '12':
              case '15':
              case '16':
                note = 14;
                break;
              case '13':
              case '14':
                note = 15;
                break;
            }
            notes += note;
          }
          const notesArray = [];

          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(notes);
            }
            return notesArray;
          } else {
            return [notes];
          }
        }
      }

      export namespace AnyFour {
        export function Group24(data, combinations = []): number[] {
          // Y为选号数量:注数=Y(Y-1)(Y-2)(Y-3)/24=注数

          const y = data[1].length;

          const notesArray = [];

          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push((y * (y - 1) * (y - 2) * (y - 3)) / 24); // ?
            }
            return notesArray;
          } else {
            return [(y * (y - 1) * (y - 2) * (y - 3)) / 24];
          }
        }

        export function Group12(data, combinations = []): number[] {
          const double = data[1].split('');
          const single = data[2].split('');

          const doubleCount = double.length;
          const singleCount = single.length;

          const repeatN = repeatCount(double, single);

          const notesArray = [];

          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(sumUp(singleCount - 1) * (doubleCount - repeatN) + sumUp(singleCount - 2) * repeatN); // ?
            }
            return notesArray;
          } else {
            return [sumUp(singleCount - 1) * (doubleCount - repeatN) + sumUp(singleCount - 2) * repeatN];
          }
        }

        export function Group6(data, combinations = []): number[] {
          const double = data[1].split('');

          const doubleCount = double.length;

          const notesArray = [];

          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push((doubleCount * (doubleCount - 1)) / 2);
            }
            return notesArray;
          } else {
            return [(doubleCount * (doubleCount - 1)) / 2];
          }
        }

        export function Group4(data, combinations = []): number[] {
          const triple = data[1].split('');
          const single = data[2].split('');

          const tripleCount = triple.length;
          const singleCount = single.length;

          const repeatN = repeatCount(triple, single);

          const notesArray = [];
          if (combinations.length > 0) {
            for (let i = 0; i < combinations.length; i++) {
              notesArray.push(tripleCount * singleCount - repeatN);
            }
            return notesArray;
          } else {
            return [tripleCount * singleCount - repeatN];
          }
        }
      }

      export namespace SizeParity {
        export function TwoPosDirectionalSelection(data, combination = null): number[] {
          const firstDataCount = data[0].split('|').length;
          const secondDataCount = data[1].split('|').length;

          return [firstDataCount * secondDataCount];
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

    export namespace DataMapping {
      export function DragonTigerMapping(data, pattern): string[] {
        const dataSplit = data[0].split('|');
        const newInputData = [];
        let newData = '';

        const re = /\$/gi;

        for (let i = 0; i < dataSplit.length; i++) {
          if (pattern.search(re) > -1) {
            newData = pattern.replace('$1', dataSplit[i]);
            newInputData.push(newData);
          }
        }

        for (let i = 0; i < newInputData.length; i++) {
          if (newInputData[i].search(/[\$\%\^\&]|\b(\w*undefined\w*)\b/gi) > -1) {
            return [''];
          }
        }

        if (newInputData.length > 0) {
          return newInputData;
        } else {
          return [''];
        }
      }
    }
  }
}
