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
        this._gameInfoLabel.renderText = () => `${i18n.t('baccarat.clickToSeeVideo')}`;
        this._gameInfoLabel.visible = false; //true when replay url is available
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

        if (this._gameLabel) {
          this._gameLabel.text = i18n.t('overlaypanel_bethistory_recordtab_round');
          this._gameNumLabel.text = this.gameRoundID;
        } else {
          this._gameLabel.text = `${i18n.t('overlaypanel_bethistory_recordtab_round') + this.gameRoundID}`;
        }
      }
    }
  }
}
