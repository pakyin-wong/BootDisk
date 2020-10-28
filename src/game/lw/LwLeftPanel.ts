namespace we {
  export namespace lw {
    export class LwLeftPanel extends core.BaseGamePanel {
      public beadRoad: LwBeadRoad;
      protected gameId: string;
      protected _totalBet: number;

      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;

      protected topBar: ui.RoundRectShape;
      protected bg: ui.RoundRectShape;
      protected toggleUpDownButton: eui.ToggleSwitch;
      protected isExpanded: boolean;

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

        this.beadRoad = new LwBeadRoad(7, 11, 65, 65, 44, 44, 1, 0x000000, 0.85, 0x3a3f48, true); // in game
        this.beadRoad.x = 1;
        this.beadRoad.y = 43;
        this.beadRoad.scaleX = 689 / 689;
        this.beadRoad.scaleY = 689 / 689;
        this.beadRoad.numRowCollapse = 4;//number of row when collapse
        this.beadRoad.setGridCorners({ tl: 0, tr: 0, bl: 14, br: 14 });

        this.beadRoad.parseRoadData([{ v: '01', gameRoundID: 'cde345' }, { v: '02', gameRoundID: 'g34345' }, { v: '03', gameRoundID: 'g45454' }]);
        //this.beadRoad.expandRoad(true);
        this.addChild(this.beadRoad);

        this.toggleUpDownButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggleUpDown, this, true);

        this.changeLang();
      }

      public onToggleUpDown(evt: egret.TouchEvent) {
        this.expandPanel(!this.isExpanded);
      }

      public expandPanel(expand: boolean) {
        const offset = 196;
        if (!this.isExpanded && expand) {
          this.bg.setRoundRectStyle(717, 304 + offset, { tl: 14, tr: 14, br: 14, bl: 14 }, '0x131313', 0.7, 2, 0x3a3f48);
          this.bg.y -= offset;
          this.topBar.y -= offset;
          this.gameIdLabel.y -= offset;
          this.totalBetLabel.y -= offset;
          this.toggleUpDownButton.y -= offset;
          this.isExpanded = true;
          this.toggleUpDownButton.currentState = 'b_down';
          this.beadRoad.expandRoad(true);
          this.beadRoad.y -= offset;
        } else if (this.isExpanded && !expand) {
          this.bg.setRoundRectStyle(717, 304, { tl: 14, tr: 14, br: 14, bl: 14 }, '0x131313', 0.7, 2, 0x3a3f48);
          this.bg.y += offset;
          this.topBar.y += offset;
          this.gameIdLabel.y += offset;
          this.totalBetLabel.y += offset;
          this.toggleUpDownButton.y += offset;
          this.isExpanded = false;
          this.toggleUpDownButton.currentState = 'b_up';
          this.beadRoad.expandRoad(false);
          this.beadRoad.y += offset;
        }
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

          if (this.tableInfo.data.state === core.GameState.DEAL && env.isAutoDismiss) {
            this.expandPanel(false);
          }
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
