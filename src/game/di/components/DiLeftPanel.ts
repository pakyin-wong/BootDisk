namespace we {
  export namespace di {
    export class DiLeftPanel extends core.BaseGamePanel {
      //public beadRoad: ROBeadRoad;
      //public colorBigRoad: ROColorBigRoad;
      //public sizeBigRoad: ROSizeBigRoad;
      //public oddBigRoad: ROOddBigRoad;

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


      //new for di
      protected topBar: eui.Rect;
      protected beadRadioBtn1: eui.RadioButton;
      protected beadRadioBtn2: eui.RadioButton;
      protected isExpanded: boolean;
      protected toggleUpDownButton: eui.ToggleSwitch;

      public constructor(skin?: string) {
        super(skin ? skin : 'di/DiLeftPanel');
      }
      public changeLang() {
        this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + this.totalBet;

        this.pageRadioBtn1['labelDisplayDown']['text'] = this.pageRadioBtn1['labelDisplayUp']['text'] = i18n.t('roulette.hotColdNumber');
        this.pageRadioBtn2['labelDisplayDown']['text'] = this.pageRadioBtn2['labelDisplayUp']['text'] = i18n.t('roulette.history');

        this.roadRadioBtn1['labelDisplayDown']['text'] = this.roadRadioBtn1['labelDisplayUp']['text'] = i18n.t('roulette.roadRed') + '/' + i18n.t('roulette.roadBlack');
        this.roadRadioBtn2['labelDisplayDown']['text'] = this.roadRadioBtn2['labelDisplayUp']['text'] = i18n.t('roulette.roadBig') + '/' + i18n.t('roulette.roadSmall');
        this.roadRadioBtn3['labelDisplayDown']['text'] = this.roadRadioBtn3['labelDisplayUp']['text'] = i18n.t('roulette.roadOdd') + '/' + i18n.t('roulette.roadEven');

        this.updateActiveLine(false);
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;

        /*
                this.beadRoad = new ROBeadRoad(3, 10, 56, 1, 10, 20, 0x262a2b, 1); // in game
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
        */

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
        this.pageRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.pageRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.roadRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);
        this.roadRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);
        this.roadRadioBtn3.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);

        this.beadRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onBeadChange, this);
        this.beadRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onBeadChange, this);

        this.toggleUpDownButton.addEventListener(eui.UIEvent.CHANGE, this.onToggleUpDown, this);
        this.changeLang();
      }
      public onToggleUpDown(evt: eui.UIEvent) {
        this.expandPanel(evt.target.selected);
      }

      public expandPanel(expand: boolean) {
        if (!this.isExpanded && expand) {
          this.mask.height += 202;
          this.mask.y -= 202;

          (this.pageStack.getChildAt(0) as eui.Group).height += 202;
          (this.pageStack.getChildAt(0) as eui.Group).y -= 202;

          this.topBar.y -= 202;

          this.gameIdLabel.y -= 202;
          this.totalBetLabel.y -= 202;

          this.beadRadioBtn1.y += 202;
          this.beadRadioBtn2.y += 202;
          this.isExpanded = true;

          this.toggleUpDownButton.selected = true;
        } else if (this.isExpanded && !expand) {
          this.mask.height -= 202;
          this.mask.y += 202;

          (this.pageStack.getChildAt(0) as eui.Group).height -= 202;
          (this.pageStack.getChildAt(0) as eui.Group).y += 202;

          this.topBar.y += 202;

          this.gameIdLabel.y += 202;
          this.totalBetLabel.y += 202;

          this.beadRadioBtn1.y -= 202;
          this.beadRadioBtn2.y -= 202;
          this.isExpanded = false;

          this.toggleUpDownButton.selected = false;
        }
      }

      protected onBeadChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        if (radio.value === "1") {
          this.expandPanel(true);
        } else {
          this.expandPanel(false);
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
