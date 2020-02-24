namespace we {
  export namespace ro {
    export class RoLeftPanel extends core.BaseGamePanel {
      public beadRoad: ROBeadRoad;
      public colorBigRoad: ROColorBigRoad;
      public sizeBigRoad: ROSizeBigRoad;
      public oddBigRoad: ROOddBigRoad;

      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;
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

        this.pageRadioBtn1['labelDisplayDown']['text'] = this.pageRadioBtn1['labelDisplayUp']['text'] = 'page1';
        this.pageRadioBtn2['labelDisplayDown']['text'] = this.pageRadioBtn2['labelDisplayUp']['text'] = 'page2';
        this.pageRadioBtn3['labelDisplayDown']['text'] = this.pageRadioBtn3['labelDisplayUp']['text'] = 'page3';

        this.roadRadioBtn1['labelDisplayDown']['text'] = this.roadRadioBtn1['labelDisplayUp']['text'] = 'road1';
        this.roadRadioBtn2['labelDisplayDown']['text'] = this.roadRadioBtn2['labelDisplayUp']['text'] = 'road2';
        this.roadRadioBtn3['labelDisplayDown']['text'] = this.roadRadioBtn3['labelDisplayUp']['text'] = 'road3';

        this.updateActiveLine(false);
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;

        const gridSize = 43;
        const numRow = 3;
        const numColumn = 10;

        this.beadRoad = new ROBeadRoad(numRow, numColumn, gridSize, 1);
        this.beadRoad.scaleX = 689 / 689;
        this.beadRoad.scaleY = 689 / 689;

        const rdata: any = [
          { v: 0, index: 0 },
          { v: 1, index: 1 },
          { v: 2, index: 2 },
          { v: 3, index: 3 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 35, index: 5 },
        ];
        this.beadRoad.parseRoadData(rdata);

        // add bead road to page stack 2
        const page2Group = this.pageStack.getChildAt(1) as eui.Group;
        page2Group.addChild(this.beadRoad);

        const rdata2: any = [
          { v: 0, index: 0 },
          {},
          {},
          {},
          {},
          {},
          { v: 1, index: 1 },
          {},
          {},
          {},
          {},
          {},
          { v: 2, index: 2 },
          {},
          {},
          {},
          {},
          {},
          { v: 3, index: 3 },
          {},
          {},
          {},
          {},
          {},
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          { v: 4, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 4, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 4, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 4, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 4, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 35, index: 5 },
        ];

        this.colorBigRoad = new ROColorBigRoad(19, 30, 1);
        this.colorBigRoad.parseRoadData(rdata2);

        // add road to road stack 1
        const road1Group = this.roadStack.getChildAt(0) as eui.Group;
        road1Group.addChild(this.colorBigRoad);

        const rdata3: any = [
          { v: 0, index: 0 },
          {},
          {},
          {},
          {},
          {},
          { v: 1, index: 1 },
          {},
          {},
          {},
          {},
          {},
          { v: 23, index: 2 },
          {},
          {},
          {},
          {},
          {},
          { v: 3, index: 3 },
          {},
          {},
          {},
          {},
          {},
          { v: 24, index: 4 },
          { v: 24, index: 4 },
          { v: 24, index: 4 },
          { v: 23, index: 4 },
          { v: 23, index: 4 },
          { v: 23, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 23, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 23, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 23, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 32, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 35, index: 5 },
        ];

        this.sizeBigRoad = new ROSizeBigRoad(19, 30, 1);
        this.sizeBigRoad.parseRoadData(rdata3);

        // add road to road stack 2
        const road2Group = this.roadStack.getChildAt(1) as eui.Group;
        road2Group.addChild(this.sizeBigRoad);

        const rdata4: any = [
          { v: 0, index: 0 },
          {},
          {},
          {},
          {},
          {},
          { v: 1, index: 1 },
          {},
          {},
          {},
          {},
          {},
          { v: 2, index: 2 },
          {},
          {},
          {},
          {},
          {},
          { v: 3, index: 3 },
          {},
          {},
          {},
          {},
          {},
          { v: 2, index: 4 },
          { v: 2, index: 4 },
          { v: 2, index: 4 },
          { v: 2, index: 4 },
          { v: 2, index: 4 },
          { v: 2, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 2, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 2, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 2, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 2, index: 4 },
          {},
          {},
          {},
          {},
          {},
          { v: 2, index: 5 },
        ];

        this.oddBigRoad = new ROOddBigRoad(19, 30, 1);
        this.oddBigRoad.parseRoadData(rdata4);

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
        this.activeLine.y = this.pageRadioBtn1.y;

        this.hotIcon1 = new ROBeadRoadIcon(88);
        this.hotIcon1.setByObject({ v: 1 });
        this.hotIcon1.x = 220;
        this.hotIcon1.y = 29;

        this.hotIcon2 = new ROBeadRoadIcon(58);
        this.hotIcon2.setByObject({ v: 1 });
        this.hotIcon2.x = 21;
        this.hotIcon2.y = 152;

        this.hotIcon3 = new ROBeadRoadIcon(58);
        this.hotIcon3.setByObject({ v: 1 });
        this.hotIcon3.x = 97;
        this.hotIcon3.y = 152;

        this.hotIcon4 = new ROBeadRoadIcon(58);
        this.hotIcon4.setByObject({ v: 1 });
        this.hotIcon4.x = 173;
        this.hotIcon4.y = 152;

        this.hotIcon5 = new ROBeadRoadIcon(58);
        this.hotIcon5.setByObject({ v: 1 });
        this.hotIcon5.x = 249;
        this.hotIcon5.y = 152;

        this.coldIcon1 = new ROBeadRoadIcon(88);
        this.coldIcon1.setByObject({ v: 1 });
        this.coldIcon1.x = 358;
        this.coldIcon1.y = 29;

        this.coldIcon2 = new ROBeadRoadIcon(58);
        this.coldIcon2.setByObject({ v: 1 });
        this.coldIcon2.x = 357;
        this.coldIcon2.y = 152;

        this.coldIcon3 = new ROBeadRoadIcon(58);
        this.coldIcon3.setByObject({ v: 1 });
        this.coldIcon3.x = 433;
        this.coldIcon3.y = 152;

        this.coldIcon4 = new ROBeadRoadIcon(58);
        this.coldIcon4.x = 509;
        this.coldIcon4.y = 152;

        this.coldIcon5 = new ROBeadRoadIcon(58);
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

        const w = btn['labelDisplayUp']['textWidth'];
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
