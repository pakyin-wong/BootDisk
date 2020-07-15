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

      constructor() {
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
        super.dataChanged();
        this._txtGameMode.text = this.data.gamemode;
        this._txtBetItem.text = this.data.betitem;
        this._txtBetMode.text = `${this.data.betmode} 注`;
        this._txtNoteCount.text = this.data.count;
        this._txtMultiplier.text = this.data.multiplier;
        this._txtTotalBet.text = `$ ${Math.round(this.data.multiplier * parseInt(this.data.betmode, 10) * this.data.count * 100) / 100}`;
      }

      protected addListeners() {
        this._btnDelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDelect, this);
      }

      protected removeListeners() {
        this._btnDelect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDelect, this);
      }

      protected onClickDelect() {
        console.log('SSCBETNOTEITEM :: onClickDelect', this.data);
      }
    }
  }
}
