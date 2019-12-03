namespace we {
  export namespace ba {
    export class BARoadmapLeftPanel extends ui.Panel {
      public beadRoad: BABeadRoad;
      private gameIdLabel: ui.RunTimeLabel;
      private totalBetLabel: ui.RunTimeLabel;
      private gameId: string;
      private totalBet: number;

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
        this.gameId = '';
        this.totalBet = 0;

        const gridSize = 43;
        const numColumn = 16;

        this.beadRoad = new BABeadRoad(numColumn, gridSize);
        this.beadRoad.x = 0;
        this.beadRoad.y = 44;
        this.addChild(this.beadRoad);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      public setGameInfo(gameId: string, totalBet: number) {
        this.gameId = gameId;
        this.totalBet = totalBet;
        this.changeLang();
      }
    }
  }
}
