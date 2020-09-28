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
          utils.addButtonListener(this._btn_replay, this.onClickReplay, this);
        }

        protected destroy() {
          utils.removeButtonListener(this._btn_replay, this.onClickReplay, this);
        }

        protected childrenCreated(): void {
          super.childrenCreated();
          this.mount();
          this.addEventListener(egret.Event.ADDED_TO_STAGE, this.mount, this);
          this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
        }

        protected dataChanged(): void {
          this.setData(this._txt_round, i18n.t('overlaypanel_bethistory_record_round'));
          this.setData(this._txt_bettype, i18n.t('overlaypanel_bethistory_record_bettype'));
          this.setData(this._txt_result, i18n.t('overlaypanel_bethistory_record_result'));
          this.setData(this._btn_replay['label'], i18n.t('overlaypanel_bethistory_record_replay'));
          this.setData(this._txt_record_id, this.data.betid);
          this.setData(this._txt_record_date, utils.formatTime(this.data.datetime.toFixed(0)));
          this.setData(this._txt_record_game, i18n.t('gametype_' + we.core.GameType[this.data.gametype]) + (this.data.tablename ? ' ' + this.data.tablename : ''));
          this.setData(this._txt_record_round, this.data.gameroundid);
          this.setData(this._txt_record_remark, this.formatRemark(this.data.remark));
          this.setData(this._txt_record_bettype, this.formatBetType(this.data.gametype, this.data.field));
          this.setData(this._txt_record_betamount, utils.formatNumber(this.data.betamount, true));
          this.setData(this._txt_record_orgbalance, utils.formatNumber(this.data.beforebalance, true));
          this.setData(this._txt_record_finbalance, utils.formatNumber(this.data.afterbalance, true));

          this.updateBg();
          this.updateWinText(this.data.remark, this.data.winamount);

          this.createGameResult(this.data.gametype, this.data.result);
        }

        protected setData(label: eui.Label, txt) {
          if (label) {
            label.text = txt;
          }
        }

        protected updateBg() {
          if (!this._txt_record_bgcolor) { return; }

          if (env.isMobile) {
            this._txt_hover_color.visible = false;
            this._txt_record_bgcolor.fillColor = 0x4b535b;
            this._txt_record_bgcolor.fillAlpha = this.data.colorIndex === 1 ? 0.3 : 0.5;
          } else {
            this._txt_record_bgcolor.fillColor = this.data.colorIndex === 1 ? 0x14181e : 0x1a1f26;
          }
        }

        protected updateWinText(remark, amt) {
          if (!this._txt_record_win) { return; }

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
          } else if (amt === 0) {
            this._txt_record_win.text = `${utils.formatNumber(this.data.winamount, true)}`;
          } else {
            this._txt_record_win.text = `-${utils.formatNumber(this.data.winamount, true)}`;
          }
        }

        protected onClickReplay(e: egret.Event) {
          if (this.data && this.data.replayurl) {
            window.open(this.data.replayurl, '_blank');
          }
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
          let p: eui.Component;

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
            case we.core.GameType.LO:
              p = new LoResultItem(gameResult);
              break;
            default:
              p = new eui.Component();
              break;
          }

          this._record_result.removeChildren();
          this._record_result.addChild(p);
        }
      }
    }
  }
}
