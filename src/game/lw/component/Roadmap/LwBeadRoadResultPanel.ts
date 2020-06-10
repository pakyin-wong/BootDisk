namespace we {
  export namespace lw {
    export class LwBeadRoadResultPanel extends ui.Panel {
      protected gameRoundID: string;
      protected _gameNumLabel: ui.RunTimeLabel;
      protected _gameInfoLabel: ui.RunTimeLabel;
      protected _beadRoadIcon: LwBeadRoadIcon;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('lw.LwBeadRoadResultPanel');
        this._gameInfoLabel.renderText = () => `${i18n.t('baccarat.clickToSeeVideo')}`;
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        this._beadRoadIcon = new LwBeadRoadIcon(78, 110);
        this._beadRoadIcon.x = 145;
        this._beadRoadIcon.y = 59;
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

      protected destroy() {
        this.removeChild(this._beadRoadIcon);
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        super.destroy();
      }
    }
  }
}
