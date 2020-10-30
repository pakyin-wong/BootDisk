namespace we {
  export namespace lo {
    export class FunBetRoundInfo extends core.BaseEUI {
      protected _txt_thisRound: ui.RunTimeLabel;
      protected _tf_round: eui.Label;
      protected _txt_round: ui.RunTimeLabel;
      protected _tf_drawingRound: eui.Label;
      protected _txt_drawingRound: ui.RunTimeLabel;
      protected _txt_lastRound: ui.RunTimeLabel;

      protected _rdContainer: ui.Group;
      protected _drawingContainer: ui.Group;

      protected _result: eui.DataGroup;

      protected mount() {
        super.mount();

        this._txt_thisRound.renderText = () => `${i18n.t('lo_fun_bettingRound')}`;
        this._txt_round.renderText = () => `${i18n.t('lo_fun_round')}`;
        
        if (env.isMobile) {
          this._txt_drawingRound.renderText = () => `${i18n.t('lo_fun_mobile_drawing')}`;
          this._txt_lastRound.renderText = () => `${i18n.t('lo_fun_mobile_last')}`;
        } else {
          this._txt_drawingRound.renderText = () => `${i18n.t('lo_fun_drawingRound')}`;
          this._txt_lastRound.renderText = () => `${i18n.t('lo_fun_lastRound')}`;
        }

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.onLang, this);
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.onLang, this);
      }

      protected onLang() {
        if (env.language === 'en') {
          this._rdContainer.setChildIndex(this._tf_round, 1);
          this._rdContainer.setChildIndex(this._txt_round, 0);
        } else {
          this._rdContainer.setChildIndex(this._txt_round, 1);
          this._rdContainer.setChildIndex(this._tf_round, 0);
        }
      }

      public update(r) {
        this._tf_round.text = this._tf_drawingRound.text = r.gameroundid;
        if(!env.isMobile) {
          this._txt_lastRound.renderText = () => `${r.gameroundid} ${i18n.t('lo_fun_lastRound')}`;
        }

        for (let i = 0; i < this._result.numChildren; i++) {
          this._result.getChildAt(i)['text'] = r[`ball${i + 1}`] >= 0 ? r[`ball${i + 1}`] : '-';
        }
      }
    }
  }
}
