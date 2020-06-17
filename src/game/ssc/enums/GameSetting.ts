// TypeScript file
namespace we {
  export namespace ssc {
      export const ImageMapping ={
          BIGTAG_ACTIVE:"",
          BIGTAG_NORMAL:"",
          BIGTAG_HOVER:"",
        //   SMALLTAG_ACTIVE:"",
        //   SMALLTAG_NORMAL:"",
        //   SMALLTAG_HOVER:""
      }

      export const SelectionMapping : any = {
            FiveStar:{      //bigTag
                name:"FiveStar",
                seperateLine:[2], // small tag index for if there is a seprate line to seperate the next item
                type:{
                    DirectionSelection:{    //smallTag
                        name:"DirectionSelection",
                        inputType:"0",   // 0 = number Button, 1 = Text Field, 2 = Big/Small/Odd/Even, 3 = Dragon/Tiger/Tie
                        row:"5",
                        rowName:["TenThousand","Thousand","Hundred","Ten","Unit"],
                        option:"1",
                        showValue:["0","1","2","3","4","5","6","7","8","9"],
                        input:["0","1","2","3","4","5","6","7","8","9"],
                        checkBox:[],
                        betCode:"12345OPTIONAL"
                    },
                    DirectMenu:{
                        name:"DirectMenu",				
                        inputType:"1",		// 0 = number Button, 1 = Text Field, 2 = Big/Small/Odd/Even, 3 = Dragon/Tiger/Tie
                        betCode:"12345OPTIONINPUT"
                    },
                    DirectCombination:{
                        name:"DirectCombination",
                        inputType:"0",   // 0 = number Button, 1 = Text Field, 2 = Big/Small/Odd/Even, 3 = Dragon/Tiger/Tie
                        row:"5",
                        rowName:["TenThousand","Thousand","Hundred","Ten","Unit"],
                        option:"1",
                        numberMin:"0",
                        numberMax:"9",
                        betCode:"12345OPTIONALCOM"
                    },
                }
            },
            BigSmallOddEven:{
                name:"BigSmallOddEven",
                type:{
                    BackTwoBigSmallOddEven:{
                        name:"BackTwoBigSmallOddEven",
                        inputType:"2",   // 0 = number Button, 1 = Text Field, 2 = Big/Small/Odd/Even, 3 = Dragon/Tiger/Tie
                        row:"2",
                        rowName:["Ten","Unit"],
                        option:"0",
                        betType:""
                    },
                }
            },
            DragonTiger:{
                name:"DragonTiger",
                type:{
                    TenThousandThousand:{
                        name:"TenThousandThousand",
                        inputType:"3",   // 0 = number Button, 1 = Text Field, 2 = Big/Small/Odd/Even, 3 = Dragon/Tiger/Tie
                        row:"1",
                        rowName:["TenUnit"],
                        option:"0",
                    },
                }
            }
        }
    }
}