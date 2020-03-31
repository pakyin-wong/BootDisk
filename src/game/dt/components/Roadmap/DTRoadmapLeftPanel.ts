namespace we {
  export namespace dt {
    export class DTRoadmapLeftPanel extends ba.BARoadmapLeftPanel {
      public beadRoad: DTBeadRoad;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'BARoadmapLeftPanel');
      }
      public changeLang() {
        this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + this.totalBet;
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;

        const gridSize = 43;
        const numColumn = 16;

        this.beadRoad = new DTBeadRoad(numColumn, gridSize, 1, true);
        this.beadRoad.x = 0;
        this.beadRoad.y = 44;
        this.beadRoad.scaleX = 690 / 689;
        // this.beadRoad.scaleY = 690 / 689;
        this.addChild(this.beadRoad);

        this.switchModeButton.touchEnabled = true;
        this.switchModeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchModeClick, this);
        this.addChild(this.switchModeButton);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }
    }
  }
}
