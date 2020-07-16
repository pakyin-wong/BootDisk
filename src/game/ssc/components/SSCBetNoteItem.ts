namespace we {
  export namespace lo {
    export class SSCBetNoteItem extends eui.ItemRenderer {
      // private _txt_record_id: eui.Label;
      // private _txt_record_date: eui.Label;
      // private _txt_record_game: eui.Label;
      // private _txt_record_round: eui.Label;
      // private _txt_record_remark: eui.Label;
      // private _txt_record_bettype: eui.Label;
      // private _txt_record_betamount: eui.Label;
      // private _txt_record_win: eui.Label;
      // private _txt_record_orgbalance: eui.Label;
      // private _txt_record_finbalance: eui.Label;
      // private _record_result: egret.DisplayObjectContainer;
      // private _btn_replay: egret.DisplayObject;
      // private _txt_record_bgcolor: eui.Rect;
      // private _txt_hover_color: eui.Rect;
      private _txtGameMode: eui.Label;
      private _txtBetItem: eui.Label;
      private _txtBetMode: eui.Label;
      private _txtNoteCount: eui.Label;
      private _txtMultiplier: eui.Label;
      private _txtTotalBet: eui.Label;
      private _btnDelect: eui.Image;

      private gamemode;
      private betitem;
      private betmode;
      private totalbet;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('SSCBetNoteItem');
        this.addListeners();
        console.log('this', this);
        console.log('this.parent', this.parent);
        // console.log('this.parent', this.parent);
        // console.log('this.parent.parent', this.parent.parent);
      }
      // TradNoteData {
      //   public field: string; // field consist of several information: Bet type, bet per note and bet detail
      //   public count: number; // number of note corresponding to the field
      //   public multiplier: number;
      // }
      protected dataChanged(): void {
        super.dataChanged();
        this.generateStringFromField(this.data.field);
        this._txtGameMode.text = this.gamemode;
        this._txtBetItem.text = this.betitem;
        this._txtBetMode.text = `${parseInt(this.betmode, 10) / 100} 元`;
        this._txtNoteCount.text = `${this.data.count} 注`;
        this._txtMultiplier.text = this.data.multiplier;
        this._txtTotalBet.text = `$ ${Math.round(this.data.multiplier * parseInt(this.betmode, 10) * this.data.count * 100) / 10000}`;
      }

      protected addListeners() {
        this._btnDelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDelect, this);
      }

      protected removeListeners() {
        this._btnDelect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDelect, this);
      }

      protected onClickDelect() {
        console.log('SSCBETNOTEITEM :: onClickDelect', this.data);
        // TODO: call parent to clear the data , delect this.notes ,update total
      }

      protected generateStringFromField(field: string) {
        // example:'12OptionalFree_1_2@200'
        let result: any = field.split(/@/g);
        // result = ['12OptionalFree_1_2' , '200']
        result[0] = result[0].split(/([a-zA-Z]+)/);
        // result = [['12' , 'OptionalFree' , '_1_2'] , '200']
        result = [...result[0], result[1]];
        // result = ['12' , 'OptionalFree' , '_1_2' , '200']
        this.gamemode = this.generateGameModeFromField(result[0], result[1]); // 萬千 OptionalFree
        this.betmode = Math.round(parseInt(result[3], 10) * 100) / 100;
        this.betitem = this.generateBetitemFromField(result[2]); // 1|2
      }

      protected generateBetitemFromField(DataString: string) {
        const DataStringArray = DataString.split('_');
        // DataStringArray = ['','1','2']
        let OutputDataSting = '';
        for (let i = 1; i < DataStringArray.length; i++) {
          OutputDataSting = OutputDataSting + ` | ${DataStringArray[i]}`;
        }
        // TODO:check string length
        return OutputDataSting;
      }

      protected generateGameModeFromField(index: string, mode: string) {
        const IndexArray = index.split('');
        let OutputGameModeSting = '';
        IndexArray.forEach(IndexArray => {
          switch (IndexArray) {
            case '1':
              // replace i18n later
              OutputGameModeSting = OutputGameModeSting + '萬';
              break;
            case '2':
              OutputGameModeSting = OutputGameModeSting + '千';
              break;
            case '3':
              OutputGameModeSting = OutputGameModeSting + '百';
              break;
            case '4':
              OutputGameModeSting = OutputGameModeSting + '十';
              break;
            case '5':
              OutputGameModeSting = OutputGameModeSting + '個';
              break;
            default:
              console.log('We dont have this pattern');
              break;
          }
        });
        OutputGameModeSting += mode;
        return OutputGameModeSting;
      }
      // protected generateStringFromField(field: string) {
      //   // example:^1^2OptionalFree_&1_&2@200
      //   const RESULT: any = field.split(/(?=@)/g);
      //   // RESULT = ["^1^2OptionalFree_&1_&2", "@200"]
      //   RESULT[0] = RESULT[0].split(/([a-zA-Z]+)/);
      //   // RESULT = [["^1^2", "OptionalFree", "_&1_&2"],"@200"]
      //   console.log('RESULT', RESULT);
      //   // ???? egret cannot use .flat() RESULT.flat();
      //   const result = [...RESULT[0], RESULT[1]];
      //   // result = ["^1^2", "OptionalFree", "_&1_&2","@200"]
      //   const re1 = /\^/g;
      //   const re2 = /\&/g;
      //   const re3 = /\@/g;
      //   const re4 = /[a-zA-Z]/g;
      //   // want convert into result = ["萬千", "OptionalFree", "1|2","2元"]
      //   result.forEach(e => {
      //     if (e.search(re1) > -1 && e.length > 0) {
      //       const index = this.generateIndexFromField(e);
      //       // return "萬千"
      //       result[0] = index;
      //     } else if (e.search(re2) > -1 && e.length > 0) {
      //       const Data = this.generateDataFromField(e);
      //       // return "1|2"
      //       result[2] = Data;
      //     } else if (e.search(re3) > -1 && e.length > 0) {
      //       const amount = this.generateAmountFromField(e);
      //       // return "2元"
      //       result[3] = amount;
      //     } else if (e.search(re4) > -1 && e.length > 0) {
      //       const type = this.generateGameTypeFromField(e);
      //       // return "OptionalFree"
      //       result[1] = type;
      //     } else {
      //       console.log('not yet finish');
      //     }
      //   });
      //   return result;
      // }

      // protected generateStringFromNote(notes) {
      //   if (notes.length === 0) {
      //     return;
      //   } else {
      //     const StringArray: any = [];
      //     let StringObject: any = {};
      //     notes.forEach(data => {
      //       /* {
      //       field: '^1^2OptionalFree_&1_&2@200',
      //       count: 1,
      //       multiplier: 1,
      //     }
      //       // return FieldStringObject = ["萬千", "OptionalFree", "1|2","2元"]
      //     */
      //       StringObject.count = data.count;

      //       StringObject.multiplier = data.multiplier;
      //       const FieldStringObject: any = this.generateStringFromField(data.field);
      //       StringObject.betmode = FieldStringObject[3];
      //       StringObject.betitem = FieldStringObject[2];
      //       StringObject.gamemode = `${FieldStringObject[0]} ${FieldStringObject[1]}`;
      //       StringArray.push(StringObject);
      //       StringObject = {};
      //     });
      //     console.log('StringArray', StringArray);
      //     return StringArray;
      //   }
      // }

      // protected generateIndexFromField(IndexString: string) {
      //   const IndexStringArray = IndexString.split(/(?=\^)/g);
      //   // IndexStringArray = ['^1','^2']
      //   let OutputIndexString = '';
      //   IndexStringArray.forEach(indexelement => {
      //     switch (indexelement) {
      //       case '^1':
      //         // replace i18n later
      //         OutputIndexString = OutputIndexString + '萬';
      //         break;
      //       case '^2':
      //         OutputIndexString = OutputIndexString + '千';
      //         break;
      //       case '^3':
      //         OutputIndexString = OutputIndexString + '百';
      //         break;
      //       case '^4':
      //         OutputIndexString = OutputIndexString + '十';
      //         break;
      //       case '^5':
      //         OutputIndexString = OutputIndexString + '個';
      //         break;
      //       default:
      //         console.log('We dont have this pattern');
      //         break;
      //     }
      //   });
      //   return OutputIndexString;
      // }

      // protected generateDataFromField(DataString: string) {
      //   const DataStringArray = DataString.split('_&');
      //   // DataStringArray = ['','1','2']
      //   let OutputDataSting = '';
      //   for (let i = 1; i < DataStringArray.length; i++) {
      //     OutputDataSting = OutputDataSting + ` | ${DataStringArray[i]}`;
      //   }
      //   // TODO:check string length
      //   return OutputDataSting;
      // }

      // protected generateAmountFromField(AmountString: string) {
      //   const AmountStringArray = AmountString.split('@');
      //   // AmountStringArray = ['','200']
      //   const OutputAmountSting = `${parseInt(AmountStringArray[1], 10) / 100} 元`;
      //   return OutputAmountSting;
      // }

      // protected generateGameTypeFromField(TypeString: string) {
      //   return TypeString;
      // }
    }
  }
}
