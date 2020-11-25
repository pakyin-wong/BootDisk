namespace we {
  export namespace di {
    export class DiBigRoadResultPanel extends ui.Panel {
      protected gameRoundID: string;
      protected round:number;
      protected shoe:number;
      protected _gameLabel: ui.RunTimeLabel;
      protected _gameNumLabel: ui.RunTimeLabel;
      public _gameInfoLabel: ui.RunTimeLabel;
      protected _gameShoeTextLabel: ui.RunTimeLabel;
      protected _gameShoeLabel: ui.RunTimeLabel;
      protected dice1: eui.Image;
      protected dice2: eui.Image;
      protected dice3: eui.Image;
      protected sizeBg: ui.RoundRectShape;
      protected oddBg: ui.RoundRectShape;
      protected tripleBg: ui.RoundRectShape;
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
        this._gameInfoLabel.visible = false; // true when replay url is available
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      public changeLang() {
        if (this._gameLabel) {
          this._gameLabel.text = i18n.t('overlaypanel_bethistory_recordtab_gameno');
          this._gameNumLabel.text = this.gameRoundID;
        } else {
          this._gameLabel.text = `${i18n.t('overlaypanel_bethistory_recordtab_gameno') + this.gameRoundID}`;
        }
        if(this._gameShoeTextLabel){
          this._gameShoeTextLabel.text = i18n.t('overlaypanel_bethistory_recordtab_shoe');
          this._gameShoeLabel.text = this.shoe+"-"+this.round;
        }
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
        this.round = result.round;
        this.shoe = result.shoe;
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
            this.sizeBg.setRoundRectStyle(152, 42, { tl: 21, tr: 21, br: 21, bl: 21 }, '0x2e95ff,0x305acc,270', 1, 0);
          } else {
            // big
            this.sizeBg.setRoundRectStyle(152, 42, { tl: 21, tr: 21, br: 21, bl: 21 }, '0xff5b67,0xad3737,270', 1, 0);
          }

          if (this.diceOdd === 1) {
            // odd
            this.oddBg.setRoundRectStyle(152, 42, { tl: 21, tr: 21, br: 21, bl: 21 }, '0x2e95ff,0x305acc,270', 1, 0);
          } else {
            // even
            this.oddBg.setRoundRectStyle(152, 42, { tl: 21, tr: 21, br: 21, bl: 21 }, '0xff5b67,0xad3737,270', 1, 0);
          }
        }

        this.changeLang();
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }
    }
  }
}
