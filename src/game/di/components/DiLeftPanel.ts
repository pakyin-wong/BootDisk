namespace we {
  export namespace di {
    export class DiLeftPanel extends core.BaseGamePanel {
      public beadRoad: DiBeadRoad;
      public sizeBigRoad: DiSizeBigRoad;
      public oddBigRoad: DiOddBigRoad;
      public sumBigRoad: DiSumBigRoad;

      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;
      protected gameId: string;
      protected totalBet: number;
      protected btnHotCold: ui.BaseImageButton;
      protected btnHistory: ui.BaseImageButton;
      protected btnRoads: ui.BaseImageButton;

      protected pageRadioBtn1: eui.RadioButton;
      protected pageRadioBtn2: eui.RadioButton;

      protected roadRadioBtn1: eui.RadioButton;
      protected roadRadioBtn2: eui.RadioButton;
      protected roadRadioBtn3: eui.RadioButton;

      protected activeLine: egret.Shape;

      protected pageStack: eui.ViewStack;
      protected roadStack: eui.ViewStack;

      // new for di
      protected beadRadioBtn1: eui.RadioButton;
      protected beadRadioBtn2: eui.RadioButton;
      protected isExpanded: boolean;
      protected toggleUpDownButton: eui.ToggleSwitch;

      protected bg: ui.RoundRectShape;
      protected border: ui.RoundRectShape;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'DiLeftPanel');
      }
      public changeLang() {
        this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + utils.numberToFaceValue(this.totalBet);

        this.pageRadioBtn1['labelDisplayDown']['text'] = this.pageRadioBtn1['labelDisplayUp']['text'] = i18n.t('dice.history');
        this.pageRadioBtn2['labelDisplayDown']['text'] = this.pageRadioBtn2['labelDisplayUp']['text'] = i18n.t('dice.roadmap');

        this.roadRadioBtn1['labelDisplayDown']['text'] = this.roadRadioBtn1['labelDisplayUp']['text'] = i18n.t('dice.roadBig') + '/' + i18n.t('roulette.roadSmall');
        this.roadRadioBtn2['labelDisplayDown']['text'] = this.roadRadioBtn2['labelDisplayUp']['text'] = i18n.t('dice.roadOdd') + '/' + i18n.t('roulette.roadEven');
        this.roadRadioBtn3['labelDisplayDown']['text'] = this.roadRadioBtn3['labelDisplayUp']['text'] = i18n.t('dice.total');

        this.beadRadioBtn1['labelDisplayDown']['text'] = this.beadRadioBtn1['labelDisplayUp']['text'] = i18n.t('dice.roadBig') + '/' + i18n.t('roulette.roadSmall');
        this.beadRadioBtn2['labelDisplayDown']['text'] = this.beadRadioBtn2['labelDisplayUp']['text'] = i18n.t('dice.roadOdd') + '/' + i18n.t('roulette.roadEven');

        this.updateActiveLine(false);
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;

        this.beadRoad = new DiBeadRoad(2, 8, 48, 1, 19, 24, 6, [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1]); // in game
        this.beadRoad.x = 29;
        this.beadRoad.y = 16;
        this.beadRoad.scaleX = 689 / 689;
        this.beadRoad.scaleY = 689 / 689;
        this.beadRoad.expandRoad(false);

        // add bead road to page stack 1
        const page2Group = this.pageStack.getChildAt(0) as eui.Group;
        page2Group.addChild(this.beadRoad);

        const data = [
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
        ];
        this.beadRoad.parseRoadData(data);

        this.sizeBigRoad = new DiSizeBigRoad(17, 34, 1, true);
        this.sizeBigRoad.scaleX = 580 / 578;

        const data2 = [
          { v: 0, gameRoundID: 'cde345' },
          { v: 1, gameRoundID: 'cde345' },
          { v: 2, gameRoundID: 'cde345' },
          { v: 12, gameRoundID: 'cde345' },
        ];
        this.sizeBigRoad.parseRoadData(data2);

        // add road to road stack 1
        const road1Group = this.roadStack.getChildAt(0) as eui.Group;
        road1Group.addChild(this.sizeBigRoad);

        this.oddBigRoad = new DiOddBigRoad(17, 34, 1, true);
        this.oddBigRoad.scaleX = 580 / 578;
        this.oddBigRoad.parseRoadData(data2);

        // add road to road stack 2
        const road2Group = this.roadStack.getChildAt(1) as eui.Group;
        road2Group.addChild(this.oddBigRoad);

        this.sumBigRoad = new DiSumBigRoad(17, 34, 1, true);
        this.sumBigRoad.scaleX = 580 / 578;
        this.sumBigRoad.parseRoadData(data2);

        // add road to road stack 3
        const road3Group = this.roadStack.getChildAt(2) as eui.Group;
        road3Group.addChild(this.sumBigRoad);

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

        dir.evtHandler.addEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.pageRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.pageRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.roadRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);
        this.roadRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);
        this.roadRadioBtn3.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);

        this.beadRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onBeadChange, this);
        this.beadRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onBeadChange, this);

        this.toggleUpDownButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggleUpDown, this, true);
        this.changeLang();
      }
      public onToggleUpDown(evt: egret.TouchEvent) {
        this.expandPanel(!this.isExpanded);
      }

      public expandPanel(expand: boolean) {
        if (!this.isExpanded && expand) {
          this.bg.setRoundRectStyle(580, 340 + 202, { tl: 14, tr: 14, br: 14, bl: 14 }, '0x1f242b', 1, 0);
          this.bg.y -= 202;
          this.border.setRoundRectStyle(580, 340 + 202, { tl: 14, tr: 14, br: 14, bl: 14 }, '0x1f242b', -1, 2, 0x3a3f48);
          this.border.y -= 202;

          (this.pageStack.getChildAt(0) as eui.Group).height += 202;
          (this.pageStack.getChildAt(0) as eui.Group).y -= 202;

          this.gameIdLabel.y -= 202;
          this.totalBetLabel.y -= 202;

          this.beadRadioBtn1.y += 202;
          this.beadRadioBtn2.y += 202;
          this.isExpanded = true;

          this.toggleUpDownButton.currentState = 'b_down';
          this.beadRoad.expandRoad(true);
        } else if (this.isExpanded && !expand) {
          this.bg.setRoundRectStyle(580, 340, { tl: 14, tr: 14, br: 14, bl: 14 }, '0x1f242b', 1, 0);
          this.bg.y += 202;
          this.border.setRoundRectStyle(580, 340, { tl: 14, tr: 14, br: 14, bl: 14 }, '0x1f242b', -1, 2, 0x3a3f48);
          this.border.y += 202;

          (this.pageStack.getChildAt(0) as eui.Group).height -= 202;
          (this.pageStack.getChildAt(0) as eui.Group).y += 202;

          this.gameIdLabel.y += 202;
          this.totalBetLabel.y += 202;

          this.beadRadioBtn1.y -= 202;
          this.beadRadioBtn2.y -= 202;
          this.isExpanded = false;

          this.toggleUpDownButton.currentState = 'b_up';
          this.beadRoad.expandRoad(false);
        }
      }

      protected onBeadChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        if (radio.value === '1') {
          this.beadRoad.setLayout(1);
        } else {
          this.beadRoad.setLayout(0);
        }
      }

      protected onRoadChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.roadStack.selectedIndex = radio.value;
      }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.pageStack.selectedIndex = radio.value;
        if (radio.value > 0) {
          this.expandPanel(false);
          this.toggleUpDownButton.visible = false;
        } else {
          this.toggleUpDownButton.visible = true;
        }
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
            this.gameId = this.tableInfo.betInfo.gameroundid;
            this.totalBet = this.tableInfo.betInfo.total;
            this.changeLang();
          }
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        if (evt.data) {
          const betInfo = evt.data;
          if (betInfo.tableid === this.tableInfo.tableid) {
            this.totalBet = evt.data.total;
            this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + utils.numberToFaceValue(this.totalBet);
          }
        }
      }

      public destroy() {
        super.destroy();

        this.beadRoad.dispose();
        this.sizeBigRoad.dispose();
        this.oddBigRoad.dispose();
        this.sumBigRoad.dispose();

        egret.Tween.removeTweens(this.activeLine);
        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
        dir.evtHandler.removeEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
      }
    }
  }
}
