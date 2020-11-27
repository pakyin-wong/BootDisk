namespace we {
  export namespace lw {
    export class LwBeadRoadResultPanel extends ui.Panel {
      protected gameRoundID: string;
      protected round: number;
      protected shoe: number;
      protected _gameLabel: ui.RunTimeLabel;
      protected _gameNumLabel: ui.RunTimeLabel;
      public _gameInfoLabel: ui.RunTimeLabel;
      protected _gameShoeTextLabel: ui.RunTimeLabel;
      protected _gameShoeLabel: ui.RunTimeLabel;
      protected _beadRoadIcon: LwBeadRoadIcon;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('lw.LwBeadRoadResultPanel');
        this._gameInfoLabel.renderText = () => `${i18n.t('baccarat.clickToSeeVideo')}`;
        this._gameInfoLabel.visible = false; // true when replay url is available
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        this._beadRoadIcon = new LwBeadRoadIcon(78, 110);
        this._beadRoadIcon.x = 145;
        this._beadRoadIcon.y = 59;
        this.addChild(this._beadRoadIcon);
      }

      public changeLang() {
        if (this._gameLabel) {
          this._gameLabel.text = i18n.t('overlaypanel_bethistory_recordtab_round');
          this._gameNumLabel.text = this.gameRoundID;
        } else {
          this._gameLabel.text = `${i18n.t('overlaypanel_bethistory_recordtab_round') + this.gameRoundID}`;
        }
        if (this._gameShoeTextLabel) {
          this._gameShoeTextLabel.text = i18n.t('overlaypanel_bethistory_recordtab_shoe');
          this._gameShoeLabel.text = this.shoe + '-' + this.round;
        }
      }

      constructor() {
        super();
      }

      public setResult(result: any) {
        this.gameRoundID = result.gameRoundID;
        this.round = result.round;
        this.shoe = result.shoe;
        this._beadRoadIcon.setByObject({ v: result.v });
        this.changeLang();
      }

      protected destroy() {
        this._beadRoadIcon.dispose();
        this.removeChild(this._beadRoadIcon);
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        super.destroy();
      }
    }
  }
}
