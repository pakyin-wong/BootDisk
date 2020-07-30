namespace we {
  export namespace dil {
    export class RightPanel extends core.BaseGamePanel {
      public pool: Pool;
      public history: History;

      protected pageRadioBtn1: eui.RadioButton;
      protected pageRadioBtn2: eui.RadioButton;
      protected _page1: eui.Group;
      protected _page2: eui.Group;

      protected activeLine: egret.Shape;

      protected pageStack: eui.ViewStack;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'DilRightPanel');
      }

      public changeLang() {
        this.pageRadioBtn1['labelDisplayDown']['text'] = this.pageRadioBtn1['labelDisplayUp']['text'] = i18n.t('dice.livePool');
        this.pageRadioBtn2['labelDisplayDown']['text'] = this.pageRadioBtn2['labelDisplayUp']['text'] = i18n.t('dice.resultStats');

        this.updateActiveLine(false);
      }

      protected initPage1() {
        const pool = new Pool('dil.PoolSkin');
        pool.verticalCenter = 0;
        pool.horizontalCenter = 0;
        /*
        const maskedHorizontalBarChart = new we.di.MaskedHorizontalBarChart();

        maskedHorizontalBarChart.x = 20;
        maskedHorizontalBarChart.y = 10;
        maskedHorizontalBarChart.setChartStyles(
          [
            [[0xd7d93b, 0xd7d93b], [1, 1], [0, 255], 0],
            [[0xd98c20, 0xd98c20], [1, 1], [0, 255], 0],
            [[0xd94341, 0xd94341], [1, 1], [0, 255], 0],
            [[0xd93b96, 0xd93b96], [1, 1], [0, 255], 0],
            [[0xa73ad9, 0xa73ad9], [1, 1], [0, 255], 0],
            [[0x1c75d9, 0x1c75d9], [1, 1], [0, 255], 0],
            [[0x3cd9cd, 0x3cd9cd], [1, 1], [0, 255], 0],
            [[0x36d943, 0x36d943], [1, 1], [0, 255], 0],
          ],
          118,
          12,
          20,
          6,
          0x313538,
          0x1b1f22
        );
        maskedHorizontalBarChart.setRanksAndAnimate([0.1, 0.2, 0.4, 0.8, 0.8, 0.4, 0.2, 0.1]);
        this._page1.addChild(maskedHorizontalBarChart);

        const maskedHorizontalBarChart2 = new we.di.MaskedHorizontalBarChart();
        maskedHorizontalBarChart2.x = 150;
        maskedHorizontalBarChart2.y = 10;
        maskedHorizontalBarChart2.setChartStyles(
          [
            [[0x36d943, 0x36d943], [1, 1], [0, 255], 0],
            [[0x3cd9cd, 0x3cd9cd], [1, 1], [0, 255], 0],
            [[0x1c75d9, 0x1c75d9], [1, 1], [0, 255], 0],
            [[0xa73ad9, 0xa73ad9], [1, 1], [0, 255], 0],
            [[0xd93b96, 0xd93b96], [1, 1], [0, 255], 0],
            [[0xd94341, 0xd94341], [1, 1], [0, 255], 0],
            [[0xd98c20, 0xd98c20], [1, 1], [0, 255], 0],
            [[0xd7d93b, 0xd7d93b], [1, 1], [0, 255], 0],
          ],
          118,
          12,
          20,
          6,
          0x313538,
          0x1b1f22
        );
        maskedHorizontalBarChart2.setRanksAndAnimate([0.1, 0.2, 0.4, 0.8, 0.8, 0.4, 0.2, 0.1]);
        */
        this._page1.addChild(pool);
      }

      protected initPage2() {
        const history = new History('dil.HistorySkin');
        history.verticalCenter = 0;
        history.horizontalCenter = 0;
        this._page2.addChild(history);
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

        this.initPage1();
        this.initPage2();

      }

      public updateStat() {
        if (this.tableInfo) {
          const stat = this.tableInfo.gamestatistic;

          if (stat.diOdd) {
            const odd = stat.diOdd.odd;
            const even = stat.diOdd.even;
            const oddTie = stat.diOdd.tie;
            const result = we.utils.stat.toPercentages([odd, even, oddTie]);
          }

          if (stat.diSize) {
            const small = stat.diSize.small;
            const big = stat.diSize.big;
            const sizeTie = stat.diSize.tie;
            const result = we.utils.stat.toPercentages([small, big, sizeTie]);
          }

          if (stat.points) {
            const result = we.utils.stat.toPercentages(stat.points);
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
