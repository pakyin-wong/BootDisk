namespace we {
  export namespace ro {
    export class MobileBottomGamePanel extends core.BaseGamePanel {
      public isPanelOpen: boolean = true;

      protected gameId: string = '';
      protected totalBet: number = 0;

      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;

      protected _arrow: egret.DisplayObject;
      protected _arrowUp: egret.DisplayObject;

      public beadRoad: ROBeadRoad;
      public colorBigRoad: ROColorBigRoad;
      public sizeBigRoad: ROSizeBigRoad;
      public oddBigRoad: ROOddBigRoad;

      protected beadRoadConfig: RoadMapConfig;
      protected colorBigRoadConfig: RoadMapConfig;
      protected sizeBigRoadConfig: RoadMapConfig;
      protected oddBigRoadConfig: RoadMapConfig;

      // table info panel
      public _tableInfoPanel: ba.TableInfoPanel;
      public _betLimitDropDownBtn: ui.RunTimeLabel;

      // statisticChartPanel
      public _statisticChartPanel: ba.StatisticChartPanel;

      // viewStack and radioBtn
      protected historyBtn: eui.RadioButton;
      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;
      protected tableInfoBtn: eui.RadioButton;

      protected _gameInfoLabel: ui.RunTimeLabel;

      protected viewStack: eui.ViewStack;
      protected viewStackMask: eui.Rect;

      protected colorRoadBtn: eui.RadioButton;
      protected sizeRoadBtn: eui.RadioButton;
      protected oddevenRoadBtn: eui.RadioButton;

      protected _roadmapBg: eui.Component;
      protected _roadmapView: eui.ViewStack;

      public constructor(skin?: string) {
        super('ro.MobileBottomGamePanel');
      }

      protected mount() {
        super.mount();

        this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;

        this.initHistoryRoad();
        this.initRoadMap();
        this.addListeners();

        this.updateText();
        this.updateMode();
        this.viewStack.mask = this.viewStackMask;
        this.viewStack.selectedIndex = 0;
        this.onPanelToggle();
      }

      public destroy() {
        super.destroy();

        this.beadRoad.dispose();
        this.colorBigRoad.dispose();
        this.sizeBigRoad.dispose();
        this.oddBigRoad.dispose();

        this.removeListeners();
      }

      protected initHistoryRoad() {
        this.beadRoad = new ROBeadRoad(
          this.beadRoadConfig.roadmap_row,
          this.beadRoadConfig.roadmap_col,
          this.beadRoadConfig.roadmap_gridSize,
          1,
          this.beadRoadConfig.roadmap_offsetX,
          this.beadRoadConfig.roadmap_offsetY,
          0x262a2b,
          1
        );
        this.beadRoad.$x = this.beadRoadConfig.x;
        this.beadRoad.$y = this.beadRoadConfig.y;
        this.beadRoadConfig.parent.addChild(this.beadRoad);
      }

      protected initRoadMap() {
        this.colorBigRoad = new ROColorBigRoad(this.colorBigRoadConfig.roadmap_col, this.colorBigRoadConfig.roadmap_gridSize, 1, false);
        this.colorBigRoadConfig.parent.addChild(this.colorBigRoad);

        this.sizeBigRoad = new ROSizeBigRoad(this.sizeBigRoadConfig.roadmap_col, this.sizeBigRoadConfig.roadmap_gridSize, 1, false);
        this.sizeBigRoadConfig.parent.addChild(this.sizeBigRoad);

        this.oddBigRoad = new ROOddBigRoad(this.oddBigRoadConfig.roadmap_col, this.oddBigRoadConfig.roadmap_gridSize, 1, false);
        this.oddBigRoadConfig.parent.addChild(this.oddBigRoad);
      }

      protected addListeners() {
        this._arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelToggle, this);
        this._arrowUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelToggle, this);

        this.historyBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.roadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.colorRoadBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.sizeRoadBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.oddevenRoadBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        dir.evtHandler.addEventListener(core.Event.MODE_UPDATE, this.updateMode, this);
      }

      protected removeListeners() {
        this._arrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelToggle, this);
        this._arrowUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelToggle, this);

        this.historyBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.roadSheetBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.colorRoadBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.sizeRoadBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this.oddevenRoadBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);

        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        dir.evtHandler.removeEventListener(core.Event.MODE_UPDATE, this.updateMode, this);
      }

      public updateText() {
        this.gameIdLabel.text = this.gameId + ' ' + i18n.t('baccarat.gameroundid');
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + this.totalBet;

        this.historyBtn.label = i18n.t('mobile_game_panel_history');
        this.roadSheetBtn.label = i18n.t('mobile_game_panel_road_sheet');
        this.chartBtn.label = i18n.t('mobile_game_panel_statistic_chart');
        this.tableInfoBtn.label = i18n.t('mobile_game_panel_table_info');
        this._gameInfoLabel.text = i18n.t('mobile_panel_game_Info');

        this.colorRoadBtn.label = i18n.t('roulette.betGroup.color');
        this.sizeRoadBtn.label = i18n.t('roulette.betGroup.size');
        this.oddevenRoadBtn.label = i18n.t('roulette.betGroup.oddeven');
      }

      public manualClose() {
        if (this.isPanelOpen) {
          this.currentState = 'off';
          egret.Tween.removeTweens(this.viewStack);
          egret.Tween.removeTweens(this.viewStackMask);
          this.isPanelOpen = false;
          egret.Tween.get(this.viewStack).to({ height: 0 }, 250);
          egret.Tween.get(this.viewStackMask).to({ height: 0 }, 250);
        }
      }

      protected onPanelToggle() {
        this.currentState = this.isPanelOpen ? 'off' : 'on';

        egret.Tween.removeTweens(this.viewStack);
        egret.Tween.removeTweens(this.viewStackMask);

        if (this.isPanelOpen) {
          this.isPanelOpen = false;
          egret.Tween.get(this.viewStack).to({ height: 0 }, 250);
          egret.Tween.get(this.viewStackMask).to({ height: 0 }, 250);
        } else {
          this.isPanelOpen = true;
          egret.Tween.get(this.viewStack).to({ height: 532 }, 250);
          egret.Tween.get(this.viewStackMask).to({ height: 532 }, 250);
        }

        this.dispatchEvent(new egret.Event('TOGGLE'));
      }

      protected onViewChange(e: eui.UIEvent) {
        this.viewStack.selectedIndex = e.target.value;
      }

      protected onRoadMapChanged(e) {
        this._roadmapView.selectedIndex = e.target.value;
      }

      protected updateMode() {
        this._roadmapBg.currentState = env.mode === 1 ? 'dark' : 'light';
      }

      public update() {
        if (this.tableInfo && this.tableInfo.betInfo) {
          this.tableInfo.betInfo.gameroundid && (this.gameId = this.tableInfo.betInfo.gameroundid);
          this.tableInfo.betInfo.total && (this.totalBet = this.tableInfo.betInfo.total);
          this._tableInfoPanel.setValue(this.tableInfo);
          this.updateText();

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
        }
      }
    }
  }
}
