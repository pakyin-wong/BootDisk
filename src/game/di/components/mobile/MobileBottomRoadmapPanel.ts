// TypeScript file
// TypeScript file
namespace we {
  export namespace di {
    export class MobileBottomRoadmapPanel extends core.BaseGamePanel {
      // protected beadRoad: DiBeadRoad;
      public sumRoad: DiSumBigRoad;
      public sizeRoad: DiSizeBigRoad;
      public oddRoad: DiOddBigRoad;

      protected sumBigRoadConfig: RoadMapConfig;
      protected sizeBigRoadConfig: RoadMapConfig;
      protected oddBigRoadConfig: RoadMapConfig;

      protected roadmapSizeBtn: eui.RadioButton;
      protected roadmapOddevenBtn: eui.RadioButton;
      protected roadmapSumBtn: eui.RadioButton;

      protected _roadmapBg: eui.Component;
      protected _roadmapView: eui.ViewStack;

      public constructor() {
        super();
      }

      protected mount() {
        super.mount();

        this.initRoadMap();
        this.addListeners();

        this.updateText();
        this.updateMode();
      }

      protected initRoadMap() {
        switch (env.orientation) {
          case 'portrait':
            this.sumRoad = new DiSumBigRoad(18, 68, 1, false);
            this.sumBigRoadConfig.parent.addChild(this.sumRoad);

            this.sizeRoad = new DiSizeBigRoad(18, 68, 1, false);
            this.sizeBigRoadConfig.parent.addChild(this.sizeRoad);

            this.oddRoad = new DiOddBigRoad(18, 68, 1, false);
            this.oddBigRoadConfig.parent.addChild(this.oddRoad);
            break;
          case 'landscape':
            this.sumRoad = new DiSumBigRoad(18, 51, 1, false);
            this.sumBigRoadConfig.parent.addChild(this.sumRoad);

            this.sizeRoad = new DiSizeBigRoad(18, 51, 1, false);
            this.sizeBigRoadConfig.parent.addChild(this.sizeRoad);

            this.oddRoad = new DiOddBigRoad(18, 51, 1, false);
            this.oddBigRoadConfig.parent.addChild(this.oddRoad);
            break;
        }
      }

      public destroy() {
        super.destroy();

        this.sumRoad.dispose();
        this.sizeRoad.dispose();
        this.oddRoad.dispose();

        this.removeListeners();
      }

      protected addListeners() {
        this.roadmapSizeBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.roadmapOddevenBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.roadmapSumBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        dir.evtHandler.addEventListener(core.Event.MODE_UPDATE, this.updateMode, this);
      }

      protected removeListeners() {
        this.roadmapSizeBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.roadmapOddevenBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.roadmapSumBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);

        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        dir.evtHandler.removeEventListener(core.Event.MODE_UPDATE, this.updateMode, this);
      }

      public updateText() {
        this.roadmapSizeBtn.label = i18n.t('dice.roadBig') + '/' + i18n.t('dice.roadSmall');
        this.roadmapOddevenBtn.label = i18n.t('dice.roadOdd') + '/' + i18n.t('dice.roadEven');
        this.roadmapSumBtn.label = i18n.t('dice.total');
      }

      public onRoadMapChanged(e) {
        this._roadmapView.selectedIndex = e.target.value;
      }

      protected updateMode() {
        this._roadmapBg.currentState = 'dark'; // change when light state done
        // this._roadmapBg.currentState = env.mode === 1 ? 'dark' : 'light';
      }
    }
  }
}
