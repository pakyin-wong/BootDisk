namespace we {
  export namespace ro {
    export class MobileBottomGamePanel extends core.BaseGamePanel {
      // Left Roadmap
      // public beadRoad: ba.BABeadRoad;

      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;
      protected gameId: string;
      protected totalBet: number;
      // protected switchModeButton: eui.Component;

      protected _arrow: egret.DisplayObject;
      protected _arrowUp: egret.DisplayObject;
      public isPanelOpen: boolean = true;

      // Right Roadmap
      // public bigRoad: ba.BABigRoad;
      // public bigEyeRoad: ba.BABigEyeRoad;
      // public smallRoad: ba.BASmallRoad;
      // public cockroachRoad: ba.BACockroachRoad;

      // public iconBankerBead: ba.BABeadRoadIcon;
      // public iconPlayerBead: ba.BABeadRoadIcon;
      // protected iconBankerBigEye: ba.BABigEyeRoadIcon;
      // protected iconPlayerBigEye: ba.BABigEyeRoadIcon;
      // protected iconBankerSmall: ba.BASmallRoadIcon;
      // protected iconPlayerSmall: ba.BASmallRoadIcon;
      // protected iconBankerCockroach: ba.BACockroachRoadIcon;
      // protected iconPlayerCockroach: ba.BACockroachRoadIcon;

      // protected iconBankerCount;
      // protected iconPlayerCount;
      // protected iconTieCount;
      // protected iconBankerPairCount;
      // protected iconPlayerPairCount;

      // protected bankerCountLabel: ui.RunTimeLabel;
      // protected playerCountLabel: ui.RunTimeLabel;
      // protected tieCountLabel: ui.RunTimeLabel;
      // protected bankerPairCountLabel: ui.RunTimeLabel;
      // protected playerPairCountLabel: ui.RunTimeLabel;
      // protected totalCountLabel: ui.RunTimeLabel;

      // protected playerButtonLabel: ui.RunTimeLabel;
      // protected bankerButtonLabel: ui.RunTimeLabel;

      // protected roadsContainer: egret.DisplayObjectContainer;

      // protected totalCount: number;

      // table info panel
      public _tableInfoPanel: ba.TableInfoPanel;
      public _betLimitDropDownBtn: ui.RunTimeLabel;

      // statisticChartPanel
      public _statisticChartPanel: ba.StatisticChartPanel;

      // viewStack and radioBtn
      protected _roadmapGroup: eui.Group;
      protected _infoGroup: eui.Group;

      protected historyBtn: eui.RadioButton;
      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;
      protected tableInfoBtn: eui.RadioButton;

      protected _gameInfoLabel: ui.RunTimeLabel;

      protected viewStack: eui.ViewStack;
      protected viewStackMask: eui.Rect;

      protected _verGroup: eui.Group;

      public constructor(skin?: string) {
        super(skin || !env.isMobile ? skin : 'ro.MobileBottomGamePanel');
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;
        // this.totalCount = 0;
        this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;

        const gridSizeL = 73;
        const gridSizeR = 38;
        const numColumn = 8;

        // this.beadRoad = new ba.BABeadRoad(numColumn, gridSizeL, 1, true);
        // this.beadRoad.x = 0;
        // this.beadRoad.y = 98;
        // this._roadmapGroup.addChild(this.beadRoad);

        // this.iconBankerBead = new BABeadRoadIcon(52);
        // this.iconBankerBead.x = 15;
        // this.iconBankerBead.y = 23;
        // this.iconBankerBead.setByObject({ v: 'b' });
        // this._roadmapGroup.addChild(this.iconBankerBead);

        // this.iconBankerBigEye = new ba.BABigEyeRoadIcon(27);
        // this.iconBankerBigEye.x = 146;
        // this.iconBankerBigEye.y = 36;
        // this.iconBankerBigEye.setByObject({ v: 'b' });
        // this._roadmapGroup.addChild(this.iconBankerBigEye);

        // this.iconBankerSmall = new ba.BASmallRoadIcon(27);
        // this.iconBankerSmall.x = 177;
        // this.iconBankerSmall.y = 36;
        // this.iconBankerSmall.setByObject({ v: 'b' });
        // this._roadmapGroup.addChild(this.iconBankerSmall);

        // this.iconBankerCockroach = new ba.BACockroachRoadIcon(27);
        // this.iconBankerCockroach.x = 208;
        // this.iconBankerCockroach.y = 36;
        // this.iconBankerCockroach.setByObject({ v: 'b' });
        // this._roadmapGroup.addChild(this.iconBankerCockroach);

        // this.iconPlayerBead = new BABeadRoadIcon(52);
        // this.iconPlayerBead.x = 247;
        // this.iconPlayerBead.y = 23;
        // this.iconPlayerBead.setByObject({ v: 'p' });
        // this._roadmapGroup.addChild(this.iconPlayerBead);

        // this.iconPlayerBigEye = new ba.BABigEyeRoadIcon(27);
        // this.iconPlayerBigEye.x = 379;
        // this.iconPlayerBigEye.y = 36;
        // this.iconPlayerBigEye.setByObject({ v: 'p' });
        // this._roadmapGroup.addChild(this.iconPlayerBigEye);

        // this.iconPlayerSmall = new ba.BASmallRoadIcon(27);
        // this.iconPlayerSmall.x = 410;
        // this.iconPlayerSmall.y = 36;
        // this.iconPlayerSmall.setByObject({ v: 'p' });
        // this._roadmapGroup.addChild(this.iconPlayerSmall);

        // this.iconPlayerCockroach = new ba.BACockroachRoadIcon(27);
        // this.iconPlayerCockroach.x = 441;
        // this.iconPlayerCockroach.y = 36;
        // this.iconPlayerCockroach.setByObject({ v: 'p' });
        // this._roadmapGroup.addChild(this.iconPlayerCockroach);

        // this.roadsContainer = new egret.DisplayObjectContainer();
        // this.roadsContainer.x = 0;
        // this.roadsContainer.y = 0;
        // this._roadmapGroup.addChild(this.roadsContainer);

        // this.bigRoad = new ba.BABigRoad(18, gridSizeR);
        // this.bigRoad.x = 584;
        // this.bigRoad.y = 98;
        // this.roadsContainer.addChild(this.bigRoad);

        // this.bigEyeRoad = new ba.BABigEyeRoad(18 * 2, gridSizeR);
        // this.bigEyeRoad.x = 584;
        // this.bigEyeRoad.y = 98 + 6 * gridSizeR;
        // this.roadsContainer.addChild(this.bigEyeRoad);

        // this.smallRoad = new ba.BASmallRoad(9 * 2, gridSizeR);
        // this.smallRoad.x = 584;
        // this.smallRoad.y = 98 + 6 * gridSizeR + 6 * (gridSizeR / 2);
        // this.roadsContainer.addChild(this.smallRoad);

        // this.cockroachRoad = new ba.BACockroachRoad(9 * 2, gridSizeR);
        // this.cockroachRoad.x = 584 + gridSizeR * 9;
        // this.cockroachRoad.y = 98 + 6 * gridSizeR + 6 * (gridSizeR / 2);
        // this.roadsContainer.addChild(this.cockroachRoad);

        // this.switchModeButton.touchEnabled = true;
        // this.switchModeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchModeClick, this);
        // this.switchModeButton.x = 510;
        // this.switchModeButton.y = 462;
        // this._roadmapGroup.addChild(this.switchModeButton);

        this.historyBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.roadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();

        this._arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelOpen, this);
        this._arrowUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelOpen, this);

        this.viewStack.mask = this.viewStackMask;
        this.createVerLayout();

        this.viewStack.selectedIndex = 0;

        this.onPanelOpen();
      }

      public changeLang() {
        this.gameIdLabel.text = this.gameId + ' ' + i18n.t('baccarat.gameroundid');
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + this.totalBet;
        // this.totalCountLabel.text = '' + this.totalCount;

        this.roadSheetBtn.label = i18n.t('mobile_game_panel_road_sheet');
        this.chartBtn.label = i18n.t('mobile_game_panel_statistic_chart');
        this.tableInfoBtn.label = i18n.t('mobile_game_panel_table_info');
        this._gameInfoLabel.text = i18n.t('mobile_panel_game_Info');

        // this.playerButtonLabel.text = i18n.t('baccarat.askPlayer');
        // this.bankerButtonLabel.text = i18n.t('baccarat.askBanker');
      }

      protected onPanelOpen() {
        this.historyBtn.visible = !this.isPanelOpen;
        this.roadSheetBtn.visible = !this.isPanelOpen;
        this.chartBtn.visible = !this.isPanelOpen;
        this.tableInfoBtn.visible = !this.isPanelOpen;
        this._gameInfoLabel.visible = this.isPanelOpen;
        this._arrow.visible = !this.isPanelOpen;
        this._arrowUp.visible = this.isPanelOpen;

        if (this.isPanelOpen) {
          this.isPanelOpen = false;
          egret.Tween.get(this.viewStack).to({ height: 0 }, 250);
          egret.Tween.get(this.viewStackMask).to({ height: 0 }, 250);
        } else {
          this.isPanelOpen = true;
          egret.Tween.get(this.viewStack).to({ height: 532 }, 250);
          egret.Tween.get(this.viewStackMask).to({ height: 532 }, 250);
        }
      }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.viewStack.selectedIndex = radio.value;
      }

      protected onSwitchModeClick(e: egret.TouchEvent) {
        // this.beadRoad.Mode = ++this.beadRoad.Mode % 2;
      }

      protected createVerLayout() {
        const vLayout: eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        vLayout.gap = 0;
        this._verGroup.layout = vLayout;
      }

      public setPredictIcons(b1: any, b2: any, b3: any, p1: any, p2: any, p3: any) {
        // this.iconBankerBigEye.setByObject(b1);
        // this.iconBankerSmall.setByObject(b2);
        // this.iconBankerCockroach.setByObject(b3);

        // this.iconPlayerBigEye.setByObject(p1);
        // this.iconPlayerSmall.setByObject(p2);
        // this.iconPlayerCockroach.setByObject(p3);

        this.update();
      }

      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.betInfo) {
            if (this.tableInfo.betInfo.gameroundid) {
              this.gameId = this.tableInfo.betInfo.gameroundid;
            }
            if (this.tableInfo.betInfo.total) {
              this.totalBet = this.tableInfo.betInfo.total;
            }
          }
          // if (this.tableInfo.gamestatistic) {
          //   if (this.tableInfo.gamestatistic.bankerCount) {
          //     this.bankerCountLabel.text = this.tableInfo.gamestatistic.bankerCount.toString();
          //   }
          //   if (this.tableInfo.gamestatistic.playerCount) {
          //     this.playerCountLabel.text = this.tableInfo.gamestatistic.playerCount.toString();
          //   }
          //   if (this.tableInfo.gamestatistic.tieCount) {
          //     this.tieCountLabel.text = this.tableInfo.gamestatistic.tieCount.toString();
          //   }
          //   if (this.tableInfo.gamestatistic.bankerPairCount) {
          //     this.bankerPairCountLabel.text = this.tableInfo.gamestatistic.bankerPairCount.toString();
          //   }
          //   if (this.tableInfo.gamestatistic.playerPairCount) {
          //     this.playerPairCountLabel.text = this.tableInfo.gamestatistic.playerPairCount.toString();
          //   }
          //   if (this.tableInfo.gamestatistic.totalCount) {
          //     this.totalCount = this.tableInfo.gamestatistic.totalCount;
          //   }
          // }
          this.changeLang();
        }
      }

      public destroy() {
        super.destroy();

        // this.beadRoad.dispose();
        // this.bigRoad.dispose();
        // this.bigEyeRoad.dispose();
        // this.smallRoad.dispose();
        // this.cockroachRoad.dispose();

        // if (this.switchModeButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
        //   this.switchModeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchModeClick, this);
        // }

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }

        this._arrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelOpen, this);
        this._arrowUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelOpen, this);
      }
    }
  }
}
