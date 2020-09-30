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
      // protected b5: eui.Label;
      // protected b4: eui.Label;
      // protected b3: eui.Label;
      // protected b2: eui.Label;
      // protected b1: eui.Label;

      protected mount() {
        super.mount();
        this._txt_thisRound.renderText = () => `${i18n.t('lo_fun_bettingRound')}`;
        this._txt_round.renderText = () => `${i18n.t('lo_fun_round')}`;
        this._txt_drawingRound.renderText = () => `${i18n.t('lo_fun_drawingRound')}`;
        this._txt_lastRound.renderText = () => `${i18n.t('lo_fun_lastRound')}`;

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

        for (let i = 0; i < this._result.numChildren; i++) {
          this._result.getChildAt(i)['text'] = r[`ball${i + 1}`] >= 0 ? r[`ball${i + 1}`] : '-';
        }
        // this.b1.text = r.ball1 >= 0 ? `${r.ball1}` : `-`;
        // this.b2.text = r.ball2 >= 0 ? `${r.ball2}` : `-`;
        // this.b3.text = r.ball3 >= 0 ? `${r.ball3}` : `-`;
        // this.b4.text = r.ball4 >= 0 ? `${r.ball4}` : `-`;
        // this.b5.text = r.ball5 >= 0 ? `${r.ball5}` : `-`;
      }
    }
  }
}
