namespace we {
  export namespace ro {
    export class MobileBottomGamePanel extends ui.MobileBottomCommonPanel {
      public beadRoad: ROBeadRoad;
      protected beadRoadConfig: RoadMapConfig;

      // roadmap Panel
      public _roadmapPanel: ro.MobileBottomRoadmapPanel;

      // table info panel
      public _tableInfoPanel: ro.TableInfoPanel;
      public _betLimitDropDownBtn: ui.RunTimeLabel;

      // statisticChartPanel
      public _statisticChartPanel: ro.StatisticChartPanel;

      // viewStack and radioBtn
      protected historyRoadBtn: eui.RadioButton;
      protected historyBtn: eui.RadioButton;
      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;
      protected tableInfoBtn: eui.RadioButton;

      // exist in portrait
      protected _roadmapGroup: eui.Group;
      protected _chartGroup: eui.Group;
      protected _infoGroup: eui.Group;
      protected _historyGroup: eui.Group;

      // exist in landscape
      protected _historyRoadGroup: eui.Group;

      public constructor(skin?: string) {
        super(skin || !env.isMobile ? skin : 'ro.MobileBottomGamePanel');
      }

      protected mount() {
        super.mount();
        this.initHistoryRoad();

        this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;
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

      public destroy() {
        super.destroy();
        if (env.orientation === 'portrait') {
          this._roadmapGroup.removeChildren();
          this._historyGroup.removeChildren();
        } else {
          this._historyRoadGroup.removeChildren();
        }
        this.beadRoad.dispose();

        this.removeListeners();
      }

      protected addListeners() {
        super.addListeners();
        this.historyRoadBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.historyBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.roadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      protected removeListeners() {
        super.removeListeners();
        this.historyRoadBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.historyBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.roadSheetBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      public updateText() {
        this.historyRoadBtn.label = i18n.t('mobile_game_panel_historyRoad');
        this.historyBtn.label = i18n.t('mobile_game_panel_history');
        this.roadSheetBtn.label = i18n.t('mobile_game_panel_road_sheet');
        this.chartBtn.label = i18n.t('mobile_game_panel_statistic_chart');
        this.tableInfoBtn.label = i18n.t('mobile_game_panel_table_info');
        this._gameInfoLabel.text = i18n.t('mobile_panel_game_Info');
      }
    }
  }
}
