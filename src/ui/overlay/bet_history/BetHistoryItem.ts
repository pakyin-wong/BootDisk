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
        private _txt_record_bgcolor: eui.Rect;
        private _txt_hover_color: eui.Rect;

        public constructor() {
          super();
          this.skinName = utils.getSkinByClassname('BetHistoryItem');
        }

        protected childrenCreated(): void {
          super.childrenCreated();
          this.$addListener(mouse.MouseEvent.ROLL_OVER, this.onHover, this);
          this.$addListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
          this._btn_replay.$addListener(egret.TouchEvent.TOUCH_TAP, this.onClickReplay, this);

          mouse.setButtonMode(this._btn_replay, true);
        }

        protected dataChanged(): void {
          this._txt_record_id.text = this.data.betid;
          // this._txt_record_date.text = utils.formatTime((this.data.datetime / Math.pow(10, 9)).toFixed(0));
          this._txt_record_date.text = utils.formatTime(this.data.datetime.toFixed(0));
          this._txt_record_game.text = `${i18n.t('gametype_' + we.core.GameType[this.data.gametype])} ${this.data.tablename}`;
          if (env.isMobile) {
            this._txt_hover_color.visible = false;
            this._txt_record_bgcolor.fillColor = 0x4b535b;
            this._txt_record_bgcolor.fillAlpha = this.data.colorIndex === 1 ? 0.3 : 0.5;
          } else {
            this._txt_record_bgcolor.fillColor = this.data.colorIndex === 1 ? 0x14181e : 0x1a1f26;
          }
          this._txt_record_round.text = this.data.gameroundid;
          this._txt_record_remark.text = this.formatRemark(this.data.remark);
          this._txt_record_bettype.text = this.formatBetType(this.data.gametype, this.data.field);
          this._txt_record_betamount.text = utils.formatNumber(this.data.betamount, true);
          this._txt_record_orgbalance.text = utils.formatNumber(this.data.beforebalance, true);
          this._txt_record_finbalance.text = utils.formatNumber(this.data.afterbalance, true);

          this.updateWinText(this.data.remark, this.data.winamount);

          this.createGameResult(this.data.gametype, this.data.result);
        }

        protected updateWinText(remark, amt) {
          switch (remark) {
            case -1:
              this._txt_record_win.textColor = 0xff5555;
              break;
            default:
              this._txt_record_win.textColor = 0x43ce5c;
              break;
          }

          if (amt > 0) {
            this._txt_record_win.text = `+${utils.formatNumber(this.data.winamount, true)}`;
          } else {
            this._txt_record_win.text = `-${utils.formatNumber(this.data.winamount, true)}`;
          }
        }

        protected onHover() {
          this.currentState = 'hover';
        }

        protected onRollOut() {
          this.currentState = 'normal';
        }

        protected onClickReplay(e: egret.Event) {
          if (this.data && this.data.replayurl) {
            window.open(this.data.replayurl, '_blank');
          }
          // window.open('https://www.facebook.com/', '_blank');
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
            case we.core.GameType.BAM:
              return i18n.t(`betfield_baccarat_${bettype.toLowerCase()}`);

            case we.core.GameType.DT:
              return i18n.t(`betfield_dragonTiger_${bettype.toLowerCase()}`);

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
            case we.core.GameType.BAM:
              p = new BaResultItem(gameResult);
              break;
            case we.core.GameType.DT:
              p = new DtResultItem(gameResult);
              break;
            case we.core.GameType.RO:
              p = new RoResultItem(gameResult);
              break;
            case we.core.GameType.ROL:
              p = new RolResultItem(gameResult);
              break;
            case we.core.GameType.DI:
              p = new DiResultItem(gameResult);
              break;
            case we.core.GameType.DIL:
              p = new DilResultItem(gameResult);
              break;
            case we.core.GameType.LW:
              p = new LwResultItem(gameResult);
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
