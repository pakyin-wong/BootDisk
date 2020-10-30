// TypeScript file
namespace we {
  export namespace lo {
    export class MobileBottomGamePanel extends ui.MobileBottomCommonPanel {
      public _roadmapPanel: lo.MobileBottomRoadmapPanel;

      public _statisticChartPanel: lo.StatisticChartPanel;

      public _analysisPanel: lo.AnalysisPanel;

      // viewStack and radioBtn
      protected analysisBtn: eui.RadioButton;
      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;

      protected _roadmapGroup: eui.Group;
      protected _chartGroup: eui.Group;
      protected _analysisGroup: eui.Group;

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
        this._analysisGroup && this._analysisGroup.removeChildren();
        this._roadmapGroup && this._roadmapGroup.removeChildren();
        this._chartGroup && this._chartGroup.removeChildren();

        this.removeListeners();
      }

      public setData(){
        this._roadmapPanel.setTableInfo(this.tableInfo);
        this._statisticChartPanel.setTableInfo(this.tableInfo);
        this._analysisPanel.setTableInfo(this.tableInfo);
      }

      protected addListeners() {
        super.addListeners();
        this.chartBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        if (this.analysisBtn) {
          this.analysisBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.roadSheetBtn) {
          this.roadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
      }

      protected removeListeners() {
        super.removeListeners();
        this.chartBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        if (this.analysisBtn) {
          this.analysisBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.roadSheetBtn) {
          this.roadSheetBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
      }

      public updateText() {
        if (this.analysisBtn) {
          this.analysisBtn.label = i18n.t('mobile_game_panel_history');
        }
        if (this.roadSheetBtn) {
          this.roadSheetBtn.label = i18n.t('mobile_game_panel_road_sheet');
        }
        this.chartBtn.label = i18n.t('mobile_game_panel_statistic_chart');
        this._gameInfoLabel.text = i18n.t('mobile_panel_game_Info');
      }

      public updateStat() {
        super.updateStat();
      }

      public updateInfo() {
        this._roadmapPanel.update();
        this._analysisPanel.update();
        this._statisticChartPanel.update();
      }

      public manualOpen() {
        super.manualOpen();
        this._middlePart.visible = this.currentState === 'on' ? true : false;
      }

      public manualClose() {
        super.manualClose();

        this._middlePart.visible = this.currentState === 'on' ? true : false;
        // this._beadroadPanel.visible = false;
      }

      protected onViewChange(e: eui.UIEvent) {
        super.onViewChange(e);
        // this.viewStack.selectedIndex = e.target.value;
      }

      protected onPanelToggle() {
        super.onPanelToggle();
        this.viewStack.selectedIndex = Math.max(0, this.viewStack._selectedIndex);
        this.dispatchEvent(new egret.Event('ON_BOTTOM_PANEL_TOGGLE'));
        this._middlePart.visible = this.currentState === 'on' ? true : false;
      }

      // protected onRoadMapChanged(e: eui.UIEvent) {
      //   // this._roadmapPanel.onRoadMapChanged(e);
      // }
    }
  }
}
