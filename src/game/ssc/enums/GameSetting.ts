// TypeScript file
namespace we {
  export namespace lo {
    export const ImageMapping = {
      BIGTAG_ACTIVE: '',
      BIGTAG_NORMAL: '',
      BIGTAG_HOVER: '',
      BET_BALL_ACTIVE: '',
      BET_BALL_NORMAL: '',
      BET_BALL_HOVER: '',
      //   SMALLTAG_ACTIVE:"",
      //   SMALLTAG_NORMAL:"",
      //   SMALLTAG_HOVER:""
    };

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

    export namespace NoteCountFunc {
      export function DirectionSelection(data, combinations) {
        return 1;
      }
    }

    export namespace InputComponentDefinition {
      export function ballRange(title, theme, start, end, minSelect = 0, maxSelect = 100, dataType: InputDataType = InputDataType.STRING) {
        return {
          type: InputComponentType.BALLS,
          theme,
          title,
          data: Array.apply(null, { length: end - start + 1 }).map((data, idx) => start + idx),
          dataType,
          validate: (data: string | any[]) => data.length >= minSelect && data.length <= maxSelect, // use to validate the output data of this component
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

      export function textArea(title, numberPerGroup) {
        return {
          type: InputComponentType.TEXTAREA,
          numberPerGroup,
          title,
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
          validate: (data: string | any[]) => data.length >= minSelect,
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
            noteCountFunc: NoteCountFunc.DirectionSelection,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            pattern: '12345OPTIONALINPUT_$1',
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
          },
          Group120: {
            name: 'Group120',
            input: [InputComponentDefinition.ballRange('', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 5)],
            pattern: 'FIVE120_$1',
          },
          Group60: {
            name: 'Group60',
            input: [
              InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 3),
            ],
            pattern: 'FIVE60_$1_$2',
            validateData: (data: any[]) => {
              if (data[0].length === 2) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                Validator.countDifferent(data[0], data[1], 2);
              }
            },
          },
          Group30: {
            name: 'Group30',
            input: [
              InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: 'FIVE30_$1_$2',
            validateData: (data: any[]) => {
              if (data[0].length === 2) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                Validator.countDifferent(data[0], data[1], 2);
              }
            },
          },
          Group20: {
            name: 'Group20',
            input: [
              InputComponentDefinition.ballRange('Triple', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            pattern: 'FIVE20_$1_$2',
            validateData: (data: any[]) => {
              if (data[0].length === 2) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                Validator.countDifferent(data[0], data[1], 2);
              }
            },
          },
          Group10: {
            name: 'Group10',
            input: [
              InputComponentDefinition.ballRange('Triple', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: 'FIVE10_$1_$2',
            validateData: (data: any[]) => {
              if (data[0].length === 2) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                Validator.countDifferent(data[0], data[1], 2);
              }
            },
          },
          Group5: {
            name: 'Group5',
            input: [
              InputComponentDefinition.ballRange('Quadruple', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: 'FIVE5_$1_$2',
            validateData: (data: any[]) => {
              if (data[0].length === 2) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                Validator.countDifferent(data[0], data[1], 2);
              }
            },
          },
        },
      },
      FourStar:{
        name: 'FiveStar',
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
            noteCountFunc: NoteCountFunc.DirectionSelection,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            pattern: '2345OPTIONALINPUT_$1',
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
          },
          Group24: {
            name: 'Group24',
            input: [InputComponentDefinition.ballRange('', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 4)],
            pattern: '2345FOUR24_$1',
          },
          Group12: {
            name: 'Group12',
            input: [
              InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            pattern: '2345FOUR12_$1_$2',
            validateData: (data: any[]) => {
              if (data[0].length === 2) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                Validator.countDifferent(data[0], data[1], 2);
              }
            }
          },
          Group6: {
            name: 'Group6',
            input: [InputComponentDefinition.ballRange('Double', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '2345FOUR6_$1',
          },
          Group4: {
            name: 'Group4',
            input: [
              InputComponentDefinition.ballRange('Triple', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Single', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '2345FOUR4_$1_$2',
          },
      },
      FirstThree: {
        name: 'First Three',
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '123OPTIONAL_$1_$2_$3',
            noteCountFunc: NoteCountFunc.DirectionSelection,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            pattern: '123OPTIONALINPUT_$1',
          },
          DirectionSum: {
            name: 'DirectionSum',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 0, 27, 1, InputDataType.SEPARATOR)],
            pattern: '123SUMOPTIONAL_$1',
          },
          Group3: {
            name: 'Group3',
            input: [InputComponentDefinition.ballRange('Group3', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '123THREE3_$1',
          },
          Group6: {
            name: 'Group6',
            input: [InputComponentDefinition.ballRange('Group6', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 3)],
            pattern: '123THREE6_$1',
          },
          Group3Tow: {
            name: 'Group3Tow',
            input: [
              InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '123THREEBRAVERYTOW3_$1_$2',
          },
          Group6Tow: {
            name: 'Group6Tow',
            input: [
              InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            pattern: '123THREEBRAVERYTOW3_$1_$2',
          },
          GroupCombine:{
            input: [
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            pattern: '123THREECOMBINE_$1',
          },
          SumGroup: {
            name: 'SumGroup',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 1, 26, 1, InputDataType.SEPARATOR)],
            pattern: '123SUMGROUP_$1',
          },
        },
      },
      MidThree: {
        name: 'Mid Three',
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '234OPTIONAL_$1_$2_$3',
            noteCountFunc: NoteCountFunc.DirectionSelection,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            pattern: '234OPTIONALINPUT_$1',
          },
          DirectionSum: {
            name: 'DirectionSum',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 0, 27, 1, InputDataType.SEPARATOR)],
            pattern: '234SUMOPTIONAL_$1',
          },
          Group3: {
            name: 'Group3',
            input: [InputComponentDefinition.ballRange('Group3', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '234THREE3_$1',
          },
          Group6: {
            name: 'Group6',
            input: [InputComponentDefinition.ballRange('Group6', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 3)],
            pattern: '234THREE6_$1',
          },
          Group3Tow: {
            name: 'Group3Tow',
            input: [
              InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '234THREEBRAVERYTOW3_$1_$2',
          },
          Group6Tow: {
            name: 'Group6Tow',
            input: [
              InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            pattern: '234THREEBRAVERYTOW3_$1_$2',
          },
          GroupCombine:{
            input: [
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            pattern: '234THREECOMBINE_$1',
          },
          SumGroup: {
            name: 'SumGroup',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 1, 26, 1, InputDataType.SEPARATOR)],
            pattern: '234SUMGROUP_$1',
          },
        },
      },
      LastThree: {
        name: 'Last Three',
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Thousand', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Hundred', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '345OPTIONAL_$1_$2_$3',
            noteCountFunc: NoteCountFunc.DirectionSelection,
          },
          DirectMenu: {
            name: 'DirectMenu',
            input: [
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            pattern: '345OPTIONALINPUT_$1',
          },
          DirectionSum: {
            name: 'DirectionSum',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 0, 27, 1, InputDataType.SEPARATOR)],
            pattern: '345SUMOPTIONAL_$1',
          },
          Group3: {
            name: 'Group3',
            input: [InputComponentDefinition.ballRange('Group3', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2)],
            pattern: '345THREE3_$1',
          },
          Group6: {
            name: 'Group6',
            input: [InputComponentDefinition.ballRange('Group6', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 3)],
            pattern: '345THREE6_$1',
          },
          Group3Tow: {
            name: 'Group3Tow',
            input: [
              InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
            ],
            pattern: '345THREEBRAVERYTOW3_$1_$2',
          },
          Group6Tow: {
            name: 'Group6Tow',
            input: [
              InputComponentDefinition.ballRange('Bravery', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 1),
              InputComponentDefinition.ballRange('Tow', InputComponentTheme.ROW_WITH_OPTION, 0, 9, 2),
            ],
            pattern: '345THREEBRAVERYTOW3_$1_$2',
          },
          GroupCombine:{
            input: [
              InputComponentDefinition.textArea('', 2), // 12|23|54|67|...
            ],
            pattern: '345THREECOMBINE_$1',
          },
          SumGroup: {
            name: 'SumGroup',
            input: [InputComponentDefinition.ballRange('DirectionSum', InputComponentTheme.ROWS, 1, 26, 1, InputDataType.SEPARATOR)],
            pattern: '345SUMGROUP_$1',
          },
        },
      },
      AnyTwo: {
        name: 'Any Two',
        type: {
          GroupSum: {
            name: 'GroupSum',
            input: [InputComponentDefinition.checkboxes(['TenThousand', 'Thousand', 'Hundred', 'Ten', 'Unit'], 2), InputComponentDefinition.ballRange('Group', InputComponentTheme.ROWS, 1, 17, 1)],
            combinationDataId: 1,
            pattern: '^1^2SUMOPTIONALFREE_$1',
          },
        },
      },
      // FourStar: {
      //   // bigTag
      //   name: 'FourStar',
      //   seperateLine: [1], // small tag index for if there is a seprate line to seperate the next item
      //   type: {
      //     DirectionSelection: {
      //       // smallTag
      //       name: 'DirectionSelection',
      //       inputType: '0', // 0 = number Button(title/balls/option), 1 = Text Field, 2 = Big/Small/Odd/Even, 3 = Dragon/Tiger/Tie
      //       row: '4',
      //       rowName: ['Thousand', 'Hundred', 'Ten', 'Unit'],
      //       option: '1',
      //       showValue: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      //       input: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      //       checkBox: [],
      //       betCode: '12345OPTIONAL',
      //     },
      //   },
      // },
      //   BigSmallOddEven: {
      //     name: 'BigSmallOddEven',
      //     type: {
      //       BackTwoBigSmallOddEven: {
      //         name: 'BackTwoBigSmallOddEven',
      //         inputType: '2', // 0 = number Button, 1 = Text Field, 2 = Big/Small/Odd/Even, 3 = Dragon/Tiger/Tie
      //         row: '2',
      //         rowName: ['Ten', 'Unit'],
      //         option: '0',
      //         betType: '',
      //       },
      //     },
      //   },
      //   DragonTiger: {
      //     name: 'DragonTiger',
      //     type: {
      //       TenThousandThousand: {
      //         name: 'TenThousandThousand',
      //         inputType: '3', // 0 = number Button, 1 = Text Field, 2 = Big/Small/Odd/Even, 3 = Dragon/Tiger/Tie
      //         row: '1',
      //         rowName: ['TenUnit'],
      //         option: '0',
      //       },
      //     },
      //   },

      }
    }
  }
}
