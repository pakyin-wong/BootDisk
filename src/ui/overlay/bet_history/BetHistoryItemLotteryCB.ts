namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryItemLotteryCB extends eui.ItemRenderer {
        protected _txt_record_id: eui.Label;
        protected _txt_record_date: eui.Label;
        protected _txt_record_game: eui.Label;
        protected _txt_record_round: eui.Label;
        protected _txt_record_totalRound: eui.Label;
        protected _txt_record_currRound: eui.Label;
        protected _txt_record_betamount: eui.Label;
        protected _txt_record_remark: eui.Label;

        protected _txt_bettype: eui.Label;
        protected _txt_record_bettype: eui.Label;
        protected _txt_betgroup: eui.Label;
        protected _txt_record_betgroup: eui.Label;
        protected _txt_betfield: eui.Label;
        protected _txt_record_betfield: eui.Label;
        protected _txt_autostop: eui.Label;
        protected _txt_record_autostop: eui.Label;
        protected _txt_cancelled: eui.Label;
        protected _txt_record_cancelled: eui.Label;
        protected _txt_finAmount: eui.Label;
        protected _txt_record_finAmount: eui.Label;
        protected _txt_record_bgcolor: eui.Rect;

        public constructor() {
          super();
          this.skinName = utils.getSkinByClassname('BetHistoryItemLotteryCB');
        }

        protected mount() {}

        protected destroy() {}

        protected childrenCreated(): void {
          super.childrenCreated();
          this.mount();
          this.addEventListener(egret.Event.ADDED_TO_STAGE, this.mount, this);
          this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
        }

        protected dataChanged(): void {
          this._txt_record_bgcolor.fillColor = this.data.colorIndex === 1 ? 0x14181e : 0x1a1f26;
        }
      }
    }
  }
}
