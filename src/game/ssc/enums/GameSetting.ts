// TypeScript file
namespace we {
  export namespace lo {
    export enum InputComponentType {
      BALLS,
      TEXTAREA,
      CHECKBOXES,
    }
    export enum InputDataType {
      STRING, // i.e. '123456789'
      SEPARATOR, // i.e. '1|2|3|4|5|6|7|8|9|10|11|12|14'
      ARRAY, // i.e. '['1','2','3','4','5','6','7','8','9']'
    }

    export enum InputComponentTheme {
      ROW = 0,
      ROW_WITH_OPTION = 1,
      ROWS = 2,
    }

    export namespace InputComponentDefinition {
      export function ballRange(title, theme, start, end, minSelect = 0, maxSelect = 100, dataType: InputDataType = InputDataType.STRING) {
        return {
          type: InputComponentType.BALLS,
          theme,
          title,
          data: Array.apply(null, { length: end - start + 1 }).map((data, idx) => start + idx),
          dataType,
          validate: (data: string | any[]) => {
            if (dataType === InputDataType.STRING) {
              return data.length >= minSelect && data.length <= maxSelect;
            }

            if (dataType === InputDataType.SEPARATOR) {
              const datas = (data as string).split('|');
              return datas.length >= minSelect && datas.length <= maxSelect;
            }
          }, // use to validate the output data of this component
        };
      }

      export function ballData(title, theme, data, minSelect = 0, dataType: InputDataType = InputDataType.STRING, maxSelect = 100) {
        return {
          type: InputComponentType.BALLS,
          theme,
          title,
          data,
          dataType,
          validate: (data: string | any[]) => data.length >= minSelect && data.length <= maxSelect,
        };
      }

      export function textArea(title, numberPerGroup, isUnique = false) {
        return {
          type: InputComponentType.TEXTAREA,
          numberPerGroup,
          title,
          isUnique, // to check if single data allow duplicated number
          validate: (data: string | any[]) => true,

          // data example (numberPerGroup=5): 12345|12346|14573|17764|09663|...
          // data example (numberPerGroup=2): 12|23|49|64|85|26|...
        };
      }

      // export function checkboxes(title, data, minSelect = 0) {
      export function checkboxes(title, minSelect = 0) {
        return {
          type: InputComponentType.CHECKBOXES,
          title,
          minSelect,
          validate: (data: string | any[]) => {
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                const strArray = data[i].split('_');
                if (strArray.length < minSelect) {
                  return false;
                }
              }
              return true;
            }
            return false;
          },
          // data example: ['1_2', '2_3', '1_3']
          // this data may use directly as the combination array
        };
      }
    }

    export namespace Validator {
      // check the number of different items inside two data
      export function countDifferent(data1, data2, minDifferentCount) {
        const a = [];
        const diff = [];
        for (let i = 0; i < data1.length; i++) {
          a[data1[i]] = true;
        }
        for (let i = 0; i < data2.length; i++) {
          if (a[data2[i]]) {
            delete a[data2[i]];
          } else {
            a[data2[i]] = true;
          }
        }
        for (const k in a) {
          diff.push(k);
        }
        return diff.length >= minDifferentCount;
      }
    }

    export const SmallTags = {
      LABELWIDTH_EN: 125,
      LABELWIDTH_CN: 80,
    };

    export const SelectionMapping = {
      FiveStar: {
        // bigTag
        name: 'FiveStar',
        seperateLine: [1], // small tag index for if there is a seprate line to seperate the next item
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Ten', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Unit', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '12345OPTIONAL_$1_$2_$3_$4_$5',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 180000,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.textArea('', 5), // 12|23|54|67|...
            ],
            pattern: '12345OPTIONALINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 180000,
          },
          DirectCombination: {
            name: 'DirectCombination',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Ten', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Unit', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '12345OPTIONALCOM_$1_$2_$3_$4_$5',
            noteCountFunc: NoteCountFunc.DirectionalCombination,
            maxWin: 180000,
          },
          Group120: {
            name: 'Group120',
            input: [InputComponentDefinition.ballRange('', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 5)],
            pattern: 'FIVE120_$1',
            noteCountFunc: NoteCountFunc.FiveStar.Group120,
            maxWin: 1500,
          },
          Group60: {
            name: 'Group60',
            input: [
              InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 3),
            ],
            pattern: 'FIVE60_$1_$2',
            noteCountFunc: NoteCountFunc.FiveStar.Group60,
            maxWin: 3000,
            validateData: (data: any[]) => {
              if (data[1].length === 3) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                return Validator.countDifferent(data[0], data[1], 2);
              }
              return true;
            },
          },
          Group30: {
            name: 'Group30',
            input: [
              InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: 'FIVE30_$1_$2',
            noteCountFunc: NoteCountFunc.FiveStar.Group30,
            maxWin: 6000,
            validateData: (data: any[]) => {
              if (data[0].length === 2) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                return Validator.countDifferent(data[0], data[1], 2);
              }
              return true;
            },
          },
          Group20: {
            name: 'Group20',
            input: [
              InputComponentDefinition.ballRange('Triple', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            pattern: 'FIVE20_$1_$2',
            noteCountFunc: NoteCountFunc.FiveStar.Group20,
            maxWin: 9000,
            validateData: (data: any[]) => {
              if (data[1].length === 2) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                return Validator.countDifferent(data[0], data[1], 2);
              }
              return true;
            },
          },
          Group10: {
            name: 'Group10',
            input: [
              InputComponentDefinition.ballRange('Triple', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: 'FIVE10_$1_$2',
            noteCountFunc: NoteCountFunc.FiveStar.Group10,
            maxWin: 18000,
            validateData: (data: any[]) => {
              if (data[0].length === 1 || data[1].length === 1) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                Validator.countDifferent(data[0], data[1], 1);
              }
              return true;
            },
          },
          Group5: {
            name: 'Group5',
            input: [
              InputComponentDefinition.ballRange('Quadruple', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: 'FIVE5_$1_$2',
            noteCountFunc: NoteCountFunc.FiveStar.Group5,
            maxWin: 36000,
            validateData: (data: any[]) => {
              if (data[0].length === 1 && data[1].length === 1) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                return Validator.countDifferent(data[0], data[1], 1);
              }
              return true;
            },
          },
        },
      },
      FourStar: {
        name: 'FourStar',
        seperateLine: [1], // small tag index for if there is a seprate line to seperate the next item
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Ten', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Unit', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '2345OPTIONAL_$1_$2_$3_$4',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 18000,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.textArea('', 4), // 12|23|54|67|...
            ],
            pattern: '2345OPTIONALINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 18000,
          },
          DirectCombination: {
            name: 'DirectCombination',
            input: [
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Ten', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Unit', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '2345OPTIONALCOM_$1_$2_$3_$4',
            noteCountFunc: NoteCountFunc.DirectionalCombination,
            maxWin: 18000,
          },
          Group24: {
            name: 'Group24',
            input: [InputComponentDefinition.ballRange('', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 4)],
            pattern: '2345FOUR24_$1',
            noteCountFunc: NoteCountFunc.FourStar.Group24,
            maxWin: 750,
          },
          Group12: {
            name: 'Group12',
            input: [
              InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            pattern: '2345FOUR12_$1_$2',
            noteCountFunc: NoteCountFunc.FourStar.Group12,
            maxWin: 1500,
            validateData: (data: any[]) => {
              if (data[1].length === 2) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                return Validator.countDifferent(data[0], data[1], 2);
              }
              return true;
            },
          },
          Group6: {
            name: 'Group6',
            input: [InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '2345FOUR6_$1',
            noteCountFunc: NoteCountFunc.FourStar.Group6,
            maxWin: 3000,
          },
          Group4: {
            name: 'Group4',
            input: [
              InputComponentDefinition.ballRange('Triple', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '2345FOUR4_$1_$2',
            noteCountFunc: NoteCountFunc.FourStar.Group4,
            maxWin: 4500,
            validateData: (data: any[]) => {
              if (data[0].length === 1 && data[1].length === 1) {
                return Validator.countDifferent(data[0], data[1], 1);
              }
              return true;
            },
          },
        },
      },
      FirstThree: {
        name: 'FirstThree',
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '123OPTIONAL_$1_$2_$3',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 1800,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.textArea('', 3), // 12|23|54|67|...
            ],
            pattern: '123OPTIONALINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 1800,
          },
          DirectionSum: {
            name: 'DirectionSum',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 0, 27, 1, 28, InputDataType.SEPARATOR)],
            pattern: '123SUMOPTIONAL_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.DirectionalSum,
            maxWin: 1800,
          },
          Three3: {
            name: 'Three3',
            input: [InputComponentDefinition.ballRange('Three3', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '123THREE3_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.Group3,
            maxWin: 600,
          },
          Three6: {
            name: 'Three6',
            input: [InputComponentDefinition.ballRange('Three6', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 3)],
            pattern: '123THREE6_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.Group6,
            maxWin: 300,
          },
          // Three3Tow: {
          //   name: 'Three3Tow',
          //   input: [
          //     InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
          //     InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
          //   ],
          //   pattern: '123THREEBRAVERYTOW3_$1_$2',
          //   noteCountFunc: NoteCountFunc.ThreeStar.Group3Tow,
          //   maxWin: 600,
          // },
          // Three6Tow: {
          //   name: 'Three6Tow',
          //   input: [
          //     InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
          //     InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
          //   ],
          //   pattern: '123THREEBRAVERYTOW3_$1_$2',
          //   noteCountFunc: NoteCountFunc.ThreeStar.Group6Tow,
          //   maxWin: 300,
          // },
          GroupCombine: {
            name: 'GroupCombine',
            input: [
              InputComponentDefinition.textArea('', 3, true), // 12|23|54|67|...
            ],
            pattern: '123THREECOMBINE_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 600,
          },
          GroupSum: {
            name: 'GroupSum',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 1, 26, 1, 26, InputDataType.SEPARATOR)],
            pattern: '123SUMGROUP_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.GroupSum,
            maxWin: 600,
          },
        },
      },
      MidThree: {
        name: 'MidThree',
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '234OPTIONAL_$1_$2_$3',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 1800,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.textArea('', 3), // 12|23|54|67|...
            ],
            pattern: '234OPTIONALINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 1800,
          },
          DirectionSum: {
            name: 'DirectionSum',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 0, 27, 1, 28, InputDataType.SEPARATOR)],
            pattern: '234SUMOPTIONAL_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.DirectionalSum,
            maxWin: 1800,
          },
          Three3: {
            name: 'Three3',
            input: [InputComponentDefinition.ballRange('Three3', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '234THREE3_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.Group3,
            maxWin: 600,
          },
          Three6: {
            name: 'Three6',
            input: [InputComponentDefinition.ballRange('Three6', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 3)],
            pattern: '234THREE6_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.Group6,
            maxWin: 300,
          },
          // Three3Tow: {
          //   name: 'Three3Tow',
          //   input: [
          //     InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
          //     InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
          //   ],
          //   pattern: '234THREEBRAVERYTOW3_$1_$2',
          //   noteCountFunc: NoteCountFunc.ThreeStar.Group3Tow,
          //   maxWin: 600,
          // },
          // Three6Tow: {
          //   name: 'Three6Tow',
          //   input: [
          //     InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
          //     InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
          //   ],
          //   pattern: '234THREEBRAVERYTOW3_$1_$2',
          //   noteCountFunc: NoteCountFunc.ThreeStar.Group6Tow,
          //   maxWin: 300,
          // },
          GroupCombine: {
            name: 'GroupCombine',
            input: [
              InputComponentDefinition.textArea('', 3, true), // 12|23|54|67|...
            ],
            pattern: '234THREECOMBINE_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 600,
          },
          GroupSum: {
            name: 'GroupSum',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 1, 26, 1, 26, InputDataType.SEPARATOR)],
            pattern: '234SUMGROUP_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.GroupSum,
            maxWin: 600,
          },
        },
      },
      LastThree: {
        name: 'LastThree',
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '345OPTIONAL_$1_$2_$3',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 1800,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.textArea('', 3), // 12|23|54|67|...
            ],
            pattern: '345OPTIONALINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 1800,
          },
          DirectionSum: {
            name: 'DirectionSum',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 0, 27, 1, 28, InputDataType.SEPARATOR)],
            pattern: '345SUMOPTIONAL_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.DirectionalSum,
            maxWin: 1800,
          },
          Three3: {
            name: 'Three3',
            input: [InputComponentDefinition.ballRange('Three3', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '345THREE3_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.Group3,
            maxWin: 600,
          },
          Three6: {
            name: 'Three6',
            input: [InputComponentDefinition.ballRange('Three6', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 3)],
            pattern: '345THREE6_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.Group6,
            maxWin: 300,
          },
          // Three3Tow: {
          //   name: 'Three3Tow',
          //   input: [
          //     InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
          //     InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
          //   ],
          //   pattern: '345THREEBRAVERYTOW3_$1_$2',
          //   noteCountFunc: NoteCountFunc.ThreeStar.Group3Tow,
          //   maxWin: 600,
          // },
          // Three6Tow: {
          //   name: 'Three6Tow',
          //   input: [
          //     InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
          //     InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
          //   ],
          //   pattern: '345THREEBRAVERYTOW3_$1_$2',
          //   noteCountFunc: NoteCountFunc.ThreeStar.Group6Tow,
          //   maxWin: 300,
          // },
          GroupCombine: {
            name: 'GroupCombine',
            input: [
              InputComponentDefinition.textArea('', 3, true), // 12|23|54|67|...
            ],
            pattern: '345THREECOMBINE_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 600,
          },
          GroupSum: {
            name: 'GroupSum',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 1, 26, 1, 26, InputDataType.SEPARATOR)],
            pattern: '345SUMGROUP_$1',
            noteCountFunc: NoteCountFunc.ThreeStar.GroupSum,
            maxWin: 600,
          },
        },
      },
      TwoStar: {
        name: 'TwoStar',
        type: {
          DirectionSelectionLastTwo: {
            name: 'DirectionSelectionLastTwo',
            input: [InputComponentDefinition.ballRange('Ten', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1), InputComponentDefinition.ballRange('Unit', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1)],
            pattern: '45OPTIONAL_$1_$2',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 180,
          },
          DirectMenuLastTwo: {
            name: 'DirectMenuLastTwo',
            input: [
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            pattern: '45OPTIONALINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 180,
          },
          DirectionalSumLastTwo: {
            name: 'DirectionalSumLastTwo',
            input: [InputComponentDefinition.ballRange('Ten', InputComponentTheme.ROWS, 0, 18, 1, 19, InputDataType.SEPARATOR)],
            pattern: '45OPTIONALSUM_$1',
            noteCountFunc: NoteCountFunc.TwoStar.DirectionalSum,
            maxWin: 180,
          },
          DirectionSelectionFirstTwo: {
            name: 'DirectionSelectionFirstTwo',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '12OPTIONAL_$1_$2',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 180,
          },
          DirectMenuFirstTwo: {
            name: 'DirectMenuFirstTwo',
            input: [
              InputComponentDefinition.textArea('', 2, true), // 12|23|54|67|...
            ],
            pattern: '12OPTIONALINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 180,
          },
          DirectionalSumFirstTwo: {
            name: 'DirectionalSumFirstTwo',
            input: [InputComponentDefinition.ballRange('Sum', InputComponentTheme.ROWS, 0, 18, 1, 19, InputDataType.SEPARATOR)],
            pattern: '12OPTIONALSUM_$1',
            noteCountFunc: NoteCountFunc.TwoStar.DirectionalSum,
            maxWin: 180,
          },
          GroupDirectionalSelectionLastTwo: {
            name: 'GroupDirectionalSelectionLastTwo',
            input: [InputComponentDefinition.ballRange('Group', InputComponentTheme.ROWS, 0, 9, 2)],
            pattern: '45TWOINPUT_$1',
            noteCountFunc: NoteCountFunc.TwoStar.GroupDirectionalSelection,
            maxWin: 90,
          },
          GroupDirectionalMenuLastTwo: {
            name: 'GroupDirectionalMenuLastTwo',
            input: [
              InputComponentDefinition.textArea('', 2, true), // 12|23|54|67|...
            ],
            pattern: '45GROUPINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 90,
          },
          GroupSumLastTwo: {
            name: 'GroupSumLastTwo',
            input: [InputComponentDefinition.ballRange('Group', InputComponentTheme.ROWS, 1, 17, 1, 17, InputDataType.SEPARATOR)],
            pattern: '45SUMGROUP_$1',
            noteCountFunc: NoteCountFunc.TwoStar.GroupSum,
            maxWin: 90,
          },
          GroupDirectionalSelectionFirstTwo: {
            name: 'GroupDirectionalSelectionFirstTwo',
            input: [InputComponentDefinition.ballRange('Group', InputComponentTheme.ROWS, 0, 9, 2)],
            pattern: '12TWOINPUT_$1',
            noteCountFunc: NoteCountFunc.TwoStar.GroupDirectionalSelection,
            maxWin: 90,
          },
          GroupDirectionalMenuFirstTwo: {
            name: 'GroupDirectionalMenuFirstTwo',
            input: [
              InputComponentDefinition.textArea('', 2, true), // 12|23|54|67|...
            ],
            pattern: '12GROUPINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 90,
          },
          GroupSumFirstTwo: {
            name: 'GroupSumFirstTwo',
            input: [InputComponentDefinition.ballRange('Group', InputComponentTheme.ROWS, 1, 17, 1, 17, InputDataType.SEPARATOR)],
            pattern: '12SUMGROUP_$1',
            noteCountFunc: NoteCountFunc.TwoStar.GroupSum,
            maxWin: 90,
          },
        },
      },
      StaticTow: {
        name: 'StaticTow',
        type: {
          StaticTow: {
            name: 'StaticTow',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Ten', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Unit', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
            ],
            dataSelect: 1,
            pattern: '^1POSITION_%1',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 18,
          },
        },
      }, // ??????
      NotPos: {
        name: 'NotPos',
        type: {
          AnyLastThreeOne: {
            name: 'AnyLastThreeOne',
            input: [InputComponentDefinition.ballRange('Any', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1)],
            pattern: '345NOTPOS1_$1',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 6.6,
          },
          AnyLastThreeTwo: {
            name: 'AnyLastThreeTwo',
            input: [InputComponentDefinition.ballRange('Any', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '345NOTPOS2_$1',
            noteCountFunc: NoteCountFunc.Any.TwoPos,
            maxWin: 33.33,
          },
          AnyFirstThreeOne: {
            name: 'AnyFirstThreeOne',
            input: [InputComponentDefinition.ballRange('Any', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1)],
            pattern: '123NOTPOS1_$1',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 6.6,
          },
          AnyFirstThreeTwo: {
            name: 'AnyFirstThreeTwo',
            input: [InputComponentDefinition.ballRange('Any', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '123NOTPOS2_$1',
            noteCountFunc: NoteCountFunc.Any.TwoPos,
            maxWin: 33.33,
          },
          AnyFiveOne: {
            name: 'AnyFiveOne',
            input: [InputComponentDefinition.ballRange('Any', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1)],
            pattern: '12345NOTPOS1_$1',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 4.4,
          },
          AnyFiveTwo: {
            name: 'AnyFiveTwo',
            input: [InputComponentDefinition.ballRange('Any', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '12345NOTPOS2_$1',
            noteCountFunc: NoteCountFunc.Any.TwoPos,
            maxWin: 12.27,
          },
          AnyFiveThree: {
            name: 'AnyFiveThree',
            input: [InputComponentDefinition.ballRange('Any', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 3)],
            pattern: '12345NOTPOS2_$1',
            noteCountFunc: NoteCountFunc.Any.ThreePos,
            maxWin: 41.38,
          },
        },
      },
      SizeParity: {
        name: 'SizeParity',
        type: {
          LastSizeParity: {
            name: 'LastSizeParity',
            input: [
              InputComponentDefinition.ballData('Ten', InputComponentTheme.ROW, ['BIG', 'SMALL', 'EVEN', 'ODD'], 1, InputDataType.SEPARATOR), // BIG|SMALL|EVEN|ODD
              InputComponentDefinition.ballData('Unit', InputComponentTheme.ROW, ['BIG', 'SMALL', 'EVEN', 'ODD'], 1, InputDataType.SEPARATOR),
            ],
            pattern: 'LAST2SIZEPARITY_$1_$2',
            noteCountFunc: NoteCountFunc.SizeParity.TwoPosDirectionalSelection,
            maxWin: 7.2,
          },
          FrontSizeParity: {
            name: 'LastSizeParity',
            input: [
              InputComponentDefinition.ballData('TenThousand', InputComponentTheme.ROW, ['BIG', 'SMALL', 'EVEN', 'ODD'], 1, InputDataType.SEPARATOR), // BIG|SMALL|EVEN|ODD
              InputComponentDefinition.ballData('Thousand', InputComponentTheme.ROW, ['BIG', 'SMALL', 'EVEN', 'ODD'], 1, InputDataType.SEPARATOR),
            ],
            pattern: 'FRONT2SIZEPARITY_$1_$2',
            noteCountFunc: NoteCountFunc.SizeParity.TwoPosDirectionalSelection,
            maxWin: 7.2,
          },
          TenThousandSizeParity: {
            name: 'TenThousandSizeParity',
            input: [InputComponentDefinition.ballData('TenThousand', InputComponentTheme.ROW, ['BIG', 'SMALL', 'EVEN', 'ODD'], 1, InputDataType.SEPARATOR)],
            pattern: 'MILSIZEPARITY_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 3.6,
          },
          ThousandSizeParity: {
            name: 'ThousandSizeParity',
            input: [InputComponentDefinition.ballData('Thousand', InputComponentTheme.ROW, ['BIG', 'SMALL', 'EVEN', 'ODD'], 1, InputDataType.SEPARATOR)],
            pattern: 'THOUSIZEPARITY_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 3.6,
          },
          HundredSizeParity: {
            name: 'HundredSizeParity',
            input: [InputComponentDefinition.ballData('Hundred', InputComponentTheme.ROW, ['BIG', 'SMALL', 'EVEN', 'ODD'], 1, InputDataType.SEPARATOR)],
            pattern: 'HUNSIZEPARITY_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 3.6,
          },
          TenSizeParity: {
            name: 'TenSizeParity',
            input: [InputComponentDefinition.ballData('Ten', InputComponentTheme.ROW, ['BIG', 'SMALL', 'EVEN', 'ODD'], 1, InputDataType.SEPARATOR)],
            pattern: 'TENSIZEPARITY_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 3.6,
          },
          SingleSizeParity: {
            name: 'SingleSizeParity',
            input: [InputComponentDefinition.ballData('Unit', InputComponentTheme.ROW, ['BIG', 'SMALL', 'EVEN', 'ODD'], 1, InputDataType.SEPARATOR)],
            pattern: 'SINSIZEPARITY_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 3.6,
          },
        },
      },
      Interest: {
        name: 'Interest',
        type: {
          Interest1: {
            name: 'Interest1',
            input: [InputComponentDefinition.ballRange('', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1, 10, InputDataType.STRING)],
            pattern: 'INTEREST1_$1',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 4.4,
          },
          Interest2: {
            name: 'Interest2',
            input: [InputComponentDefinition.ballRange('', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1, 10, InputDataType.STRING)],
            pattern: 'INTEREST2_$1',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 22,
          },
          Interest3: {
            name: 'Interest3',
            input: [InputComponentDefinition.ballRange('', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1, 10, InputDataType.STRING)],
            pattern: 'INTEREST3_$1',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 210,
          },
          Interest4: {
            name: 'Interest4',
            input: [InputComponentDefinition.ballRange('', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1, 10, InputDataType.STRING)],
            pattern: 'INTEREST4_$1',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 3913,
          },
        },
      },
      DragonTiger: {
        name: 'DragonTiger',
        type: {
          TenThousandThousand: {
            name: 'TenThousandThousand',
            input: [InputComponentDefinition.ballData('', InputComponentTheme.ROW, ['DRAGON', 'TIGER', 'TIE'], 1, InputDataType.SEPARATOR)],
            mapping: DataMapping.DragonTigerMapping,
            mappingIndex: [0],
            pattern: '12DT_$1',
            noteCountFunc: NoteCountFunc.DragonTigerNoteCount,
            maxWin: 18,
          },
          TenThousandHundred: {
            name: 'TenThousandHundred',
            input: [InputComponentDefinition.ballData('', InputComponentTheme.ROW, ['DRAGON', 'TIGER', 'TIE'], 1, InputDataType.SEPARATOR)],
            mapping: DataMapping.DragonTigerMapping,
            mappingIndex: [0],
            pattern: '13DT_$1',
            noteCountFunc: NoteCountFunc.DragonTigerNoteCount,
            maxWin: 18,
          },
          TenThousandTen: {
            name: 'TenThousandTen',
            input: [InputComponentDefinition.ballData('', InputComponentTheme.ROW, ['DRAGON', 'TIGER', 'TIE'], 1, InputDataType.SEPARATOR)],
            mapping: DataMapping.DragonTigerMapping,
            mappingIndex: [0],
            pattern: '14DT_$1',
            noteCountFunc: NoteCountFunc.DragonTigerNoteCount,
            maxWin: 18,
          },
          TenThousandUnit: {
            name: 'TenThousandUnit',
            input: [InputComponentDefinition.ballData('', InputComponentTheme.ROW, ['DRAGON', 'TIGER', 'TIE'], 1, InputDataType.SEPARATOR)],
            mapping: DataMapping.DragonTigerMapping,
            mappingIndex: [0],
            pattern: '15DT_$1',
            noteCountFunc: NoteCountFunc.DragonTigerNoteCount,
            maxWin: 18,
          },
          ThousandHundred: {
            name: 'ThousandHundred',
            input: [InputComponentDefinition.ballData('', InputComponentTheme.ROW, ['DRAGON', 'TIGER', 'TIE'], 1, InputDataType.SEPARATOR)],
            mapping: DataMapping.DragonTigerMapping,
            mappingIndex: [0],
            pattern: '23DT_$1',
            noteCountFunc: NoteCountFunc.DragonTigerNoteCount,
            maxWin: 18,
          },
          ThousandTen: {
            name: 'ThousandTen',
            input: [InputComponentDefinition.ballData('', InputComponentTheme.ROW, ['DRAGON', 'TIGER', 'TIE'], 1, InputDataType.SEPARATOR)],
            mapping: DataMapping.DragonTigerMapping,
            mappingIndex: [0],
            pattern: '24DT_$1',
            noteCountFunc: NoteCountFunc.DragonTigerNoteCount,
            maxWin: 18,
          },
          ThousandUnit: {
            name: 'ThousandUnit',
            input: [InputComponentDefinition.ballData('', InputComponentTheme.ROW, ['DRAGON', 'TIGER', 'TIE'], 1, InputDataType.STRING)],
            mapping: DataMapping.DragonTigerMapping,
            mappingIndex: [0],
            pattern: '25DT_$1',
            noteCountFunc: NoteCountFunc.DragonTigerNoteCount,
            maxWin: 18,
          },
          HundredTen: {
            name: 'HundredTen',
            input: [InputComponentDefinition.ballData('', InputComponentTheme.ROW, ['DRAGON', 'TIGER', 'TIE'], 1, InputDataType.STRING)],
            mapping: DataMapping.DragonTigerMapping,
            mappingIndex: [0],
            pattern: '34DT_$1',
            noteCountFunc: NoteCountFunc.DragonTigerNoteCount,
            maxWin: 18,
          },
          HundredUnit: {
            name: 'HundredUnit',
            input: [InputComponentDefinition.ballData('', InputComponentTheme.ROW, ['DRAGON', 'TIGER', 'TIE'], 1, InputDataType.STRING)],
            mapping: DataMapping.DragonTigerMapping,
            mappingIndex: [0],
            pattern: '35DT_$1',
            noteCountFunc: NoteCountFunc.DragonTigerNoteCount,
            maxWin: 18,
          },
          TenUnit: {
            name: 'TenUnit',
            input: [InputComponentDefinition.ballData('', InputComponentTheme.ROW, ['DRAGON', 'TIGER', 'TIE'], 1, InputDataType.STRING)],
            mapping: DataMapping.DragonTigerMapping,
            mappingIndex: [0],
            pattern: '45DT_$1',
            noteCountFunc: NoteCountFunc.DragonTigerNoteCount,
            maxWin: 18,
          },
        },
      },
      AnyTwo: {
        name: 'AnyTwo',
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Ten', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Unit', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
            ],
            dataSelect: 2,
            pattern: '^1^2OPTIONALFREE_&1_&2',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 180,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 2),
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            combinationDataId: 1,
            pattern: '^1^2OPTIONALINPUTFREE_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 180,
          },
          DirectionSum: {
            name: 'DirectionSum',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 2),
              InputComponentDefinition.ballRange('', InputComponentTheme.ROWS, 0, 18, 1, 19, InputDataType.SEPARATOR),
            ],
            combinationDataId: 1,
            pattern: '^1^2OPTIONALINPUTFREE_$1',
            noteCountFunc: NoteCountFunc.Any.AnyTwoDirectionalSum,
            maxWin: 180,
          },
          GroupSelection: {
            name: 'GroupSelection',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 2),
              InputComponentDefinition.ballRange('Group', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            combinationDataId: 1,
            pattern: '^1^2TWOGROUPFREE_$1',
            noteCountFunc: NoteCountFunc.Any.AnyGroupDirectionalSelection,
            maxWin: 90,
          },
          GroupMenu: {
            name: 'GroupMenu',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 2),
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            combinationDataId: 1,
            pattern: '^1^2TWOGROUPFREEINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 90,
          },
          GroupSum: {
            name: 'GroupSum',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 2),
              InputComponentDefinition.ballRange('', InputComponentTheme.ROWS, 1, 17, 1, 17, InputDataType.SEPARATOR),
            ],
            combinationDataId: 1,
            pattern: '^1^2SUMGROUPFREE_$1',
            noteCountFunc: NoteCountFunc.Any.AnyTwoGroupSum,
            maxWin: 90,
          },
        },
      },
      AnyThree: {
        name: 'AnyThree',
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Ten', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Unit', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
            ],
            dataSelect: 3,
            pattern: '^1^2^3OPTIONALFREE_&1_&2_&3',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 1800,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 3),
              InputComponentDefinition.textArea('', 3), // 12|23|54|67|...
            ],
            combinationDataId: 1,
            pattern: '^1^2^3OPTIONALINPUTFREE_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 1800,
          },
          DirectionSum: {
            name: 'DirectionSum',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 3),
              InputComponentDefinition.ballRange('', InputComponentTheme.ROWS, 0, 27, 1, 28, InputDataType.SEPARATOR),
            ],
            combinationDataId: 1,
            pattern: '^1^2^3OPTIONALINPUTFREE_$1',
            noteCountFunc: NoteCountFunc.Any.AnyThreeDirectionalSum,
            maxWin: 1800,
          },
          GroupThree: {
            name: 'GroupThree',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 3),
              InputComponentDefinition.ballRange('Group', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            combinationDataId: 1,
            pattern: '^1^2^3THREE3FREE_$1',
            noteCountFunc: NoteCountFunc.Any.AnyThreeGroup3,
            maxWin: 600,
          },
          GroupSix: {
            name: 'GroupSix',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 3),
              InputComponentDefinition.ballRange('Group', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 3),
            ],
            combinationDataId: 1,
            pattern: '^1^2^3THREE6FREE_$1',
            noteCountFunc: NoteCountFunc.Any.AnyThreeGroup6,
            maxWin: 300,
          },
          MixGroup: {
            name: 'MixGroup',
            input: [InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 3), InputComponentDefinition.textArea('', 3)],
            combinationDataId: 1,
            pattern: '^1^2^3THREECOMBINEFREE_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 600,
          },
          GroupSum: {
            name: 'GroupSum',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 3),
              InputComponentDefinition.ballRange('', InputComponentTheme.ROWS, 1, 26, 1, 26, InputDataType.SEPARATOR),
            ],
            combinationDataId: 1,
            pattern: '^1^2^3SUMGROUPFREE_$1',
            noteCountFunc: NoteCountFunc.Any.AnyThreeGroupSum,
            maxWin: 600,
          },
        },
      },
      AnyFour: {
        name: 'AnyFour',
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Ten', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
              InputComponentDefinition.ballRange('Unit', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 0),
            ],
            dataSelect: 4,
            pattern: '^1^2^3^4OPTIONALFREE_&1_&2_&3_&4',
            noteCountFunc: NoteCountFunc.DirectionalSelection,
            maxWin: 18000,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 4),
              InputComponentDefinition.textArea('', 4), // 12|23|54|67|...
            ],
            combinationDataId: 1,
            pattern: '^1^2^3^4OPTIONALFREEINPUT_$1',
            noteCountFunc: NoteCountFunc.SeparatorNoteCount,
            maxWin: 18000,
          },
          Group24: {
            name: 'Group24',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 4),
              InputComponentDefinition.ballRange('', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 4),
            ],
            combinationDataId: 1,
            pattern: '^1^2^3^4FOUR24FREE_$1',
            noteCountFunc: NoteCountFunc.FourStar.Group24,
            maxWin: 750,
          },
          Group12: {
            name: 'Group12',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 4),
              InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            combinationDataId: 1,
            pattern: '^1^2^3^4FOUR12FREE_$1_$2',
            noteCountFunc: NoteCountFunc.FourStar.Group12,
            maxWin: 1500,
          },
          Group6: {
            name: 'Group6',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 4),
              InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            combinationDataId: 1,
            pattern: '^1^2^3^4FOUR6FREE_$1',
            noteCountFunc: NoteCountFunc.FourStar.Group6,
            maxWin: 3000,
          },
          Group4: {
            name: 'Group4',
            input: [
              InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 4),
              InputComponentDefinition.ballRange('Triple', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            combinationDataId: 1,
            pattern: '^1^2^3^4FOUR6FREE_$1_$2',
            noteCountFunc: NoteCountFunc.FourStar.Group4,
            maxWin: 4500,
          },
        },
      },
    };
  }
}
