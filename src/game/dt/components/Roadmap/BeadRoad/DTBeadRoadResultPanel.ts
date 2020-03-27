namespace we {
  export namespace dt {
    export class DTBeadRoadResultPanel extends ba.BaBeadRoadResultPanel {
      protected _cardHolder: DTBeadRoadResultCardHolder;

      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('DTBeadRoadResultPanel');
      }

      public changeLang() {
        if (this.winType === 1) {
          this._winLabel.text = i18n.t('winType.dt.TIGER');
          this._winBg.source = 'd_ba_roadmap_record_result_banker_png';
        } else if (this.winType === 2) {
          this._winLabel.text = i18n.t('winType.dt.DRAGON');
          this._winBg.source = 'd_ba_roadmap_record_result_player_png';
        } else {
          this._winLabel.text = i18n.t('winType.dt.TIE');
          this._winBg.source = 'd_ba_roadmap_record_result_tie_png';
        }

        this._gameNumLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameRoundID;
      }
    }
  }
}
