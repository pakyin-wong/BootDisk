// TypeScript file
namespace we {
  export namespace ssc {
    export enum InputComponentType {
      BALLS,
      TEXTAREA,
      CHECKBOXES
    }
    export enum InputDataType {
      STRING, // i.e. '123456789'
      SEPARATOR, // i.e. '1|2|3|4|5|6|7|8|9|10|11|12|14'
      ARRAY   // i.e. '['1','2','3','4','5','6','7','8','9']'
    }

    export namespace InputComponentDefinition {
      export function ballRange(title, start, end , minSelect=0, maxSelect=100, dataType:InputDataType=InputDataType.STRING) {
        return {
          type: InputComponentType.BALLS,
          title: title,
          data: Array.apply(null, {length: (end - start + 1)}).map((data,idx)=>start+idx),
          dataType: dataType,
          validate: (data: string|any[])=>(data.length>=minSelect && data.length<=maxSelect)  // use to validate the output data of this component
        }
      }

      export function ballData(title, data, minSelect=0, dataType:InputDataType=InputDataType.STRING, maxSelect=100) {
        return {
          type: InputComponentType.BALLS,
          title: title,
          data: data,
          dataType: dataType,
          validate: (data: string|any[])=>(data.length>=minSelect && data.length<=maxSelect)
        }
      }

      export function textArea(title, numberPerGroup) {
        return {
          type: InputComponentType.TEXTAREA,
          numberPerGroup: numberPerGroup,
          title: title
          // data example (numberPerGroup=5): 12345|12346|14573|17764|09663|...
          // data example (numberPerGroup=2): 12|23|49|64|85|26|...
        }
      }

      export function checkboxes(title, data, minSelect=0) {
        return {
          type: InputComponentType.CHECKBOXES,
          title: title,
          minSelect: minSelect
          // data example: ['1_2', '2_3', '1_3']
          // this data may use directly as the combination array
        }
      }

    }

    export namespace NoteCountFunc {
      export function DirectionSelection(data, combinations) {
        return 1;
      }
    }

    export namespace Validator {

      // check the number of different items inside two data
      export function countDifferent(data1, data2, minDifferentCount) {
        var a = [], diff = [];
        for (var i = 0; i < data1.length; i++) {
            a[data1[i]] = true;
        }
        for (var i = 0; i < data2.length; i++) {
            if (a[data2[i]]) {
                delete a[data2[i]];
            } else {
                a[data2[i]] = true;
            }
        }
        for (var k in a) {
            diff.push(k);
        }
        return diff.length >= minDifferentCount;

      }
    }

    export const template = {
      template: {
        name: 'template',
        type: {
          DirectionSelection: {
            name: 'DirectionSelection',
            input: [
              InputComponentDefinition.ballRange('TenThousand',0,9,1),
              InputComponentDefinition.ballRange('Thousand',0,9,1),
              InputComponentDefinition.ballRange('Hundred',0,9,1),
              InputComponentDefinition.ballRange('Ten',0,9,1),
              InputComponentDefinition.ballRange('Unit',0,9,1)
            ],
            pattern:"12345OPTIONAL_$1_$2_$3_$4_$5",
            noteCountFunc:NoteCountFunc.DirectionSelection
          },
          Five30: {
            name: 'Five30',
            input: [
              InputComponentDefinition.ballRange('Double',0,9,2),
              InputComponentDefinition.ballRange('Single',0,9,1),
            ],
            pattern:"FIVE30_%1_%2",
            validateData:(data:any[])=>{
              if (data[0].length===2) {
                // e.g. invalid: 01_1, 01_0, 09_9, 09_0
                // e.g. valid: 012_0
                // i.e. check number of different item in data1 and data2 and it must be >= 2
                Validator.countDifferent(data[0], data[1], 2);
              }
            }
          },
          SumGroup345: {
            name: 'SumGroup345',
            input: [
              InputComponentDefinition.ballRange('',1,26,1,InputDataType.SEPARATOR)
            ],
            pattern:'345SUMGROUP_$1'
          },
          OptionalFree12: {
            name: 'OptionalFree12',
            input: [
              InputComponentDefinition.ballRange('TenThousand',0,9,0),
              InputComponentDefinition.ballRange('Thousand',0,9,0),
              InputComponentDefinition.ballRange('Hundred',0,9,0),
              InputComponentDefinition.ballRange('Ten',0,9,0),
              InputComponentDefinition.ballRange('Unit',0,9,0)
            ],
            dataSelect: 2, // 5 data choose 2, if not set, use input.length, generate combinationData, example: ['1_2', '2_3', '1_3']
            pattern:'^1^2OptionalFree_&1_&2'
            // ^n: nth index of combination, &n: data of the nth index of combination, 
          },
          DT12: {
            name: 'OptionalFree12',
            input: [
              InputComponentDefinition.ballData('',['DRAGON','TIGER','TIE'],1,InputDataType.ARRAY)
            ],
            mapping:(data, combinationData)=>{},
            pattern:'12DT_$1'
          },
          Front2SizeParity: {
            name: 'Front2SizeParity',
            input: [
              InputComponentDefinition.ballData('TenThousand',['BIG','SMALL','EVEN','ODD'],1,InputDataType.SEPARATOR),   // BIG|SMALL|EVEN|ODD
              InputComponentDefinition.ballData('Thousand',['BIG','SMALL','EVEN','ODD'],1,InputDataType.SEPARATOR)
            ],
            pattern:'FRONT2SIZEPARITY_$1_$2'  // FRONT2SIZEPARITY_BIG|SMALL|EVEN|ODD_BIG|SMALL|EVEN|ODD
          },
          OptionalInput12345: {
            // need to redesign the structure of the betfield with Felix
            name: 'OptionalInput12345',
            input: [
              InputComponentDefinition.textArea('',5)
            ],
            pattern:'12345OPTIONALINPUT_$1'
          },
          OptionalInput12: {
            // need to redesign the structure of the betfield with Felix
            name: 'OptionalInput12',
            input: [
              InputComponentDefinition.textArea('',2),    // 12|23|54|67|...
              InputComponentDefinition.checkboxes('',['TenThousand','Thousand','Hundred','Ten','Unit'],2) // ['1_2','2_3','1_3']
            ],
            combinationDataId:2, // use data from checkboxes as the combinationData
            pattern:'^1^2OPTIONALINPUT_$1'
            // %n: index of nth input, $n: data of nth input
            // ^n: nth index of combination, &n: data of the nth index of combination, 
            /** [
             *  12OPTIONALINPUT_12|23|54|67|...,
             *  23OPTIONALINPUT_12|23|54|67|...,
             * ]
             */            
          }
        }
      }
    }
  }
}

/**
 * combination related param: combinationDataId, dataSelect
 * use combinationDataId directly if exist
 * else check if !NaN(dataSelect), generate the combinationData
 * 
 * if there is combinationData, final betfield data should be an array
 * else it should be a single betfield string (alternative: array of one betfield string)
 */