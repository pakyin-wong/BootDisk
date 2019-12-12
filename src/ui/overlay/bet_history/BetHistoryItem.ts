namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryItem extends eui.ItemRenderer {
        private _txt_record_id: eui.Label;
        private _txt_record_date: eui.Label;
        private _txt_record_game: eui.Label;
        private _txt_record_round: eui.Label;
        private _txt_record_remake: eui.Label;
        private _txt_record_bettype: eui.Label;
        private _txt_record_betamount: eui.Label;
        private _txt_record_win: eui.Label;
        private _txt_record_orgbalance: eui.Label;
        private _txt_record_finbalance: eui.Label;
        private _record_result: egret.DisplayObjectContainer;
        private _btn_replay: egret.DisplayObject;

        public constructor() {
          super();
          this.skinName = utils.getSkin('overlay/BetHistoryItem');
        }

        protected childrenCreated(): void {
          super.childrenCreated();
          this.$addListener(mouse.MouseEvent.ROLL_OVER, this.onHover, this);
          this.$addListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
          this._btn_replay.$addListener(egret.TouchEvent.TOUCH_TAP, this.onClickReplay, this);

          mouse.setButtonMode(this._btn_replay, true);
        }

        protected dataChanged(): void {
          this._txt_record_id.text = this.data.id;
          this._txt_record_date.text = this.data.datetime;
          this._txt_record_game.text = this.data.tablename;
          this._txt_record_round.text = this.data.roundid;
          this._txt_record_remake.text = this.data.remark;
          this._txt_record_bettype.text = this.data.field;
          this._txt_record_betamount.text = this.data.betAmount;
          this._txt_record_win.text = this.data.winAmount;
          this._txt_record_orgbalance.text = this.data.prevremaining;
          this._txt_record_finbalance.text = this.data.endremaining;

          this._record_result.removeChildren();
          this._record_result.addChild(new betHistory.BaResultItem({}));
        }

        protected onHover() {
          this.currentState = 'hover';
        }

        protected onRollOut() {
          this.currentState = 'normal';
        }

        protected onClickReplay(e: egret.Event) {
          window.open('https://www.facebook.com/', '_blank');
        }
      }
    }
  }
}
