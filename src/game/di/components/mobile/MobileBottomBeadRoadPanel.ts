// TypeScript file
// TypeScript file
namespace we {
  export namespace di {
    export class MobileBottomBeadRoadPanel extends core.BaseGamePanel {
      public beadRoad: DiBeadRoad;

      protected beadRoadConfig: RoadMapConfig;

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
        switch (env.orientation) {
          case 'portrait':
            let options = {
              paddingX: 16,
              paddingY: 16,
              gapX: 22,
              gapY: 40,
              iconItemColors: [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1],
              iconHeight: 380,
              iconItemYOffset: 14,
              textPadding: 3,
              textSize: 48,
              diceSize: 66,
              highlightRadius: 8,
            };
            this.beadRoad = new DiBeadRoad(1242, 1, 9, 120, 1, options); // in game
            // this.beadRoad.x = 29;
            // this.beadRoad.y = 16;
            this.beadRoad.scaleX = 689 / 689;
            this.beadRoad.scaleY = 689 / 689;
            this.beadRoad.expandRoad(false);
            this.beadRoadConfig.parent.addChild(this.beadRoad);
            break;
          case 'landscape':
            options = {
              paddingX: 38,
              paddingY: 16,
              gapX: 33,
              gapY: 20,
              iconItemColors: [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1],
              iconHeight: 276,
              iconItemYOffset: 23,
              textPadding: 2,
              textSize: 36,
              diceSize: 34,
              highlightRadius: 8,
            };
            this.beadRoad = new DiBeadRoad(845, 1, 8, 70, 1, options); // in game
            // this.beadRoad.x = 29;
            // this.beadRoad.y = 16;
            this.beadRoad.scaleX = 689 / 689;
            this.beadRoad.scaleY = 689 / 689;
            this.beadRoad.expandRoad(false);
            this.beadRoadConfig.parent.addChild(this.beadRoad);
            break;
        }
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

      public onBeadRoadChanged(e) {
        const radio: eui.RadioButton = e.target;
        if (radio.value === '1') {
          this.beadRoad.setLayout(1);
        } else {
          this.beadRoad.setLayout(0);
        }
      }

      protected updateMode() {
        this._roadmapBg.currentState = 'dark'; // change when light state done
        // this._roadmapBg.currentState = env.mode === 1 ? 'dark' : 'light';
      }
    }
  }
}
