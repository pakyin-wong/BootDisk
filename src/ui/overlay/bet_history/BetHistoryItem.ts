namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryItem extends eui.ItemRenderer {
        protected _txt_record_id: eui.Label;
        protected _txt_record_date: eui.Label;
        protected _txt_record_game: eui.Label;
        protected _txt_record_round: eui.Label;
        protected _txt_record_remark: eui.Label;
        protected _txt_record_bettype: eui.Label;
        protected _txt_record_betamount: eui.Label;
        protected _txt_record_win: eui.Label;
        protected _txt_record_orgbalance: eui.Label;
        protected _txt_record_finbalance: eui.Label;
        protected _record_result: egret.DisplayObjectContainer;
        protected _btn_replay: egret.DisplayObject;
        protected _txt_record_bgcolor: eui.Rect;
        protected _txt_hover_color: eui.Rect;

        protected _txt_round: eui.Label;
        protected _txt_bettype: eui.Label;
        protected _txt_result: eui.Label;

        public constructor() {
          super();
          this.skinName = utils.getSkinByClassname('BetHistoryItem');
        }

        protected mount() {
          this._btn_replay && utils.addButtonListener(this._btn_replay, this.onClickReplay, this);
        }

        protected destroy() {
          this._btn_replay && utils.removeButtonListener(this._btn_replay, this.onClickReplay, this);
        }

        protected childrenCreated(): void {
          super.childrenCreated();
          this.mount();
          this.addEventListener(egret.Event.ADDED_TO_STAGE, this.mount, this);
          this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
        }

        protected dataChanged(): void {
          this.setText(this._txt_round, i18n.t('overlaypanel_bethistory_record_round'));
          this.setText(this._txt_bettype, i18n.t('overlaypanel_bethistory_record_bettype'));
          this.setText(this._txt_result, i18n.t('overlaypanel_bethistory_record_result'));
          this._btn_replay && this.setText(this._btn_replay['label'], i18n.t('overlaypanel_bethistory_record_replay'));
          
          this.setText(this._txt_record_id, this.data.betid);
          this.setText(this._txt_record_date, utils.formatTime(this.data.datetime.toFixed(0)));
          this.setText(this._txt_record_game, i18n.t('gametype_' + we.core.GameType[this.data.gametype]) + (this.data.tablename ? ' ' + this.data.tablename : ''));
          this.setText(this._txt_record_round, this.data.gameroundid);
          this.setText(this._txt_record_remark, utils.BetHistory.formatRemark(this.data.remark));
          this.setText(this._txt_record_bettype, utils.BetHistory.formatBetType(this.data.gametype, this.data.field));
          this.setText(this._txt_record_betamount, utils.formatNumber(this.data.betamount, true));
          this.setText(this._txt_record_orgbalance, utils.formatNumber(this.data.beforebalance, true));
          this.setText(this._txt_record_finbalance, utils.formatNumber(this.data.afterbalance, true));

          this.updateBg();
          this.updateWinText(this.data.remark, this.data.winamount);
          this.createGameResult(this.data.gametype, this.data.result);
        }

        protected setText(label: eui.Label, txt) {
          if (label) {
            label.text = txt;
          }
        }

        protected updateBg() {
          if (!this._txt_record_bgcolor) {
            return;
          }

          if (env.isMobile) {
            this._txt_hover_color.visible = false;
            this._txt_record_bgcolor.fillColor = 0x4b535b;
            this._txt_record_bgcolor.fillAlpha = this.data.colorIndex === 1 ? 0.3 : 0.5;
          } else {
            this._txt_record_bgcolor.fillColor = this.data.colorIndex === 1 ? 0x14181e : 0x1a1f26;
          }
        }

        protected updateWinText(remark, amt) {
          if (!this._txt_record_win) {
            return;
          }

          switch (remark) {
            case -1:
              this._txt_record_win.textColor = 0xff5555;
              break;
            default:
              this._txt_record_win.textColor = 0x43ce5c;
              break;
          }
          if (amt > 0) {
            this.setText(this._txt_record_win, `+${utils.formatNumber(Math.abs(this.data.winamount), true)}`);
          } else if (amt === 0) {
            this.setText(this._txt_record_win, `${utils.formatNumber(Math.abs(this.data.winamount), true)}`);
          } else {
            this.setText(this._txt_record_win, `-${utils.formatNumber(Math.abs(this.data.winamount), true)}`);
          }
        }

        protected onClickReplay(e: egret.Event) {
          if (this.data && this.data.replayurl) {
            window.open(this.data.replayurl, '_blank');
          }
        }

        private createGameResult(gametype, gameResult) {
          if (!this._record_result) {
            return;
          }
          let p: eui.Component = utils.BetHistory.createGameResult(gametype,gameResult);
          this._record_result.removeChildren();
          this._record_result.addChild(p);
        }
      }
    }
  }
}
