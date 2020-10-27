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
        this.pool = new Pool('dil.PoolSkin');
        this.pool.verticalCenter = 0;
        this.pool.horizontalCenter = 0;
        this._page1.addChild(this.pool);
      }

      protected initPage2() {
        this.history = new History('dil.HistorySkin');
        this.history.verticalCenter = 0;
        this.history.horizontalCenter = 0;
        this._page2.addChild(this.history);
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

        this.initPage1();
        this.initPage2();
        this.updateStat();

        this.changeLang();
      }

      public updateStat() {
        if (!this.tableInfo) {
          return;
        }
        console.log('updateStat::this.tableInfo.gamestatistic',this.tableInfo.gamestatistic)
        const stat = this.tableInfo.gamestatistic;
        if (this.history) {
          this.history.updateStat(stat);
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
            if (this.pool) {
              console.log('RightPanel::update:: this.tableInfo',this.tableInfo)
              this.pool.setValue(this.tableInfo);
            }
          }
        }
      }

      public destroy() {
        super.destroy();

        egret.Tween.removeTweens(this.activeLine);
        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }
    }
  }
}
