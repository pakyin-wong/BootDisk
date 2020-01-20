namespace we {
  export namespace dt {
    export class DTBeadRoadResultPanel extends ba.BaBeadRoadResultPanel {
      protected _cardHolder: DTBeadRoadResultCardHolder;

      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkin('dt/DTBeadRoadResultPanel');
      }

      public changeLang() {
        if (this.winType === 1) {
          this._winLabel.text = i18n.t('winType.dt.TIGER');
          this._winBg.texture = RES.getRes('d_ba_betarea_banker_hover_png');
        } else if (this.winType === 2) {
          this._winLabel.text = i18n.t('winType.dt.DRAGON');
          this._winBg.texture = RES.getRes('d_ba_betarea_player_hover_png');
        } else {
          this._winLabel.text = i18n.t('winType.dt.TIE');
          this._winBg.texture = RES.getRes('d_ba_betarea_supersix_tie_hover_png');
        }

        this._gameNumLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameRoundID;
      }
    }
  }
}
