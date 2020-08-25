namespace we {
  export namespace ba {
    export class MobileBottomGamePanel extends ui.MobileBottomCommonPanel {
      // roadmap Panel
      public _roadmapPanel: ba.MobileBottomRoadmapPanel;

      // table info panel
      public _tableInfoPanel: ba.TableInfoPanel;
      public _betLimitDropDownBtn: ui.RunTimeLabel;

      // statisticChartPanel
      protected _normalChartPanel: ba.StatisticChartPanel;
      protected _normalPairChartPanel: ba.StatisticChartPanel;
      protected _shoeChartPanel: ba.StatisticChartPanel;
      protected _shoePairChartPanel: ba.StatisticChartPanel;

      // viewStack and radioBtn
      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;
      protected tableInfoBtn: eui.RadioButton;

      protected _roadmapGroup: eui.Group;
      protected _chartGroup: eui.Group;
      protected _infoGroup: eui.Group;

      public constructor(skin?: string) {
        super(skin || !env.isMobile ? skin : 'ba.MobileBottomGamePanel');
      }

      protected mount() {
        super.mount();

        this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;
      }

      protected addListeners() {
        super.addListeners();
        this.roadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      protected removeListeners() {
        super.removeListeners();
        this.roadSheetBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      public updateText() {
        super.updateText();

        this.roadSheetBtn.label = i18n.t('mobile_game_panel_road_sheet');
        this.chartBtn.label = i18n.t('mobile_game_panel_statistic_chart');
        this.tableInfoBtn.label = i18n.t('mobile_game_panel_table_info');
      }

      public destroy() {
        super.destroy();
        this._roadmapGroup.removeChildren();
        // this._chartGroup.removeChildren();
        // this._infoGroup.removeChildren();
        this.removeListeners();
      }

      public updateStat() {
        super.updateStat();
        if (!this.tableInfo) {
          return;
        }
        const normalInfo = we.utils.stat.ba.getStatInfo(false, this.tableInfo.gamestatistic);

        this._normalChartPanel.firstCount = normalInfo.bankerCount;
        this._normalChartPanel.secondCount = normalInfo.playerCount;
        this._normalChartPanel.thirdCount = normalInfo.tieCount;
        this._normalChartPanel.firstPercentage = normalInfo.bankerPercentage;
        this._normalChartPanel.secondPercentage = normalInfo.playerPercentage;
        this._normalChartPanel.thirdPercentage = normalInfo.tiePercentage;
        this._normalChartPanel.total = normalInfo.totalCount;
        this._normalChartPanel.update();

        this._normalPairChartPanel.firstCount = normalInfo.bankerPairCount;
        this._normalPairChartPanel.secondCount = normalInfo.playerPairCount;
        this._normalPairChartPanel.thirdCount = normalInfo.remainingCount;
        this._normalPairChartPanel.firstPercentage = normalInfo.bankerPairPercentage;
        this._normalPairChartPanel.secondPercentage = normalInfo.playerPairPercentage;
        this._normalPairChartPanel.thirdPercentage = normalInfo.remainingPercentage;
        this._normalPairChartPanel.total = normalInfo.totalCount;
        this._normalPairChartPanel.update();

        const shoeInfo = we.utils.stat.ba.getStatInfo(true, this.tableInfo.gamestatistic);

        this._shoeChartPanel.firstCount = shoeInfo.bankerCount;
        this._shoeChartPanel.secondCount = shoeInfo.playerCount;
        this._shoeChartPanel.thirdCount = shoeInfo.tieCount;
        this._shoeChartPanel.firstPercentage = shoeInfo.bankerPercentage;
        this._shoeChartPanel.secondPercentage = shoeInfo.playerPercentage;
        this._shoeChartPanel.thirdPercentage = shoeInfo.tiePercentage;
        this._shoeChartPanel.total = shoeInfo.totalCount;

        this._shoeChartPanel.update();

        this._shoePairChartPanel.firstCount = shoeInfo.bankerPairCount;
        this._shoePairChartPanel.secondCount = shoeInfo.playerPairCount;
        this._shoePairChartPanel.thirdCount = shoeInfo.remainingCount;
        this._shoePairChartPanel.firstPercentage = shoeInfo.bankerPairPercentage;
        this._shoePairChartPanel.secondPercentage = shoeInfo.playerPairPercentage;
        this._shoePairChartPanel.thirdPercentage = shoeInfo.remainingPercentage;
        this._shoePairChartPanel.total = shoeInfo.totalCount;
        this._shoePairChartPanel.update();
      }
    }
  }
}
