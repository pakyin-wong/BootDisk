namespace we {
  export namespace di {
    export class DiBigRoadResultPanel extends ui.Panel {
      protected gameRoundID: string;
      protected _gameNumLabel: ui.RunTimeLabel;
      protected _gameInfoLabel: ui.RunTimeLabel;
      protected dice1: eui.Image;
      protected dice2: eui.Image;
      protected dice3: eui.Image;
      protected sizeBg: eui.Image;
      protected oddBg: eui.Image;
      protected tripleBg: eui.Image;
      protected sizeLabel: ui.RunTimeLabel;
      protected oddLabel: ui.RunTimeLabel;
      protected tripleLabel: ui.RunTimeLabel;
      protected sumLabel: ui.RunTimeLabel;

      protected diceSize: number;
      protected diceOdd: number;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('di.DiBigRoadResultPanelSkin');
        this._gameInfoLabel.renderText = () => `${i18n.t('baccarat.clickToSeeVideo')}`;
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        this._gameInfoLabel.visible = false;
      }

      public changeLang() {
        this._gameNumLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameRoundID;
        if (this.diceSize === 1) {
          // small
          this.sizeLabel.text = i18n.t('dice.smallShort');
        } else {
          // big
          this.sizeLabel.text = i18n.t('dice.bigShort');
        }

        if (this.diceOdd === 1) {
          // odd
          this.oddLabel.text = i18n.t('dice.oddShort');
        } else {
          // even
          this.oddLabel.text = i18n.t('dice.evenShort');
        }

        this.tripleLabel.text = i18n.t('dice.tripleShort');
      }

      constructor() {
        super();
      }

      public setResult(result: any) {
        const dice = result.dice;
        const total = dice.reduce((a, b) => a + b, 0);
        const tie = dice.every((val, i, arr) => val === arr[0]) ? 1 : 0;
        this.diceSize = total > 10 ? 2 : 1;
        this.diceOdd = total % 2 ? 1 : 2;

        // { gameRoundID: 'cde345', dice1:1, dice2:2, dice3:3, total:6, odd:2, size:2, tie:0, video: 'null' }
        this.gameRoundID = result.gameRoundID;
        this.dice1.source = 'd_sic_history_lv3_dice-' + dice[0] + '_png';
        this.dice2.source = 'd_sic_history_lv3_dice-' + dice[1] + '_png';
        this.dice3.source = 'd_sic_history_lv3_dice-' + dice[2] + '_png';

        this.sumLabel.text = total + '';
        if (tie === 1) {
          this.tripleLabel.visible = true;
          this.tripleBg.visible = true;

          this.sizeLabel.visible = false;
          this.sizeBg.visible = false;
          this.oddLabel.visible = false;
          this.oddBg.visible = false;
        } else {
          this.tripleLabel.visible = false;
          this.tripleBg.visible = false;

          this.sizeLabel.visible = true;
          this.sizeBg.visible = true;
          this.oddLabel.visible = true;
          this.oddBg.visible = true;

          if (this.diceSize === 1) {
            // small
            this.sizeBg.source = 'd_ba_betarea_player_hover_png';
          } else {
            // big
            this.sizeBg.source = 'd_ba_betarea_bankerpair_hover_png';
          }

          if (this.diceOdd === 1) {
            // odd
            this.oddBg.source = 'd_ba_betarea_player_hover_png';
          } else {
            // even
            this.oddBg.source = 'd_ba_betarea_bankerpair_hover_png';
          }
        }

        this.changeLang();
      }
    }
  }
}
