namespace we {
  export namespace ba {
    export class MobileBottomGamePanel extends ui.MobileBottomCommonPanel {
      // roadmap Panel
      public _roadmapPanel: ba.MobileBottomRoadmapPanel;

      // table info panel
      public _tableInfoPanel: ba.TableInfoPanel;
      public _betLimitDropDownBtn: ui.RunTimeLabel;

      // statisticChartPanel
      public _statisticChartPanel: ba.StatisticChartPanel;

      // viewStack and radioBtn
      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;
      protected tableInfoBtn: eui.RadioButton;

      public constructor(skin?: string) {
        super(skin || !env.isMobile ? skin : 'ba.MobileBottomGamePanel');
      }

      protected init() {
        super.init();

        this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;

        this.roadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      public changeLang() {
        super.changeLang();

        this.roadSheetBtn.label = i18n.t('mobile_game_panel_road_sheet');
        this.chartBtn.label = i18n.t('mobile_game_panel_statistic_chart');
        this.tableInfoBtn.label = i18n.t('mobile_game_panel_table_info');
      }

      protected onPanelOpen() {
        this.roadSheetBtn.visible = !this.isPanelOpen;
        this.chartBtn.visible = !this.isPanelOpen;
        this.tableInfoBtn.visible = !this.isPanelOpen;

        super.onPanelOpen();
      }
    }
  }
}
