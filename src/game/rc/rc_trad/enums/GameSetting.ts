// TypeScript file
namespace we {
  export namespace rc {
    export const TempWinRatio = {
      RATIO_CHAMPION: 900,
      RATIO_TOP2: 8100,
      RATIO_TOP3: 64800,
      RATIO_TOP4: 0,
      RATIO_TOP5: 0,
      RATIO_FIXPOS: 900,
      RATIO_SIZEPARITY: 180,
      RATIO_DRAGONTIGER: 180,
    };

    export namespace InputComponentDefinition {
      export function textArea(title, numberPerGroup, min, max, isUnique = true) {
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

      export function separateBallRange(title, theme, start, end, minSelect = 0, maxSelect = 100, dataType: lo.InputDataType = lo.InputDataType.STRING) {
        return {
          type: lo.InputComponentType.BALLS,
          theme,
          title,
          data: Array.apply(null, { length: end - start + 1 }).map((data, idx) => start + idx),
          dataType,
          validate: (data: string | any[]) => {
            if (dataType === lo.InputDataType.STRING) {
              return data.length >= minSelect && data.length <= maxSelect;
            }

            if (dataType === lo.InputDataType.SEPARATOR) {
              const datas = (data as string).split('|');

              return datas.length >= minSelect && datas.length <= maxSelect;
            }
          }, // use to validate the output data of this component
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

    export const SelectionMapping = {
      Champion: {
        name: 'RCChampion',
        type: {
          DirectionalSelection: {
            name: 'RCDirectionalSelection',
            input: [lo.InputComponentDefinition.ballRange('RCChampion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR)],
            pattern: 'CHAMPION_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 9,
            ratio: ['RATIO_CHAMPION'],
          },
        },
      },
      Top2: {
        name: 'RCTop2',
        type: {
          Top2: {
            name: 'RCDirectionalSelection',
            input: [
              lo.InputComponentDefinition.ballRange('RCChampion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('RCSecond', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
            ],
            pattern: 'TOP2_$1_$2',
            noteCountFunc: NoteCountFunc.Top2,
            maxWin: 81,
            ratio: ['RATIO_TOP2'],
            validateData: (data: any[]) => {
              if (data[1].split('|').length === 2 && data[0].split('|').length === 1) {
                return lo.Validator.countDifferent(data[0].split('|'), data[1].split('|'), 1);
              }
              if (data[1].split('|').length === 1 && data[0].split('|').length === 2) {
                return lo.Validator.countDifferent(data[1].split('|'), data[0].split('|'), 1);
              }
              return true;
            },
          },
          Top2Input: {
            name: 'RCDirectionalMenu',
            input: [
              rc.InputComponentDefinition.textArea('', 2, 1, 10), // 1|2_3|4...
            ],
            pattern: 'TOP2INPUT_$1',
            noteCountFunc: NoteCountFunc.TextAreaCount,
            maxWin: 81,
            ratio: ['RATIO_TOP2'],
          },
        },
      },
      Top3: {
        name: 'RCTop3',
        type: {
          Top3: {
            name: 'RCDirectionalSelection',
            input: [
              lo.InputComponentDefinition.ballRange('RCChampion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('RCSecond', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
              lo.InputComponentDefinition.ballRange('RCThird', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
            ],
            pattern: 'TOP3_$1_$2_$3',
            noteCountFunc: NoteCountFunc.Top3,
            maxWin: 648,
            ratio: ['RATIO_TOP3'],
            validateData: (data: any[]) => {
              return true;
            },
          },
          Top3Input: {
            name: 'RCDirectionalMenu',
            input: [
              rc.InputComponentDefinition.textArea('', 3, 1, 10), // 1|2;3|4;...
            ],
            pattern: 'TOP3INPUT_$1',
            noteCountFunc: NoteCountFunc.TextAreaCount,
            maxWin: 648,
            ratio: ['RATIO_TOP3'],
          },
        },
      },
      // Top4: {
      //   name: 'RCTop4',
      //   type: {
      //     Top4: {
      //       name: 'RCDirectionalSelection',
      //       input: [
      //         lo.InputComponentDefinition.ballRange('Champion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
      //         lo.InputComponentDefinition.ballRange('Second', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
      //         lo.InputComponentDefinition.ballRange('Third', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
      //         lo.InputComponentDefinition.ballRange('Forth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
      //       ],
      //       pattern: 'TOP4_$1_$2_$3_$4_',
      //       noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
      //       maxWin: 18,
      //       ratio: ['RATIO_TOP4'],
      //     },
      //     Top4Input: {
      //       name: 'RCDirectionalMenu',
      //       input: [
      //         rc.InputComponentDefinition.textArea('', 4, 1, 10), // 1|2;3|4;...
      //       ],
      //       pattern: 'TOP4INPUT_$1',
      //       noteCountFunc: NoteCountFunc.TextAreaCount,
      //       maxWin: 18,
      //       ratio: ['RATIO_TOP4'],
      //     },
      //   },
      // },
      // Top5: {
      //   name: 'RCTop5',
      //   type: {
      //     Top5: {
      //       name: 'RCDirectionalSelection',
      //       input: [
      //         lo.InputComponentDefinition.ballRange('Champion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
      //         lo.InputComponentDefinition.ballRange('Second', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
      //         lo.InputComponentDefinition.ballRange('Third', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
      //         lo.InputComponentDefinition.ballRange('Forth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
      //         lo.InputComponentDefinition.ballRange('Fifth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 1, 10, lo.InputDataType.SEPARATOR),
      //       ],
      //       pattern: 'TOP5_$1_$2_$3_$4_$5',
      //       noteCountFunc: lo.NoteCountFunc.SeparatorNoteCount,
      //       maxWin: 18,
      //       ratio: ['RATIO_TOP5'],
      //     },
      //     Top5Input: {
      //       name: 'RCDirectionalMenu',
      //       input: [
      //         rc.InputComponentDefinition.textArea('', 5, 1, 10), // 1|2;3|4;...
      //       ],
      //       pattern: 'TOP5INPUT_$1',
      //       noteCountFunc: NoteCountFunc.TextAreaCount,
      //       maxWin: 18,
      //       ratio: ['RATIO_TOP5'],
      //     },
      //   },
      // },
      FixPos: {
        name: 'RCFixPos',
        type: {
          FirstFiveFixPos: {
            name: 'RCFirstFiveFixPos',
            input: [
              InputComponentDefinition.separateBallRange('RCChampion', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 0, 10, lo.InputDataType.SEPARATOR),
              InputComponentDefinition.separateBallRange('RCSecond', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 0, 10, lo.InputDataType.SEPARATOR),
              InputComponentDefinition.separateBallRange('RCThird', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 0, 10, lo.InputDataType.SEPARATOR),
              InputComponentDefinition.separateBallRange('RCForth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 0, 10, lo.InputDataType.SEPARATOR),
              InputComponentDefinition.separateBallRange('RCFifth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 0, 10, lo.InputDataType.SEPARATOR),
            ],
            dataSelect: 1,
            pattern: '^1FIXPOS_&1',
            noteCountFunc: NoteCountFunc.FixPos,
            maxWin: 9,
            ratio: [''],
          },
          LastFiveFixPos: {
            name: 'RCLastFiveFixPos',
            input: [
              InputComponentDefinition.separateBallRange('RCSixth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 0, 10, lo.InputDataType.SEPARATOR),
              InputComponentDefinition.separateBallRange('RCSeventh', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 0, 10, lo.InputDataType.SEPARATOR),
              InputComponentDefinition.separateBallRange('RCEighth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 0, 10, lo.InputDataType.SEPARATOR),
              InputComponentDefinition.separateBallRange('RCNinth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 0, 10, lo.InputDataType.SEPARATOR),
              InputComponentDefinition.separateBallRange('RCTenth', lo.InputComponentTheme.ROW_WITH_OPTION, 1, 10, 0, 10, lo.InputDataType.SEPARATOR),
            ],
            dataSelect: 1,
            constantIndex: 5,
            pattern: '^1FIXPOS_&1',
            noteCountFunc: NoteCountFunc.FixPos,
            maxWin: 9,
            ratio: ['RATIO_FIXPOS'],
          },
        },
      },
      Size: {
        name: 'RCSize',
        type: {
          Champion: {
            name: 'RCChampion',
            input: [lo.InputComponentDefinition.ballData('RCChampion', lo.InputComponentTheme.ROW, ['BIG', 'SMALL'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'CHAMPSIZE_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_SIZEPARITY'],
          },
          Second: {
            name: 'RCSecond',
            input: [lo.InputComponentDefinition.ballData('RCSecond', lo.InputComponentTheme.ROW, ['BIG', 'SMALL'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'SECONDSIZE_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_SIZEPARITY'],
          },
          Third: {
            name: 'RCThird',
            input: [lo.InputComponentDefinition.ballData('RCThird', lo.InputComponentTheme.ROW, ['BIG', 'SMALL'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'THIRDSIZE_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_SIZEPARITY'],
          },
          Forth: {
            name: 'RCForth',
            input: [lo.InputComponentDefinition.ballData('RCForth', lo.InputComponentTheme.ROW, ['BIG', 'SMALL'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'FORTHSIZE_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_SIZEPARITY'],
          },
          Fifth: {
            name: 'RCFifth',
            input: [lo.InputComponentDefinition.ballData('RCFifth', lo.InputComponentTheme.ROW, ['BIG', 'SMALL'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'FIFTHSIZE_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_SIZEPARITY'],
          },
        },
      },
      Parity: {
        name: 'RCParity',
        type: {
          Champion: {
            name: 'RCChampion',
            input: [lo.InputComponentDefinition.ballData('RCChampion', lo.InputComponentTheme.ROW, ['ODD', 'EVEN'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'CHAMPPARITY_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_SIZEPARITY'],
          },
          Second: {
            name: 'RCSecond',
            input: [lo.InputComponentDefinition.ballData('RCSecond', lo.InputComponentTheme.ROW, ['ODD', 'EVEN'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'SECONDPARITY_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_SIZEPARITY'],
          },
          Third: {
            name: 'RCThird',
            input: [lo.InputComponentDefinition.ballData('RCThird', lo.InputComponentTheme.ROW, ['ODD', 'EVEN'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'THIRDPARITY_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_SIZEPARITY'],
          },
          Forth: {
            name: 'RCForth',
            input: [lo.InputComponentDefinition.ballData('RCForth', lo.InputComponentTheme.ROW, ['ODD', 'EVEN'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'FORTHPARITY_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_SIZEPARITY'],
          },
          Fifth: {
            name: 'RCFifth',
            input: [lo.InputComponentDefinition.ballData('RCFifth', lo.InputComponentTheme.ROW, ['ODD', 'EVEN'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'FIFTHPARITY_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_SIZEPARITY'],
          },
        },
      },
      RCDragonTiger: {
        name: 'RCDragonTiger',
        type: {
          DT1v10: {
            name: 'RCDT1v10',
            input: [lo.InputComponentDefinition.ballData('RCDT1vs10', lo.InputComponentTheme.ROW, ['DRAGON', 'TIGER'], 1, lo.InputDataType.SEPARATOR)],
            pattern: 'DT1V10_$1',
            noteCountFunc: NoteCountFunc.NormalCount,
            maxWin: 1.8,
            ratio: ['RATIO_DRAGONTIGER'],
          },
        },
      },
    };
  }
}
