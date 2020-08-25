namespace we {
  export namespace ba {
    export class BARoadmapLeftPanel extends core.BaseGamePanel {
      public beadRoad: BABeadRoad;
      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;
      protected gameId: string;
      protected totalBet: number;
      protected switchModeButton: eui.Component;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'BARoadmapLeftPanel');
      }
      public changeLang() {
        // this.gameIdText.text = i18n.t('baccarat.gameroundid') + ' ';
        this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + utils.numberToFaceValue(this.totalBet);
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;
        // this.gameIdText.alpha = 0.7;
        // this.gameIdLabel.alpha = 0.7;

        const gridSize = 43;
        const numColumn = 16;

        this.beadRoad = new BABeadRoad(numColumn, gridSize, 1, true);
        this.beadRoad.x = 0;
        this.beadRoad.y = 43;
        this.beadRoad.scaleX = 690 / 689;
        // this.beadRoad.scaleY = 690 / 689;
        this.addChild(this.beadRoad);

        this.switchModeButton.touchEnabled = true;
        this.switchModeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchModeClick, this);
        this.addChild(this.switchModeButton);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      protected onSwitchModeClick(e: egret.TouchEvent) {
        this.beadRoad.Mode = ++this.beadRoad.Mode % 2;
      }

      public update() {
        super.update();
        if (this.tableInfo) {
          this.gameId = this.tableInfo.data.gameroundid;
          this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' a ' + this.gameId;
        }
      }

      public updateTableBetInfo() {
        if (this.tableInfo.betInfo) {
          this.totalBet = this.tableInfo.betInfo.gameroundid === this.tableInfo.data.gameroundid ? this.tableInfo.betInfo.total : 0;
          this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + utils.numberToFaceValue(this.totalBet);
        }
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
