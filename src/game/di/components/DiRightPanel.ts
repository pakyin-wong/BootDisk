namespace we {
  export namespace di {
    export class DiRightPanel extends core.BaseGamePanel {
      protected pageRadioBtn1: eui.RadioButton;
      protected pageRadioBtn2: eui.RadioButton;
      protected _diPie: DiPie;
      protected _diChance: DiChance;

      protected activeLine: egret.Shape;

      protected pageStack: eui.ViewStack;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'DiRightPanel');
      }

      public changeLang() {
        this.pageRadioBtn1['labelDisplayDown']['text'] = this.pageRadioBtn1['labelDisplayUp']['text'] = i18n.t('dice.gameStats');
        this.pageRadioBtn2['labelDisplayDown']['text'] = this.pageRadioBtn2['labelDisplayUp']['text'] = i18n.t('dice.dicePercent');

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

        this.updateStat();

        this.changeLang();
      }

      public updateStat() {
        if (this.tableInfo) {
          const stat = this.tableInfo.gamestatistic;

          if (stat.diOdd) {
            const odd = stat.diOdd.odd;
            const even = stat.diOdd.even;
            const oddTie = stat.diOdd.tie;
            const result = we.utils.stat.toPercentages([odd, even, oddTie]);
            this._diPie.setPieOdd(result);
            this._diPie.setOddValues(stat.diOdd);
          }

          if (stat.diSize) {
            const small = stat.diSize.small;
            const big = stat.diSize.big;
            const sizeTie = stat.diSize.tie;
            const result = we.utils.stat.toPercentages([small, big, sizeTie]);
            this._diPie.setPieSize(result);
            this._diPie.setSizeValues(stat.diSize);
          }

          if (stat.points) {
            const result = we.utils.stat.toPercentages(stat.points);
            this._diChance.setDiceValues(result);
            this._diChance.setMaxWidth(80);
          }
        }
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
    }
  }
}
