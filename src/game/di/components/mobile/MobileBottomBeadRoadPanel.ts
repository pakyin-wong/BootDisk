// TypeScript file
// TypeScript file
namespace we {
  export namespace di {
    export class MobileBottomBeadRoadPanel extends core.BaseGamePanel {
      protected beadRoad: DiBeadRoad;

      //   protected sumRoad: DiSumBigRoad;
      //   protected sizeRoad: DiSizeBigRoad;
      //   protected oddRoad: DiOddBigRoad;

      //   protected sumBigRoadConfig: RoadMapConfig;
      //   protected sizeBigRoadConfig: RoadMapConfig;
      //   protected oddBigRoadConfig: RoadMapConfig;

      // protected beadRoadGroup : eui.Group;
      // protected bigRoadGroup: eui.Group;

      // protected beadRoadSizeBtn: eui.RadioButton;
      // protected beadRoadOddEvenBtn: eui.RadioButton;

      protected beadRoadSizeBtn: eui.RadioButton;
      protected beadRoadOddEvenBtn: eui.RadioButton;

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
        this.beadRoad = new DiBeadRoad(2, 8, 48, 1, 19, 24, 6, [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1]); // in game
        this.beadRoad.x = 29;
        this.beadRoad.y = 16;
        this.beadRoad.scaleX = 689 / 689;
        this.beadRoad.scaleY = 689 / 689;
        this.beadRoad.expandRoad(false);

        // this.sizeRoad = new DiSizeBigRoad(this.sizeBigRoadConfig.roadmap_col, this.sizeBigRoadConfig.roadmap_gridSize, 1, false);
        // this.sizeBigRoadConfig.parent.addChild(this.sizeRoad);
      }

      public destroy() {
        super.destroy();

        this.beadRoad.dispose();
        this.removeListeners();
      }

      protected addListeners() {
        this.beadRoadSizeBtn.addEventListener(eui.UIEvent.CHANGE, this.onBeadRoadChanged, this);
        this.beadRoadOddEvenBtn.addEventListener(eui.UIEvent.CHANGE, this.onBeadRoadChanged, this);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        dir.evtHandler.addEventListener(core.Event.MODE_UPDATE, this.updateMode, this);
      }

      protected removeListeners() {
        this.beadRoadSizeBtn.removeEventListener(eui.UIEvent.CHANGE, this.onBeadRoadChanged, this);
        this.beadRoadOddEvenBtn.removeEventListener(eui.UIEvent.CHANGE, this.onBeadRoadChanged, this);

        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        dir.evtHandler.removeEventListener(core.Event.MODE_UPDATE, this.updateMode, this);
      }

      public updateText() {
        this.beadRoadSizeBtn.label = i18n.t('dice.roadBig') + '/' + i18n.t('dice.roadSmall');
        this.beadRoadOddEvenBtn.label = i18n.t('dice.roadOdd') + '/' + i18n.t('dice.roadEven');
      }

      protected onBeadRoadChanged(e) {
        const radio: eui.RadioButton = e.target;
        if (radio.value === '1') {
          this.beadRoad.setLayout(1);
        } else {
          this.beadRoad.setLayout(0);
        }
      }

      protected updateMode() {
        this._roadmapBg.currentState = env.mode === 1 ? 'dark' : 'light';
      }
    }
  }
}
