namespace we {
  export namespace ro {
    export class RoLeftPanel extends core.BaseGamePanel {
      public beadRoad: ROBeadRoad;
      public colorBigRoad: ROColorBigRoad;
      public sizeBigRoad: ROSizeBigRoad;
      public oddBigRoad: ROOddBigRoad;

      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;
      protected labelHot: ui.RunTimeLabel;
      protected labelCold: ui.RunTimeLabel;
      protected gameId: string;
      protected totalBet: number;
      protected btnHotCold: ui.BaseImageButton;
      protected btnHistory: ui.BaseImageButton;
      protected btnRoads: ui.BaseImageButton;

      protected pageRadioBtn1: eui.RadioButton;
      protected pageRadioBtn2: eui.RadioButton;
      protected pageRadioBtn3: eui.RadioButton;

      protected roadRadioBtn1: eui.RadioButton;
      protected roadRadioBtn2: eui.RadioButton;
      protected roadRadioBtn3: eui.RadioButton;

      protected hotIcon1: ROBeadRoadIcon;
      protected hotIcon2: ROBeadRoadIcon;
      protected hotIcon3: ROBeadRoadIcon;
      protected hotIcon4: ROBeadRoadIcon;
      protected hotIcon5: ROBeadRoadIcon;

      protected coldIcon1: ROBeadRoadIcon;
      protected coldIcon2: ROBeadRoadIcon;
      protected coldIcon3: ROBeadRoadIcon;
      protected coldIcon4: ROBeadRoadIcon;
      protected coldIcon5: ROBeadRoadIcon;

      protected activeLine: egret.Shape;

      protected pageStack: eui.ViewStack;
      protected roadStack: eui.ViewStack;

      public constructor(skin?: string) {
        super(skin ? skin : 'ro/RoLeftPanel');
      }
      public changeLang() {
        this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + this.totalBet;

        this.labelHot.text = i18n.t('roulette.hot');
        this.labelCold.text = i18n.t('roulette.cold');

        this.pageRadioBtn1['labelDisplayDown']['text'] = this.pageRadioBtn1['labelDisplayUp']['text'] = i18n.t('roulette.hotColdNumber');
        this.pageRadioBtn2['labelDisplayDown']['text'] = this.pageRadioBtn2['labelDisplayUp']['text'] = i18n.t('roulette.history');
        this.pageRadioBtn3['labelDisplayDown']['text'] = this.pageRadioBtn3['labelDisplayUp']['text'] = i18n.t('roulette.roadmap');

        this.roadRadioBtn1['labelDisplayDown']['text'] = this.roadRadioBtn1['labelDisplayUp']['text'] = i18n.t('roulette.roadRed') + '/' + i18n.t('roulette.roadBlack');
        this.roadRadioBtn2['labelDisplayDown']['text'] = this.roadRadioBtn2['labelDisplayUp']['text'] = i18n.t('roulette.roadBig') + '/' + i18n.t('roulette.roadSmall');
        this.roadRadioBtn3['labelDisplayDown']['text'] = this.roadRadioBtn3['labelDisplayUp']['text'] = i18n.t('roulette.roadOdd') + '/' + i18n.t('roulette.roadEven');

        this.updateActiveLine(false);
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;

        this.beadRoad = new ROBeadRoad(3, 10, 56, 1, 10, 20, 0x262a2b, 1); // in game
        // this.beadRoad = new ROBeadRoad(3, 12, 40, 1, 8, 5, 0xc1c1c1, 0.2); // lobby
        this.beadRoad.x = 10;
        this.beadRoad.y = 20;
        this.beadRoad.scaleX = 689 / 689;
        this.beadRoad.scaleY = 689 / 689;

        // add bead road to page stack 2
        const page2Group = this.pageStack.getChildAt(1) as eui.Group;
        page2Group.addChild(this.beadRoad);

        this.colorBigRoad = new ROColorBigRoad(19, 35, 1, true);
        this.colorBigRoad.scaleX = 668 / 666;

        // add road to road stack 1
        const road1Group = this.roadStack.getChildAt(0) as eui.Group;
        road1Group.addChild(this.colorBigRoad);

        this.sizeBigRoad = new ROSizeBigRoad(19, 35, 1, true);
        this.sizeBigRoad.scaleX = 668 / 666;

        // add road to road stack 2
        const road2Group = this.roadStack.getChildAt(1) as eui.Group;
        road2Group.addChild(this.sizeBigRoad);

        this.oddBigRoad = new ROOddBigRoad(19, 35, 1, true);
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

        this.hotIcon1 = new ROBeadRoadIcon(88, 0x262a2b, 1);
        this.hotIcon1.x = 220;
        this.hotIcon1.y = 29;

        this.hotIcon2 = new ROBeadRoadIcon(58, 0x262a2b, 1);
        this.hotIcon2.x = 21;
        this.hotIcon2.y = 152;

        this.hotIcon3 = new ROBeadRoadIcon(58, 0x262a2b, 1);
        this.hotIcon3.x = 97;
        this.hotIcon3.y = 152;

        this.hotIcon4 = new ROBeadRoadIcon(58, 0x262a2b, 1);
        this.hotIcon4.x = 173;
        this.hotIcon4.y = 152;

        this.hotIcon5 = new ROBeadRoadIcon(58, 0x262a2b, 1);
        this.hotIcon5.x = 249;
        this.hotIcon5.y = 152;

        this.coldIcon1 = new ROBeadRoadIcon(88, 0x262a2b, 1);
        this.coldIcon1.x = 358;
        this.coldIcon1.y = 29;

        this.coldIcon2 = new ROBeadRoadIcon(58, 0x262a2b, 1);
        this.coldIcon2.x = 357;
        this.coldIcon2.y = 152;

        this.coldIcon3 = new ROBeadRoadIcon(58, 0x262a2b, 1);
        this.coldIcon3.x = 433;
        this.coldIcon3.y = 152;

        this.coldIcon4 = new ROBeadRoadIcon(58, 0x262a2b, 1);
        this.coldIcon4.x = 509;
        this.coldIcon4.y = 152;

        this.coldIcon5 = new ROBeadRoadIcon(58, 0x262a2b, 1);
        this.coldIcon5.x = 585;
        this.coldIcon5.y = 152;

        const page1Group = this.pageStack.getChildAt(0) as eui.Group;
        page1Group.addChild(this.hotIcon1);
        page1Group.addChild(this.hotIcon2);
        page1Group.addChild(this.hotIcon3);
        page1Group.addChild(this.hotIcon4);
        page1Group.addChild(this.hotIcon5);

        page1Group.addChild(this.coldIcon1);
        page1Group.addChild(this.coldIcon2);
        page1Group.addChild(this.coldIcon3);
        page1Group.addChild(this.coldIcon4);
        page1Group.addChild(this.coldIcon5);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.pageRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.pageRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.pageRadioBtn3.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.roadRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);
        this.roadRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);
        this.roadRadioBtn3.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);

        // (this.radioBtn1 as any).buttonImage.width = (this.radioBtn1 as any).labelDisplay.textWidth + 10;

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
        const radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2, this.pageRadioBtn3];
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
            this.gameId = this.tableInfo.betInfo.gameroundid;
            this.totalBet = this.tableInfo.betInfo.total;
            this.changeLang();
          }
        }
      }
      public setHotCold(hotNumbers: number[], coldNumbers: number[]) {
        const hots = [this.hotIcon1, this.hotIcon2, this.hotIcon3, this.hotIcon4, this.hotIcon5];
        const colds = [this.coldIcon1, this.coldIcon2, this.coldIcon3, this.coldIcon4, this.coldIcon5];

        hotNumbers.forEach((element, index) => {
          hots[index].setByObject({ v: element });
        });
        coldNumbers.forEach((element, index) => {
          colds[index].setByObject({ v: element });
        });
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
