namespace we {
  export namespace ba {
    export class BARoadmapLeftPanel extends core.BaseGamePanel {
      public beadRoad: BABeadRoad;
      private gameIdLabel: ui.RunTimeLabel;
      private totalBetLabel: ui.RunTimeLabel;
      private gameId: string;
      private totalBet: number;
      private switchModeButton: eui.Component;

      public constructor() {
        super('BARoadmapLeftPanel');
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

        this.beadRoad = new BABeadRoad(numColumn, gridSize, 1, true);
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

      private onSwitchModeClick(e: egret.TouchEvent) {
        this.beadRoad.Mode = ++this.beadRoad.Mode % 2;
      }

      public setGameInfo(gameId: string, totalBet: number) {
        this.gameId = gameId;
        this.totalBet = totalBet;
        this.changeLang();
      }

      public destroy() {
        super.destroy();

        this.beadRoad.dispose();

        if (this.switchModeButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this.switchModeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchModeClick, this);
        }

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }
    }
  }
}
