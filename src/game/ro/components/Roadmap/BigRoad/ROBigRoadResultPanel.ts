namespace we {
  export namespace ro {
    export class ROBigRoadResultPanel extends ui.Panel {
      protected gameRoundID: string;
      protected _gameNumLabel: ui.RunTimeLabel;
      protected _gameInfoLabel: ui.RunTimeLabel;
      protected _beadRoadIcon: ROBeadRoadIcon;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('ro.ROBigRoadResultPanelSkin');
        this._gameInfoLabel.renderText = () => `${i18n.t('baccarat.clickToSeeVideo')}`;
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        this._beadRoadIcon = new ROBeadRoadIcon(82);
        this._beadRoadIcon.x = 143;
        this._beadRoadIcon.y = 80;
        this.addChild(this._beadRoadIcon);

        this._gameInfoLabel.visible = false;
      }

      public changeLang() {
        this._gameNumLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameRoundID;
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
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }
    }
  }
}
