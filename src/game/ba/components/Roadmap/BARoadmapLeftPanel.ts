namespace we {
  export namespace ba {
    export class BARoadmapLeftPanel extends core.BaseGamePanel {
      public beadRoad: BABeadRoad;
      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;
      protected gameId: string;
      protected totalBet: number;
      protected switchModeButton: ui.BaseAnimationButton;

      protected modeLabel: eui.Label;
      protected modeLayer: eui.Group;

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

        const gridSize = 43;
        const numColumn = 16;

        const slot = this.switchModeButton._display.armature.getSlot('d_ba_roadmap_btn_swap_number');
        this.modeLabel = new eui.Label();
        this.modeLabel.fontFamily = 'Barlow';
        this.modeLabel.size = 22;
        this.modeLabel.text = '9';
        this.modeLabel.bold = true;
        this.modeLabel.textColor = 0xffffff;
        this.modeLayer = new eui.Group();
        this.modeLayer.addChild(this.modeLabel);
        this.modeLayer.anchorOffsetX = this.modeLabel.width * 0.5;
        this.modeLayer.anchorOffsetY = this.modeLabel.height * 0.5;
        slot.display = this.modeLayer;

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
        if (this.beadRoad.Mode === 1) {
          this.modeLabel.size = 18;
          this.modeLabel.text = i18n.t('baccarat.bankerShort');
          this.modeLayer.anchorOffsetX = this.modeLabel.width * 0.55;
        } else {
          this.modeLabel.size = 22;
          this.modeLabel.text = '9';
          this.modeLayer.anchorOffsetX = this.modeLabel.width * 0.5;
        }
      }

      public update() {
        super.update();
        if (this.tableInfo) {
          this.gameId = this.tableInfo.data.gameroundid;
          this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        }
      }

      public updateTableBetInfo() {
        if (this.tableInfo.betInfo) {
          this.totalBet = this.tableInfo.roundid === this.tableInfo.data.gameroundid ? this.tableInfo.totalBet : 0;
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
