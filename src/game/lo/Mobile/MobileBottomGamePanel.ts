// TypeScript file
namespace we {
  export namespace lo {
    export class MobileBottomGamePanel extends ui.MobileBottomCommonPanel {
      public _roadmapPanel: lo.MobileBottomRoadmapPanel;

      public _statisticChartPanel: lo.StatisticChartPanel;

      public _analysisPanel: lo.AnalysisPanel;

      // viewStack and radioBtn
      protected historyBtn: eui.RadioButton;
      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;

      protected _roadmapGroup: eui.Group;
      protected _chartGroup: eui.Group;
      protected _historyGroup: eui.Group;

      public constructor(skin?: string) {
        super(skin || !env.isMobile ? skin : 'lo.MobileBottomGamePanel');
      }

      protected mount() {
        super.mount();
        // this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;
      }

      public destroy() {
        super.destroy();
        // if (env.orientation === 'portrait') {
        this._historyGroup && this._historyGroup.removeChildren();
        this._roadmapGroup && this._roadmapGroup.removeChildren();
        // } else {
        this._roadmapGroup && this._roadmapGroup.removeChildren();
        // }

        this.removeListeners();
      }

      protected addListeners() {
        super.addListeners();
        this.chartBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        if (this.historyBtn) {
          this.historyBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.roadSheetBtn) {
          this.roadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
      }

      protected removeListeners() {
        super.removeListeners();
        this.chartBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        if (this.historyBtn) {
          this.historyBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.roadSheetBtn) {
          this.roadSheetBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
      }

      public updateText() {
        if (this.historyBtn) {
          this.historyBtn.label = i18n.t('mobile_game_panel_history');
        }
        if (this.roadSheetBtn) {
          this.roadSheetBtn.label = i18n.t('mobile_game_panel_road_sheet');
        }
        this.chartBtn.label = i18n.t('mobile_game_panel_statistic_chart');
        this._gameInfoLabel.text = i18n.t('mobile_panel_game_Info');
      }

      public updateStat() {
        super.updateStat();
        // this._statisticChartPanel.setValue(this.tableInfo);
      }

      public manualClose() {
        super.manualClose();

        // this._roadmapPanel.visible = false;
        // this._beadroadPanel.visible = false;
      }

      protected onViewChange(e: eui.UIEvent) {
        super.onViewChange(e);
        this.viewStack.selectedIndex = e.target.value;
      }

      protected onPanelToggle() {
        super.onPanelToggle();
        this.viewStack.selectedIndex = Math.max(0, this.viewStack._selectedIndex);
        this.dispatchEvent(new egret.Event('ON_BOTTOM_PANEL_TOGGLE'));
      }

      protected onRoadMapChanged(e: eui.UIEvent) {
        // this._roadmapPanel.onRoadMapChanged(e);
      }
    }
  }
}
