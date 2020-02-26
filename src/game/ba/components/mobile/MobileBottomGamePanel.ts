namespace we {
  export namespace ba {
    export class MobileBottomGamePanel extends core.BaseGamePanel {
      // Left Roadmap
      public beadRoad: BABeadRoad;

      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;
      protected gameId: string;
      protected totalBet: number;
      protected switchModeButton: eui.Component;

      // Right Roadmap
      public bigRoad: BABigRoad;
      public bigEyeRoad: BABigEyeRoad;
      public smallRoad: BASmallRoad;
      public cockroachRoad: BACockroachRoad;

      public iconBankerBead: BABeadRoadIcon;
      public iconPlayerBead: BABeadRoadIcon;
      protected iconBankerBigEye: BABigEyeRoadIcon;
      protected iconPlayerBigEye: BABigEyeRoadIcon;
      protected iconBankerSmall: BASmallRoadIcon;
      protected iconPlayerSmall: BASmallRoadIcon;
      protected iconBankerCockroach: BACockroachRoadIcon;
      protected iconPlayerCockroach: BACockroachRoadIcon;

      protected iconBankerCount;
      protected iconPlayerCount;
      protected iconTieCount;
      protected iconBankerPairCount;
      protected iconPlayerPairCount;

      protected bankerCountLabel: ui.RunTimeLabel;
      protected playerCountLabel: ui.RunTimeLabel;
      protected tieCountLabel: ui.RunTimeLabel;
      protected bankerPairCountLabel: ui.RunTimeLabel;
      protected playerPairCountLabel: ui.RunTimeLabel;
      protected totalCountLabel: ui.RunTimeLabel;

      protected roadsContainer: egret.DisplayObjectContainer;

      protected totalCount: number;

      // table info panel
      protected _tableInfoPanel: ui.TableInfoPanel;
      protected _tableId: string;
      protected _tableInfo: data.TableInfo;
      protected _betDetails: data.BetDetail[];
      protected _previousState: number;
      protected _gameData: we.data.GameData;

      // viewStack and radioBtn

      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;
      protected tableInfoBtn: eui.RadioButton;
      protected viewStack: eui.ViewStack;

      public constructor(skin?: string) {
        super(skin ? skin : 'ba/MobileBottomGamePanel');
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;
        this.totalCount = 0;

        const gridSizeL = 73;
        const gridSizeR = 38;
        const numColumn = 8;

        this.beadRoad = new BABeadRoad(numColumn, gridSizeL, 1, true);
        this.beadRoad.x = 0;
        this.beadRoad.y = 198;
        // this.beadRoad.scaleX = 592 / 591;
        // this.beadRoad.scaleY = 690 / 689;
        this.addChild(this.beadRoad);

        this.iconBankerBead = new BABeadRoadIcon(28);
        this.iconBankerBead.x = 22;
        this.iconBankerBead.y = 9;
        this.iconBankerBead.setByObject({ v: 'b' });
        this.addChild(this.iconBankerBead);

        this.iconBankerBigEye = new BABigEyeRoadIcon(14);
        this.iconBankerBigEye.x = 58;
        this.iconBankerBigEye.y = 16;
        this.iconBankerBigEye.setByObject({ v: 'b' });
        this.addChild(this.iconBankerBigEye);

        this.iconBankerSmall = new BASmallRoadIcon(14);
        this.iconBankerSmall.x = 76;
        this.iconBankerSmall.y = 16;
        this.iconBankerSmall.setByObject({ v: 'b' });
        this.addChild(this.iconBankerSmall);

        this.iconBankerCockroach = new BACockroachRoadIcon(20);
        this.iconBankerCockroach.x = 94;
        this.iconBankerCockroach.y = 16;
        this.iconBankerCockroach.setByObject({ v: 'b' });
        this.addChild(this.iconBankerCockroach);

        this.iconPlayerBead = new BABeadRoadIcon(28);
        this.iconPlayerBead.x = 124;
        this.iconPlayerBead.y = 9;
        this.iconPlayerBead.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerBead);

        this.iconPlayerBigEye = new BABigEyeRoadIcon(14);
        this.iconPlayerBigEye.x = 160;
        this.iconPlayerBigEye.y = 16;
        this.iconPlayerBigEye.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerBigEye);

        this.iconPlayerSmall = new BASmallRoadIcon(14);
        this.iconPlayerSmall.x = 178;
        this.iconPlayerSmall.y = 16;
        this.iconPlayerSmall.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerSmall);

        this.iconPlayerCockroach = new BACockroachRoadIcon(20);
        this.iconPlayerCockroach.x = 196;
        this.iconPlayerCockroach.y = 16;
        this.iconPlayerCockroach.setByObject({ v: 'p' });
        this.addChild(this.iconPlayerCockroach);

        this.roadsContainer = new egret.DisplayObjectContainer();
        this.roadsContainer.x = 4;
        this.roadsContainer.y = 47;
        // this.roadsContainer.scaleX = 690 / 693;
        // this.roadsContainer.scaleY = 260 / 257;
        // this.roadsContainer.alpha = 0.5;
        this.addChild(this.roadsContainer);

        this.bigRoad = new BABigRoad(33, gridSizeR);
        this.bigRoad.x = 0;
        this.bigRoad.y = 0;
        this.roadsContainer.addChild(this.bigRoad);

        this.bigEyeRoad = new BABigEyeRoad(33 * 2, gridSizeR);
        this.bigEyeRoad.x = 0;
        this.bigEyeRoad.y = 6 * gridSizeR;
        this.roadsContainer.addChild(this.bigEyeRoad);

        this.smallRoad = new BASmallRoad(17 * 2, gridSizeR);
        this.smallRoad.x = 0;
        this.smallRoad.y = 6 * gridSizeR + 6 * (gridSizeR / 2);
        this.roadsContainer.addChild(this.smallRoad);

        this.cockroachRoad = new BACockroachRoad(16 * 2, gridSizeR);
        this.cockroachRoad.x = gridSizeR * 17;
        this.cockroachRoad.y = 6 * gridSizeR + 6 * (gridSizeR / 2);
        this.roadsContainer.addChild(this.cockroachRoad);

        this.switchModeButton.touchEnabled = true;
        this.switchModeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchModeClick, this);
        this.addChild(this.switchModeButton);

        // if (this._tableInfoPanel) {
        //   this._tableInfoPanel.setValue(this._tableInfo);
        // }
        this.roadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      public changeLang() {
        this.gameIdLabel.text = this.gameId + ' ' + i18n.t('baccarat.gameroundid');
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + this.totalBet;
        this.totalCountLabel.text = i18n.t('baccarat.totalcount') + ' ' + this.totalCount;

        // this.roadSheetBtn['labelDisplayDown']['text'] = this.roadSheetBtn['labelDisplayUp']['text'] = i18n.t('mobile_game_panel_road_sheet');
        // this.chartBtn['labelDisplayDown']['text'] = this.chartBtn['labelDisplayUp']['text'] = i18n.t('mobile_game_panel_statistic_chart');
        // this.tableInfoBtn['labelDisplayDown']['text'] = this.tableInfoBtn['labelDisplayUp']['text'] = i18n.t('mobile_game_panel_table_info');
      }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.viewStack.selectedIndex = radio.value;
      }

      protected onSwitchModeClick(e: egret.TouchEvent) {
        this.beadRoad.Mode = ++this.beadRoad.Mode % 2;
      }

      public setPredictIcons(b1: any, b2: any, b3: any, p1: any, p2: any, p3: any) {
        this.iconBankerBigEye.setByObject(b1);
        this.iconBankerSmall.setByObject(b2);
        this.iconBankerCockroach.setByObject(b3);

        this.iconPlayerBigEye.setByObject(p1);
        this.iconPlayerSmall.setByObject(p2);
        this.iconPlayerCockroach.setByObject(p3);

        this.update();
      }

      protected onTableInfoUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo>evt.data;
          if (tableInfo.tableid === this._tableId) {
            // update the scene
            this._tableInfo = tableInfo;
            this._betDetails = tableInfo.bets;
            this._previousState = this._gameData ? this._gameData.previousstate : null;
            this._gameData = this._tableInfo.data;
            this.update();
          }
        }
      }

      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.betInfo || this.tableInfo.gamestatistic) {
            this.gameId = this.tableInfo.betInfo.gameroundid;
            this.totalBet = this.tableInfo.betInfo.total;
            this.bankerCountLabel.text = this.tableInfo.gamestatistic.bankerCount.toString();
            this.playerCountLabel.text = this.tableInfo.gamestatistic.playerCount.toString();
            this.tieCountLabel.text = this.tableInfo.gamestatistic.tieCount.toString();
            this.bankerPairCountLabel.text = this.tableInfo.gamestatistic.bankerPairCount.toString();
            this.playerPairCountLabel.text = this.tableInfo.gamestatistic.playerPairCount.toString();
            this.totalCount = this.tableInfo.gamestatistic.totalCount;
            this.changeLang();
          }
        }
        // if (this._tableInfoPanel) {
        //   this._tableInfoPanel.setValue(this._tableInfo);
        // }
      }

      public destroy() {
        super.destroy();

        this.beadRoad.dispose();
        this.bigRoad.dispose();
        this.bigEyeRoad.dispose();
        this.smallRoad.dispose();
        this.cockroachRoad.dispose();

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
