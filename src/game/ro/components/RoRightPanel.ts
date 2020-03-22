namespace we {
  export namespace ro {
    export class RoRightPanel extends core.BaseGamePanel {
      protected pageRadioBtn1: eui.RadioButton;
      protected pageRadioBtn2: eui.RadioButton;
      protected _raceTrackChipLayer: RaceTrackChipLayer;
      protected _raceTrackTableLayer: RaceTrackTableLayer;
      protected _raceTrackControl: RaceTrackControl;

      protected activeLine: egret.Shape;

      protected pageStack: eui.ViewStack;

      public constructor(skin?: string) {
        super(skin ? skin : 'RoRightPanel');
      }

      public get raceTrackChipLayer() {
        return this._raceTrackChipLayer;
      }

      public initBetCombination(chipLayer: we.ui.ChipLayer) {
        const page2Group = this.pageStack.getChildAt(1) as eui.Group;
        const betCombination = new we.ui.BetCombination();
        betCombination.chipLayer = chipLayer;
        page2Group.addChild(betCombination);
      }

      public initRaceTrack(chipLayer: we.ui.ChipLayer, tableLayer: we.ui.TableLayer) {
        const page1Group = this.pageStack.getChildAt(0) as eui.Group;

        this._raceTrackControl = new RaceTrackControl();
        this._raceTrackControl.x = 40;
        this._raceTrackControl.y = 220;

        this._raceTrackTableLayer = new RaceTrackTableLayer();
        this._raceTrackTableLayer.horizontalCenter = 0;
        this._raceTrackTableLayer.y = 20;

        this._raceTrackChipLayer = new RaceTrackChipLayer();
        this._raceTrackChipLayer.horizontalCenter = 0;
        this._raceTrackChipLayer.y = 20;

        this._raceTrackChipLayer.raceTrackTableLayer = this._raceTrackTableLayer;
        this._raceTrackChipLayer.raceTrackControl = this._raceTrackControl;
        this._raceTrackChipLayer.chipLayer = chipLayer;

        page1Group.addChild(this._raceTrackTableLayer);
        page1Group.addChild(this._raceTrackChipLayer);
        page1Group.addChild(this._raceTrackControl);
      }

      public changeLang() {
        this.pageRadioBtn1['labelDisplayDown']['text'] = this.pageRadioBtn1['labelDisplayUp']['text'] = i18n.t('roulette.jockeyBet');
        this.pageRadioBtn2['labelDisplayDown']['text'] = this.pageRadioBtn2['labelDisplayUp']['text'] = i18n.t('roulette.customBet');

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
    }
  }
}
