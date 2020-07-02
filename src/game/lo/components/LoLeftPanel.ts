namespace we {
  export namespace lo {
    export class LoLeftPanel extends core.BaseGamePanel {
      public dtBigRoad: LoDtBigRoad;
      public sizeBigRoad: LoSizeBigRoad;
      public oddBigRoad: LoOddBigRoad;

      protected _btn_roadmap: ui.RoundRectButton;
      protected _btn_analysis: ui.RoundRectButton;

      protected _border: ui.RoundRectShape;

      protected _chipLayer: ui.ChipLayer;

      protected road1Btn1: eui.RadioButton;
      protected road1Btn2: eui.RadioButton;
      protected road1Btn3: eui.RadioButton;
      protected road1Btn4: eui.RadioButton;
      protected road1Btn5: eui.RadioButton;

      protected road2Btn1: eui.RadioButton;
      protected road2Btn2: eui.RadioButton;
      protected road2Btn3: eui.RadioButton;
      protected road2Btn4: eui.RadioButton;
      protected road2Btn5: eui.RadioButton;

      protected road3Btn1: eui.RadioButton;
      protected road3Btn2: eui.RadioButton;
      protected road3Btn3: eui.RadioButton;
      protected road3Btn4: eui.RadioButton;
      protected road3Btn5: eui.RadioButton;
      protected road3Btn6: eui.RadioButton;
      protected road3Btn7: eui.RadioButton;
      protected road3Btn8: eui.RadioButton;
      protected road3Btn9: eui.RadioButton;
      protected road3Btn10: eui.RadioButton;

      protected analysisBtn1: eui.RadioButton;
      protected analysisBtn2: eui.RadioButton;
      protected analysisBtn3: eui.RadioButton;
      protected analysisBtn4: eui.RadioButton;
      protected analysisBtn5: eui.RadioButton;

      protected activeLine: egret.Shape;

      protected pageStack: eui.ViewStack;
      protected roadStack: eui.ViewStack;
      protected analysisStack: eui.ViewStack;

      protected _radioButtons: eui.RadioButton[];

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'LoLeftPanel');
      }

      public changeLang() {
        this._btn_roadmap.label.renderText = () => `${i18n.t('overlaypanel_bethistory_today')}`;
        this._btn_analysis.label.renderText = () => `${i18n.t('overlaypanel_bethistory_today')}`;

        //this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;

        //this.pageRadioBtn1['labelDisplayDown']['text'] = this.pageRadioBtn1['labelDisplayUp']['text'] = i18n.t('roulette.hotColdNumber');
        //this.updateActiveLine(false);
      }

      public set chipLayer(value: ui.ChipLayer) {
        this._chipLayer = value;
      }

      protected setRadioButtons() {
        //this._radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2, this.pageRadioBtn3];
        this._radioButtons = [];
      }

      protected init() {
        this.setRadioButtons();


        // add bead road to page stack 2
        const page2Group = this.pageStack.getChildAt(1) as eui.Group;
        //page2Group.addChild(this.beadRoad);

        this.dtBigRoad = new LoDtBigRoad(29, 35);
        this.dtBigRoad.y = 60;
        this.dtBigRoad.setGridCorners({ tl: 0, tr: 0, br: 12, bl: 12 });
        this.dtBigRoad.scaleX = 1024 / 1015;
        this.dtBigRoad.scaleY = 212 / 210;

        // add road to road stack 1
        const road1Group = this.roadStack.getChildAt(0) as eui.Group;
        road1Group.addChild(this.dtBigRoad);

        this.sizeBigRoad = new LoSizeBigRoad(19, 35);
        this.sizeBigRoad.scaleX = 668 / 666;

        // add road to road stack 2
        const road2Group = this.roadStack.getChildAt(1) as eui.Group;
        road2Group.addChild(this.sizeBigRoad);

        this.oddBigRoad = new LoOddBigRoad(19, 35);
        this.oddBigRoad.scaleX = 668 / 666;

        // add road to road stack 3
        const road3Group = this.roadStack.getChildAt(2) as eui.Group;
        road3Group.addChild(this.oddBigRoad);

        // this.beadRoad.x = 0;
        // this.beadRoad.y = 44;
        // this.beadRoad.scaleX = 690 / 689;
        // this.beadRoad.scaleY = 690 / 689;
        // this.addChild(this.beadRoad);

        // this.switchModeButton.touchEnabled = true;
        // this.switchModeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchModeClick, this);
        // this.addChild(this.switchModeButton);

        this.activeLine = new egret.Shape();
        const gr = this.activeLine.graphics;
        const matrix = new egret.Matrix();
        matrix.createGradientBox(100, 3);

        gr.beginGradientFill(egret.GradientType.LINEAR, [0x52d7ff, 0x5273ef], [1, 1], [0, 255], matrix);
        gr.drawRect(0, 0, 100, 3);
        gr.endFill();
        this.addChild(this.activeLine);
        this.activeLine.y = 332;


        const page1Group = this.pageStack.getChildAt(0) as eui.Group;


        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        //this.pageRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);


        //this.roadRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);

        // (this.radioBtn1 as any).buttonImage.width = (this.radioBtn1 as any).labelDisplay.textWidth + 10;


        this._btn_roadmap.active = true;
        this._btn_roadmap.label.top = 0;
        this._btn_roadmap.label.left = 0;
        this._btn_roadmap.label.right = 0;
        this._btn_roadmap.label.bottom = 0;
        this._btn_roadmap.label.size = 20;

        this._btn_analysis.active = false;
        this._btn_analysis.label.top = 0;
        this._btn_analysis.label.left = 0;
        this._btn_analysis.label.right = 0;
        this._btn_analysis.label.bottom = 0;
        this._btn_analysis.label.size = 20;

        this._btn_roadmap.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this._border.touchEnabled = false;
        this.changeLang();
      }


      protected onRoadChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.roadStack.selectedIndex = radio.value;
      }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.pageStack.selectedIndex = radio.value;

        this.updateActiveLine(true);
      }

      protected updateActiveLine(useEasing: boolean) {
        const btn = this._radioButtons[this.pageStack.selectedIndex];

        this._radioButtons.forEach(element => {
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

        //this.pageRadioBtn1.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);


        this.dtBigRoad.dispose();
        this.sizeBigRoad.dispose();
        this.oddBigRoad.dispose();
        egret.Tween.removeTweens(this.activeLine);
        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }
    }
  }
}
