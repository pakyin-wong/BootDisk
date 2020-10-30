namespace we {
  export namespace ro {
    export class ROBigRoadResultPanel extends ui.Panel {
      protected gameRoundID: string;
      protected _gameLabel: ui.RunTimeLabel;
      protected _gameNumLabel: ui.RunTimeLabel;
      public _gameInfoLabel: ui.RunTimeLabel;
      protected _beadRoadIcon: ROBeadRoadIcon;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('ro.ROBigRoadResultPanelSkin');
        this._gameInfoLabel.renderText = () => `${i18n.t('baccarat.clickToSeeVideo')}`;
        this._gameInfoLabel.visible = false; // true when replay url is available
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        this._beadRoadIcon = new ROBeadRoadIcon(82);
        this._beadRoadIcon.x = 143;
        this._beadRoadIcon.y = 80;
        this.addChild(this._beadRoadIcon);
      }

      public changeLang() {
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

      public setResult(result: any) {
        this.gameRoundID = result.gameRoundID;
        this._beadRoadIcon.setByObject({ v: result.v });
        this.changeLang();
      }

      public destroy() {
        this._beadRoadIcon.dispose();
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }
    }
  }
}
