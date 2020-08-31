namespace we {
  export namespace dt {
    export class MobileBottomGamePanel extends ui.MobileBottomCommonPanel {
      // roadmap Panel
      public _roadmapPanel: dt.MobileBottomRoadmapPanel;

      // table info panel
      public _tableInfoPanel: dt.TableInfoPanel;
      // public _betLimitDropDownBtn: ui.RunTimeLabel;

      // statisticChartPanel
      public _statisticChartPanel: dt.StatisticChartPanel;

      // viewStack and radioBtn
      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;
      protected tableInfoBtn: eui.RadioButton;

      public constructor(skin?: string) {
        super(skin || !env.isMobile ? skin : 'dt.MobileBottomGamePanel');
      }

      protected mount() {
        super.mount();
        this.viewStack.selectedIndex = env.bottomPanelSelectedIdx;
        switch (env.bottomPanelSelectedIdx.toString()) {
          case '0':
            this.roadSheetBtn.selected = true;
            break;
          case '1':
            this.chartBtn.selected = true;
            break;
          case '2':
            this.tableInfoBtn.selected = true;
            break;
        }
        // this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;
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

      public openTableInfo() {
        super.openTableInfo();
        this.tableInfoBtn.selected = true;
        this.viewStack.selectedIndex = this.tableInfoBtn.value;
      }

      protected onViewChange(e: eui.UIEvent) {
        super.onViewChange(e);
        env.bottomPanelSelectedIdx = this.viewStack.selectedIndex;
      }
    }
  }
}
