namespace we {
  export namespace ba {
    export class BaBeadRoadResultPanel extends ui.Panel {
      protected gameRoundID: string;
      protected winType: number;

      protected _winBg: eui.Image;
      protected _gameLabel: ui.RunTimeLabel;
      protected _gameNumLabel: ui.RunTimeLabel;
      protected _winLabel: ui.RunTimeLabel;
      public _gameInfoLabel: ui.RunTimeLabel;
      protected _cardHolder: ba.BaBeadRoadResultCardHolder;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('BABeadRoadResultPanelSkin');
        this._gameInfoLabel.renderText = () => `${i18n.t('baccarat.clickToSeeVideo')}`;
        this._gameInfoLabel.visible = false; //true when replay url is available
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      public changeLang() {
        if (this.winType === 1) {
          this._winLabel.text = i18n.t('winType.ba.BANKER');
          this._winBg.source = 'd_ba_roadmap_record_result_banker_png';
        } else if (this.winType === 2) {
          this._winLabel.text = i18n.t('winType.ba.PLAYER');
          this._winBg.source = 'd_ba_roadmap_record_result_player_png';
        } else {
          this._winLabel.text = i18n.t('winType.ba.TIE');
          this._winBg.source = 'd_ba_roadmap_record_result_tie_png';
        }

        if (this._gameLabel) {
          this._gameLabel.text = i18n.t('overlaypanel_bethistory_recordtab_round');
          this._gameNumLabel.text = this.gameRoundID;
        } else {
          this._gameLabel.text = `${i18n.t('overlaypanel_bethistory_recordtab_round') + this.gameRoundID}`;
        }
      }

      constructor() {
        super();
      }
      /*
            GameRoundResult {
              string gameRoundID
              string a1             // Card slot Banker 1
              string a2             // Card slot Banker 2
              string a3              // Card slot Banker 3
              string b1              // Card slot Player 1
              string b2             // Card slot Player 2
              string b3             // Card slot Player 3
              bool wina             // Result of banker. if wina=true and winb=false, banker wins. if wina=true and winb=true, tie.
              bool winb             // Result of player. if wina=false and winb=true, player wins. if wina =true and winb=true, tie.
              int32 bv             // Card value for banker
              int32 pv             // Card value for player
              bool bp             // true when banker pair
              bool pp             // true when player pair
            }
      */

      public setCardResult(rslt: GameData) {
        this.gameRoundID = rslt.gameroundid;
        this.winType = rslt.wintype;
        this._cardHolder.updateResult(rslt);
        this.changeLang();
      }
    }
  }
}
