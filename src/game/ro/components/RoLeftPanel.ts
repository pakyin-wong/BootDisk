namespace we {
  export namespace ro {
    export class RoLeftPanel extends core.BaseGamePanel {
      public beadRoad: we.ba.BABeadRoad;
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
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;

        const gridSize = 43;
        const numColumn = 16;

        this.beadRoad = new we.ba.BABeadRoad(numColumn, gridSize, 1, true);
        this.beadRoad.scaleX = 300 / 689;
        this.beadRoad.scaleY = 300 / 689;
        const g = this.pageStack.getChildAt(1) as eui.Group;
        g.addChild(this.beadRoad);

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

        const radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2, this.pageRadioBtn3];
        const btn = radioButtons[this.pageStack.selectedIndex];
        const w = btn['labelDisplayUp']['textWidth'];
        const x = btn.x + (btn.width - w) * 0.5;
        this.activeLine.x = x;
        this.activeLine.scaleX = w / 100;

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.pageRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.pageRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.pageRadioBtn3.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        // (this.radioBtn1 as any).buttonImage.width = (this.radioBtn1 as any).labelDisplay.textWidth + 10;

        this.changeLang();
      }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.pageStack.selectedIndex = radio.value;

        this.updateActiveLine();
      }

      protected updateActiveLine() {
        const radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2, this.pageRadioBtn3];
        const btn = radioButtons[this.pageStack.selectedIndex];

        const w = btn['labelDisplayUp']['textWidth'];
        const x = btn.x + (btn.width - w) * 0.5;
        egret.Tween.removeTweens(this.activeLine);
        egret.Tween.get(this.activeLine).to({ x, scaleX: w / 100 }, 300, egret.Ease.quartOut);
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
