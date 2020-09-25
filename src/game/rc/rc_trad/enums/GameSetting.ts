// TypeScript file
namespace we {
  export namespace rc {
    export namespace InputComponentDefinition {
      export function textArea(title, numberPerGroup, min, max, isUnique = false) {
        return {
          type: lo.InputComponentType.TEXTAREA,
          numberPerGroup,
          title,
          isUnique, // to check if single data allow duplicated number
          min,
          max,
          validate: (data: string | any[]) => true,

          // data example (numberPerGroup=5): 12345|12346|14573|17764|09663|...
          // data example (numberPerGroup=2): 12|23|49|64|85|26|...
        };
      }
    }

    export const SelectionMapping = {
      Champion: {
        name: 'Champion',
        type: {
          Champion: {
            name: 'Champion',
            input: [lo.InputComponentDefinition.ballRange('Champion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR)],
            pattern: 'CHAMPION_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
        },
      },
      Top2: {
        name: 'Top2',
        type: {
          Top2: {
            name: 'Top2',
            input: [
              lo.InputComponentDefinition.ballRange('Champion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Second', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
            ],
            pattern: 'TOP2_$1_$2',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
            validateData: (data: any[]) => {
              if (data[0].length === 1 && data[1].length === 1) {
                return lo.Validator.countDifferent(data[0], data[1], 1);
              }
              return true;
            },
          },
          Top2Input: {
            name: 'Top2Input',
            input: [
              rc.InputComponentDefinition.textArea('', 2, 1, 10), // 1|2_3|4...
            ],
            pattern: 'TOP2INPUT_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
            validateData: (data: any[]) => {
              if (data[1].length === 2) {
                // e.g. invalid: 0|1_1|2
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                return lo.Validator.countDifferent(data[0], data[1], 2);
              }
              return true;
            },
          },
        },
      },
      Top3: {
        name: 'Top3',
        type: {
          Top3: {
            name: 'Top3',
            input: [
              lo.InputComponentDefinition.ballRange('Champion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Second', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Third', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
            ],
            pattern: 'TOP3_$1_$2_$3',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Top3Input: {
            name: 'Top3Input',
            input: [
              rc.InputComponentDefinition.textArea('', 3, 1, 10), // 1|2;3|4;...
            ],
            pattern: 'TOP3INPUT_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
            validateData: (data: any[]) => {
              if (data[1].length === 2) {
                // e.g. invalid: 0|1_1|2
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                return lo.Validator.countDifferent(data[0], data[1], 2);
              }
              return true;
            },
          },
        },
      },
      Top4: {
        name: 'Top4',
        type: {
          Top4: {
            name: 'Top4',
            input: [
              lo.InputComponentDefinition.ballRange('Champion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Second', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Third', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Forth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
            ],
            pattern: 'TOP4_$1_$2_$3_$4_',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Top4Input: {
            name: 'Top4Input',
            input: [
              rc.InputComponentDefinition.textArea('', 4, 1, 10), // 1|2;3|4;...
            ],
            pattern: 'TOP4INPUT_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
            validateData: (data: any[]) => {
              if (data[1].length === 2) {
                // e.g. invalid: 0|1_1|2
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                return lo.Validator.countDifferent(data[0], data[1], 2);
              }
              return true;
            },
          },
        },
      },
      Top5: {
        name: 'Top5',
        type: {
          Top5: {
            name: 'Top5',
            input: [
              lo.InputComponentDefinition.ballRange('Champion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Second', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Third', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Forth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Fifth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
            ],
            pattern: 'TOP5_$1_$2_$3_$4_$5',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Top5Input: {
            name: 'Top5Input',
            input: [
              rc.InputComponentDefinition.textArea('', 5, 1, 10), // 1|2;3|4;...
            ],
            pattern: 'TOP5INPUT_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
            validateData: (data: any[]) => {
              if (data[1].length === 2) {
                // e.g. invalid: 0|1_1|2
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                return lo.Validator.countDifferent(data[0], data[1], 2);
              }
              return true;
            },
          },
        },
      },
      FixPos: {
        name: 'FixPos',
        type: {
          FirstFiveFixPos: {
            name: 'FirstFiveFixPos',
            input: [
              lo.InputComponentDefinition.ballRange('Champion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Second', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Third', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Forth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Fifth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
            ],
            pattern: '^1FIXPOS_&1',
            // noteCountFunc: lo.NoteCountFunc.,
            maxWin: 18,
            ratio: [''],
          },
          LastFiveFixPos: {
            name: 'LastFiveFixPos',
            input: [
              lo.InputComponentDefinition.ballRange('Sixth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Seventh', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Eighth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Ninth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('Tenth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
            ],
            pattern: '^1FIXPOS_&1',
            // noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
        },
      },
      SIZE: {
        name: 'SIZE',
        type: {
          Champion: {
            name: 'Champion',
            input: [lo.InputComponentDefinition.ballData('Champion', lo.InputComponentTheme.ROW, ['BIG', 'SMALL'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'CHAMPSIZE_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Second: {
            name: 'Second',
            input: [lo.InputComponentDefinition.ballData('Second', lo.InputComponentTheme.ROW, ['BIG', 'SMALL'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'SECONDSIZE_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Third: {
            name: 'Third',
            input: [lo.InputComponentDefinition.ballData('Third', lo.InputComponentTheme.ROW, ['BIG', 'SMALL'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'THIRDSIZE_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Forth: {
            name: 'Forth',
            input: [lo.InputComponentDefinition.ballData('Champion', lo.InputComponentTheme.ROW, ['BIG', 'SMALL'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'FORTHSIZE_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Fith: {
            name: 'Fifth',
            input: [lo.InputComponentDefinition.ballData('Champion', lo.InputComponentTheme.ROW, ['BIG', 'SMALL'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'FIFTHSIZE_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
        },
      },
      Parity: {
        name: 'Parity',
        type: {
          Champion: {
            name: 'Champion',
            input: [lo.InputComponentDefinition.ballData('Champion', lo.InputComponentTheme.ROW, ['ODD', 'EVEN'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'CHAMPPARITY_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Second: {
            name: 'Second',
            input: [lo.InputComponentDefinition.ballData('Second', lo.InputComponentTheme.ROW, ['ODD', 'EVEN'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'SECONDPARITY_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Third: {
            name: 'Third',
            input: [lo.InputComponentDefinition.ballData('Third', lo.InputComponentTheme.ROW, ['ODD', 'EVEN'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'THIRDPARITY_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Forth: {
            name: 'Forth',
            input: [lo.InputComponentDefinition.ballData('Champion', lo.InputComponentTheme.ROW, ['ODD', 'EVEN'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'FORTHPARITY_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
          Fith: {
            name: 'Fifth',
            input: [lo.InputComponentDefinition.ballData('Champion', lo.InputComponentTheme.ROW, ['ODD', 'EVEN'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'FIFTHPARITY_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
        },
      },
      DragonTiger: {
        name: 'DragonTiger',
        type: {
          DT1v10: {
            name: 'DT1v10',
            input: [lo.InputComponentDefinition.ballData('Champion', lo.InputComponentTheme.ROW, ['DRAGON', 'TIGER'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'DT1v10_$1',
            noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
            maxWin: 18,
            ratio: [''],
          },
        },
      },
    };
  }
}
