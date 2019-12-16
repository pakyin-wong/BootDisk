namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryItem extends eui.ItemRenderer {
        private _txt_record_id: eui.Label;
        private _txt_record_date: eui.Label;
        private _txt_record_game: eui.Label;
        private _txt_record_round: eui.Label;
        private _txt_record_remark: eui.Label;
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
          this._txt_record_date.text = utils.formatTime(this.data.datetime);
          this._txt_record_game.text = `${i18n.t('gametype_' + we.core.GameType[this.data.gametype])} ${this.data.tablename}`;
          this._txt_record_round.text = this.data.roundid;
          this._txt_record_remark.text = this.formatRemark(this.data.remark);
          this._txt_record_bettype.text = this.formatBetType(this.data.gametype, this.data.field);
          this._txt_record_betamount.text = utils.formatPrice(this.data.betAmount);
          this._txt_record_win.text = utils.formatPrice(this.data.winAmount);
          this._txt_record_orgbalance.text = utils.formatPrice(this.data.prevremaining);
          this._txt_record_finbalance.text = utils.formatPrice(this.data.endremaining);

          this.createGameResult(this.data.gametype, this.data.result);
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

        private formatRemark(remark) {
          switch (remark) {
            case 1:
              return i18n.t('overlaypanel_bethistory_remark_win');
            case -1:
              return i18n.t('overlaypanel_bethistory_remark_lose');
            case 0:
              return i18n.t('overlaypanel_bethistory_remark_ties');
            default:
              return '';
          }
        }

        private formatBetType(gametype, bettype: string) {
          switch (gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAS:
            case we.core.GameType.BAI:
              return i18n.t(`betfield_baccarat_${bettype.toLowerCase()}`);
            default:
              return i18n.t(`betfield_${bettype.toLowerCase()}`);
          }
        }

        private createGameResult(gametype, gameResult) {
          let p: core.BaseEUI;

          switch (gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAS:
            case we.core.GameType.BAI:
              p = new BaResultItem(gameResult);
              break;
            default:
              p = new core.BaseEUI();
              break;
          }

          this._record_result.removeChildren();
          this._record_result.addChild(p);
        }
      }
    }
  }
}