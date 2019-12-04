namespace we {
  export namespace ba {
    export class BARoadmapLeftPanel extends ui.Panel {
      public beadRoad: BABeadRoad;
      private gameIdLabel: ui.RunTimeLabel;
      private totalBetLabel: ui.RunTimeLabel;
      private gameId: string;
      private totalBet: number;
      private contentMask: egret.Rectangle;
      private switchModeButton: eui.Component;

      public constructor() {
        super('BARoadmapLeftPanel');
      }
      public changeLang() {
        this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + this.totalBet;
      }
      protected mount() {
        this.init();
      }

      protected init() {
        this.mask = this.contentMask;

        this.gameId = '';
        this.totalBet = 0;

        const gridSize = 43;
        const numColumn = 16;

        this.beadRoad = new BABeadRoad(numColumn, gridSize);
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
    }
  }
}
