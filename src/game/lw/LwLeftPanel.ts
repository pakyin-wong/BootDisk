namespace we {
  export namespace lw {
    export class LwLeftPanel extends core.BaseGamePanel {
      public beadRoad: LwBeadRoad;
      protected gameId: string;
      protected _totalBet: number;

      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'LwLeftPanel');
      }
      public changeLang() {
        this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + utils.numberToFaceValue(this._totalBet);
      }

      protected init() {
        this.gameId = '';
        this._totalBet = 0;

        this.beadRoad = new LwBeadRoad(4, 11, 65, 65, 44, 44, 1, 0x000000, 0.85, 0x3a3f48, true); // in game
        this.beadRoad.x = 1;
        this.beadRoad.y = 43;
        this.beadRoad.scaleX = 689 / 689;
        this.beadRoad.scaleY = 689 / 689;

        this.beadRoad.parseRoadData([{ v: '01', gameRoundID: 'cde345' }, { v: '02', gameRoundID: 'g34345' }, { v: '03', gameRoundID: 'g45454' }]);
        this.addChild(this.beadRoad);
        this.changeLang();
      }

      set totalBet(total: number) {
        this._totalBet = total;
        // this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + utils.numberToFaceValue(this._totalBet);
      }

      public update() {
        super.update();
        if (this.tableInfo && this.tableInfo.data) {
          this.gameId = this.tableInfo.data.gameroundid;
          this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        }
      }

      public updateTableBetInfo() {
        if (this.tableInfo && this.tableInfo.data) {
          if (this.tableInfo.betInfo) {
            this._totalBet = this.tableInfo.betInfo.gameroundid === this.tableInfo.data.gameroundid ? this.tableInfo.betInfo.total : 0;
            this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + utils.numberToFaceValue(this._totalBet);
          }
        }
      }

      public destroy() {
        super.destroy();
        // following BARoadmapLeftPanel
        this.beadRoad.dispose();
      }
    }
  }
}
