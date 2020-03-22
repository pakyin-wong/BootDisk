namespace we {
  export namespace di {
    export class DiRightPanel extends core.BaseGamePanel {
      protected pageRadioBtn1: eui.RadioButton;
      protected pageRadioBtn2: eui.RadioButton;

      protected activeLine: egret.Shape;

      protected pageStack: eui.ViewStack;

      protected bigLabel: eui.Label;
      protected smallLabel: eui.Label;
      protected tripleLabel: eui.Label;
      protected oddLabel: eui.Label;
      protected evenLabel: eui.Label;
      protected triple2Label: eui.Label;
      protected dice1Label: eui.Label;
      protected dice2Label: eui.Label;
      protected dice3Label: eui.Label;
      protected dice4Label: eui.Label;
      protected dice5Label: eui.Label;
      protected dice6Label: eui.Label;

      protected bigNameLabel: eui.Label;
      protected smallNameLabel: eui.Label;
      protected tripleNameLabel: eui.Label;
      protected oddNameLabel: eui.Label;
      protected evenNameLabel: eui.Label;
      protected triple2NameLabel: eui.Label;

      protected line1: eui.Image;
      protected line2: eui.Image;
      protected line3: eui.Image;
      protected line4: eui.Image;
      protected line5: eui.Image;
      protected line6: eui.Image;

      protected pieOdd: we.di.RankedPieChart;
      protected pieSize: we.di.RankedPieChart;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'di/DiRightPanel');
      }

      public changeLang() {
        this.pageRadioBtn1['labelDisplayDown']['text'] = this.pageRadioBtn1['labelDisplayUp']['text'] = i18n.t('dice.gameStats');
        this.pageRadioBtn2['labelDisplayDown']['text'] = this.pageRadioBtn2['labelDisplayUp']['text'] = i18n.t('dice.dicePercent');

        this.bigNameLabel.text = i18n.t('dice.bigShort');
        this.smallNameLabel.text = i18n.t('dice.smallShort');
        this.tripleNameLabel.text = i18n.t('dice.tripleShort');
        this.oddNameLabel.text = i18n.t('dice.oddShort');
        this.evenNameLabel.text = i18n.t('dice.evenShort');
        this.triple2NameLabel.text = i18n.t('dice.tripleShort');

        this.updateActiveLine(false);
      }

      protected init() {
        this.activeLine = new egret.Shape();
        const gr = this.activeLine.graphics;
        const matrix = new egret.Matrix();
        matrix.createGradientBox(100, 3);

        gr.beginGradientFill(egret.GradientType.LINEAR, [0x52d7ff, 0x5273ef], [1, 1], [0, 255], matrix);
        gr.drawRect(0, 0, 100, 3);
        gr.endFill();
        this.addChild(this.activeLine);
        this.activeLine.y = 331;

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.pageRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.pageRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.pieSize = new we.di.RankedPieChart();
        this.pieSize.x = 476;
        this.pieSize.y = 87;
        this.pieSize.setRanksAndAnimate([30, 15, 55]);
        (this.pageStack.getChildAt(0) as eui.Group).addChild(this.pieSize);

        this.pieOdd = new we.di.RankedPieChart();
        this.pieOdd.x = 104;
        this.pieOdd.y = 212;
        this.pieOdd.setRanksAndAnimate([45, 10, 45]);
        (this.pageStack.getChildAt(0) as eui.Group).addChild(this.pieOdd);

        this.setDiceValues([1, 8, 30, 1, 15, 25]);
        this.setSizeValues({ small: 30, tie: 15, big: 55 });
        this.setOddValues({ odd: 45, tie: 10, even: 45 });

        this.changeLang();
      }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.pageStack.selectedIndex = radio.value;

        this.updateActiveLine(true);
      }

      protected updateActiveLine(useEasing: boolean) {
        const radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2];
        const btn = radioButtons[this.pageStack.selectedIndex];

        radioButtons.forEach(element => {
          if (element === btn) {
            element.currentState = 'upAndSelected';
          } else {
            element.currentState = 'up';
          }
        });
        btn.validateNow();
        const w = btn['labelDisplayDown']['textWidth'];
        const x = btn.x + (btn.width - w) * 0.5;

        egret.Tween.removeTweens(this.activeLine);
        if (useEasing) {
          egret.Tween.get(this.activeLine).to({ x, scaleX: w / 100 }, 300, egret.Ease.quartOut);
        } else {
          this.activeLine.x = x;
          this.activeLine.scaleX = w / 100;
        }
      }

      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.betInfo) {
            this.changeLang();
          }
        }
      }

      public destroy() {
        super.destroy();

        // this.beadRoad.dispose();
        egret.Tween.removeTweens(this.activeLine);
        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }

      public setSizeValues(values: any) {
        this.smallLabel.text = values.small;
        this.bigLabel.text = values.big;
        this.tripleLabel.text = values.tie;
      }

      public setOddValues(values: any) {
        this.oddLabel.text = values.odd;
        this.evenLabel.text = values.even;
        this.triple2Label.text = values.tie;
      }

      // dice1 -6
      public setDiceValues(dices: number[]) {
        const maxDice: number = Math.max.apply(null, dices);
        for (let i = 0; i < dices.length; i++) {
          this['line' + (i + 1)].width = 10 + (120 * dices[i]) / maxDice;
          this['dice' + (i + 1) + 'Label'].text = dices[i];
        }
      }
    }
  }
}
