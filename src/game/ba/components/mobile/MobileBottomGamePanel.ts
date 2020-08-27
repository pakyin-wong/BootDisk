namespace we {
  export namespace ba {
    export class MobileBottomGamePanel extends ui.MobileBottomCommonPanel {
      // roadmap Panel
      public _roadmapPanel: ba.MobileBottomRoadmapPanel;

      // table info panel
      public _tableInfoPanel: ba.TableInfoPanel;
      // public _betLimitDropDownBtn: ui.RunTimeLabel;

      // statisticChartPanel
      public _statisticChartPanel: ba.StatisticChartPanel;

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

        console.log(env.bottomPanelSelectedIdx);
        switch (env.bottomPanelSelectedIdx) {
          case 0:
            this.roadSheetBtn.selected = true;
            break;
          case 1:
            this.roadSheetBtn.selected = true;
            break;
          case 2:
            this.roadSheetBtn.selected = true;
            break;
        }
        // this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;
      }
      public setTableInfo(tableInfo: data.TableInfo) {
        super.setTableInfo(tableInfo);
        this._roadmapPanel.setTableInfo(this.tableInfo);
        this._statisticChartPanel.setValue(tableInfo);
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
        this._statisticChartPanel.update();
      }
    }
  }
}
