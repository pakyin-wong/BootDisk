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

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('SSCBetNoteItem');
        this.addListeners();
      }
      // TradNoteData {
      //   public field: string; // field consist of several information: Bet type, bet per note and bet detail
      //   public count: number; // number of note corresponding to the field
      //   public multiplier: number;
      // }
      protected dataChanged(): void {
        this.generateStringFromField(this.data.field);
      }

      protected addListeners() {
        this._btnDelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDelect, this);
      }

      protected removeListeners() {
        this._btnDelect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDelect, this);
      }

      protected generateStringFromField(field: string) {
        // example:^1^2OptionalFree_&1_&2@200
        const result: any = field.split(/(?=@)/g);
        // result = ["^1^2OptionalFree_&1_&2", "@200"]
        result[0] = result[0].split(/([a-zA-Z]+)/);
        // result = [["^1^2", "OptionalFree", "_&1_&2"],"@200"]
        result.flat();
        // result = ["^1^2", "OptionalFree", "_&1_&2","@200"]
        const re1 = /\^/g;
        const re2 = /\&/g;
        const re3 = /\@/g;
        const re4 = /\([a-zA-Z]+)/g;

        result.forEach(string => {
          if (string.search(re1) > -1 && string.length > 0) {
            this.generateIndexFromField(string);
          } else if (string.search(re2) > -1 && string.length > 0) {
            this.generateDataFromField(string);
          } else if (string.search(re3) > -1 && string.length > 0) {
            this.generateAmountFromField(string);
          } else if (string.search(re4) > -1 && string.length > 0) {
            this.generateGameTypeFromField(string);
          } else {
            console.log('not yet finish');
          }
        });
      }

      protected generateIndexFromField(IndexString: string) {}

      protected generateDataFromField(DataString: string) {}

      protected generateAmountFromField(AmountString: string) {}

      protected generateGameTypeFromField(TypeString: string) {}

      protected onClickDelect() {
        console.log('SSCBETNOTEITEM :: onClickDelect');
      }
    }
  }
}
