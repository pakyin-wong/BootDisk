/* tslint:disable triple-equals */
namespace we {
  export namespace ro {
    export class MobileBottomRoadmapPanel extends core.BaseGamePanel {
      public colorBigRoad: ROColorBigRoad;
      public sizeBigRoad: ROSizeBigRoad;
      public oddBigRoad: ROOddBigRoad;

      protected colorBigRoadConfig: RoadMapConfig;
      protected sizeBigRoadConfig: RoadMapConfig;
      protected oddBigRoadConfig: RoadMapConfig;

      protected colorRoadBtn: eui.RadioButton;
      protected sizeRoadBtn: eui.RadioButton;
      protected oddevenRoadBtn: eui.RadioButton;

      protected _roadmapBg: eui.Component;
      protected _roadmapView: eui.ViewStack;

      protected color: eui.Group;
      protected size: eui.Group;
      protected oddeven: eui.Group;

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
        this.colorBigRoad = new ROColorBigRoad(this.colorBigRoadConfig.roadmap_col, this.colorBigRoadConfig.roadmap_gridSize, 1, false);
        this.colorBigRoadConfig.parent.addChild(this.colorBigRoad);

        this.sizeBigRoad = new ROSizeBigRoad(this.sizeBigRoadConfig.roadmap_col, this.sizeBigRoadConfig.roadmap_gridSize, 1, false);
        this.sizeBigRoadConfig.parent.addChild(this.sizeBigRoad);

        this.oddBigRoad = new ROOddBigRoad(this.oddBigRoadConfig.roadmap_col, this.oddBigRoadConfig.roadmap_gridSize, 1, false);
        this.oddBigRoadConfig.parent.addChild(this.oddBigRoad);
      }

      public destroy() {
        super.destroy();
        this.colorBigRoadConfig.parent.removeChildren();
        this.sizeBigRoadConfig.parent.removeChildren();
        this.oddBigRoadConfig.parent.removeChildren();
        this.colorBigRoad.dispose();
        this.sizeBigRoad.dispose();
        this.oddBigRoad.dispose();

        this.removeListeners();
      }

      protected addListeners() {
        this.colorRoadBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.sizeRoadBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.oddevenRoadBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        dir.evtHandler.addEventListener(core.Event.MODE_UPDATE, this.updateMode, this);
      }

      protected removeListeners() {
        this.colorRoadBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.sizeRoadBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.oddevenRoadBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);

        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        dir.evtHandler.removeEventListener(core.Event.MODE_UPDATE, this.updateMode, this);
      }

      public updateText() {
        this.colorRoadBtn.label = i18n.t('roulette.betGroup.color');
        this.sizeRoadBtn.label = i18n.t('roulette.betGroup.size');
        this.oddevenRoadBtn.label = i18n.t('roulette.betGroup.oddeven');
      }

      protected onRoadMapChanged(e) {
        this._roadmapView.selectedIndex = e.target.value;
      }

      protected updateMode() {
        this._roadmapBg.currentState = env.mode === 1 ? 'dark' : 'light';
      }
    }
  }
}
