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
        protected _txt_record_vaildbet: eui.Label;
        protected _txt_record_rolling:eui.Label;
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
        protected _txt_vaildbet: eui.Label;
        protected _txt_rolling: eui.Label;

        protected _toggle: egret.DisplayObject;
        protected _scale: egret.DisplayObject;
        protected _arrow: egret.DisplayObject;

        protected _isOpened = false;

        public constructor() {
          super();
          this.skinName = utils.getSkinByClassname('BetHistoryItem');
        }

        protected mount() {
          this._btn_replay && utils.addButtonListener(this._btn_replay, this.onClickReplay, this);
          this._toggle && utils.addButtonListener(this._toggle, this.onToggle, this);
        }

        protected destroy() {
          this._btn_replay && utils.removeButtonListener(this._btn_replay, this.onClickReplay, this);
          this._toggle && utils.removeButtonListener(this._toggle, this.onToggle, this);
        }

        protected childrenCreated(): void {
          super.childrenCreated();
          this.mount();
          this.addEventListener(egret.Event.ADDED_TO_STAGE, this.mount, this);
          this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
        }

        protected dataChanged(): void {
          this.forceClosed();

          this.setText(this._txt_round, i18n.t('overlaypanel_bethistory_record_round'));
          this.setText(this._txt_bettype, i18n.t('overlaypanel_bethistory_record_bettype'));
          this.setText(this._txt_result, i18n.t('overlaypanel_bethistory_record_result'));
          this.setText(this._txt_vaildbet, i18n.t('overlaypanel_bethistory_record_vaildbet'));
          this.setText(this._txt_rolling, i18n.t('overlaypanel_bethistory_record_rolling'));
          this._btn_replay && this.setText(this._btn_replay['label'], i18n.t('overlaypanel_bethistory_record_replay'));
          
          this.setText(this._txt_record_id, this.data.betid);
          this.setText(this._txt_record_date, utils.formatTime(this.data.datetime.toFixed(0)));
          this.setText(this._txt_record_game, i18n.t('gametype_' + we.core.GameType[this.data.gametype]) + (this.data.tablename ? ' ' + this.data.tablename : ''));
          this.setText(this._txt_record_round, this.data.gameroundid);
          this.setText(this._txt_record_remark, utils.BetHistory.formatRemark(this.data.remark));
          this.setText(this._txt_record_bettype, utils.BetHistory.formatBetType(this.data.gametype, this.data.field));
          this.setText(this._txt_record_betamount, utils.formatNumber(this.data.betamount, true));
          this.setText(this._txt_record_vaildbet, utils.formatNumber(this.data.validbetamount,true));
          this.setText(this._txt_record_rolling, utils.formatNumber(this.data.commission, true));
          this.setText(this._txt_record_orgbalance, utils.formatNumber(this.data.beforebalance, true));
          this.setText(this._txt_record_finbalance, utils.formatNumber(this.data.afterbalance, true));

          this.updateBg();
          utils.BetHistory.updateWinText(this._txt_record_win, this.data.remark, this.data.winamount);
          this.createGameResult(this.data.gametype, this.data.result);
        }

        protected forceOpen() {
          if(this._scale) {
            egret.Tween.removeTweens(this._scale);
            egret.Tween.get(this._scale).set({visible:true,alpha:0}).to({scaleY:1},150).set({alpha:1});
          }
          if(this._arrow) {
            egret.Tween.removeTweens(this._arrow);
            egret.Tween.get(this._arrow).to({rotation:90},150);
          }
        }

        protected forceClosed() {
          if(this._scale) {
            egret.Tween.removeTweens(this._scale);
            this._scale.visible = false;
            this._scale.scaleY = 0;
            this._isOpened = false;
          }
          if(this._arrow) {
            egret.Tween.removeTweens(this._arrow);
            this._arrow.rotation = 0;
          }
        }

        protected onToggle() {
          if(!this._isOpened) {
            this.forceOpen();
            this._isOpened = true;
          } else {
            this.forceClosed();
            this._isOpened = false;
          }
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
