// TypeScript file
namespace we {
  export namespace di {
    export class MobileBottomRoadButtonPanel extends core.BaseGamePanel {
      private _buttonGroup: eui.Group;

      private _roadmapPanel;

      public roadmapSizeBtn;
      public roadmapOddevenBtn;
      public roadmapSumBtn;

      private _roadmapType: number = -1; // 0 = bead , 1 = big , 2 = big&bead

      public set roadmapType(value) {
        this._roadmapType = value;
      }

      public get roadmapType() {
        return this._roadmapType;
      }

      public constructor() {
        super();
      }

      protected mount() {
        super.mount();

        // this.initRoadMap();
        this.addListeners();

        this.updateText();
        // this.updateMode();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        // this.roadmapSizeBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        // this.roadmapOddevenBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        // this.roadmapSumBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
      }

      protected removeListeners() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        // this.roadmapSizeBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        // this.roadmapOddevenBtn.removeEventListener(eui.UIEvent.CHANGE, this._roadmapPanel.onRoadMapChanged, this);
        // this.roadmapSumBtn.removeEventListener(eui.UIEvent.CHANGE, this._roadmapPanel.onRoadMapChanged, this);
      }

      public updateText() {
        this.roadmapSizeBtn.label = i18n.t('dice.roadBig') + '/' + i18n.t('dice.roadSmall');
        this.roadmapOddevenBtn.label = i18n.t('dice.roadOdd') + '/' + i18n.t('dice.roadEven');
        this.roadmapSumBtn.label = i18n.t('dice.total');
      }

      public changeState() {
        switch (env.orientation) {
          case 'landscape':
            break;
          case 'portrait':
            switch (this._roadmapType) {
              case 0:
                this.currentState = 'bead';
                break;
              case 1:
                this.currentState = 'big';
                break;
            }
            break;
        }
        this.invalidateState();
      }
    }
  }
}
