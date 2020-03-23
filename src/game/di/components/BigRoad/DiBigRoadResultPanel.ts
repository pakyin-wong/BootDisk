namespace we {
  export namespace di {
    export class DiBigRoadResultPanel extends ui.Panel {
      protected gameRoundID: string;
      protected _gameNumLabel: ui.RunTimeLabel;
      protected _gameInfoLabel: ui.RunTimeLabel;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('di.DiBigRoadResultPanelSkin');
        this._gameInfoLabel.renderText = () => `${i18n.t('baccarat.clickToSeeVideo')}`;
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

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

        this.changeLang();
      }
    }
  }
}
