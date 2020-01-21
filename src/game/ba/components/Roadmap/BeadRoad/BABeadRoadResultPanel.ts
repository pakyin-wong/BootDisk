namespace we {
  export namespace ba {
    export class BaBeadRoadResultPanel extends ui.Panel {
      protected gameRoundID: string;
      protected winType: number;

      protected _winBg: eui.Image;
      protected _gameNumLabel: ui.RunTimeLabel;
      protected _winLabel: ui.RunTimeLabel;
      protected _gameInfoLabel: ui.RunTimeLabel;
      protected _cardHolder: ba.BaBeadRoadResultCardHolder;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkin('BABeadRoadResultPanel');
        this._gameInfoLabel.renderText = () => `${i18n.t('baccarat.clickToSeeVideo')}`;
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        this._gameInfoLabel.visible = false;
      }

      public changeLang() {
        if (this.winType === 1) {
          this._winLabel.text = i18n.t('winType.ba.BANKER');
          this._winBg.texture = RES.getRes('d_ba_betarea_banker_hover_png');
        } else if (this.winType === 2) {
          this._winLabel.text = i18n.t('winType.ba.PLAYER');
          this._winBg.texture = RES.getRes('d_ba_betarea_player_hover_png');
        } else {
          this._winLabel.text = i18n.t('winType.ba.TIE');
          this._winBg.texture = RES.getRes('d_ba_betarea_supersix_tie_hover_png');
        }

        this._gameNumLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameRoundID;
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
