// TypeScript file
namespace we {
  export namespace lo {
    export class MobileBottomGamePanel extends ui.MobileBottomCommonPanel {
      public _roadmapPanel: di.MobileBottomRoadmapPanel;
      public _beadroadPanel: MobileBottomBeadRoadPanel;

      public _roadButtonPanel: di.MobileBottomRoadButtonPanel;

      public _tableInfoPanel: di.TableInfoPanel;

      public _statisticChartPanel: di.StatisticChartPanel;

      // viewStack and radioBtn
      protected historyBtn: eui.RadioButton;
      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;
      protected tableInfoBtn: eui.RadioButton;

      protected historyAndRoadSheetBtn: eui.RadioButton;

      protected _roadmapGroup: eui.Group;
      protected _chartGroup: eui.Group;
      protected _infoGroup: eui.Group;
      protected _historyGroup: eui.Group;

      public constructor(skin?: string) {
        super(skin || !env.isMobile ? skin : 'lo.MobileBottomGamePanel');
      }

      protected mount() {
        super.mount();
        // this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;
        this._roadButtonPanel.changeState();
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
        this.tableInfoBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this._roadButtonPanel.roadmapSumBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this._roadButtonPanel.roadmapOddevenBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this._roadButtonPanel.roadmapSizeBtn.addEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        if (this.historyBtn) {
          this.historyBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.roadSheetBtn) {
          this.roadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.historyAndRoadSheetBtn) {
          this.historyAndRoadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
      }

      protected removeListeners() {
        super.removeListeners();
        this.chartBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this._roadButtonPanel.roadmapSumBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this._roadButtonPanel.roadmapOddevenBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        this._roadButtonPanel.roadmapSizeBtn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadMapChanged, this);
        if (this.historyBtn) {
          this.historyBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.roadSheetBtn) {
          this.roadSheetBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.historyAndRoadSheetBtn) {
          this.historyAndRoadSheetBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
      }

      public updateText() {
        if (this.historyBtn) {
          this.historyBtn.label = i18n.t('mobile_game_panel_history');
        }
        if (this.roadSheetBtn) {
          this.roadSheetBtn.label = i18n.t('mobile_game_panel_road_sheet');
        }
        if (this.historyAndRoadSheetBtn) {
          this.historyAndRoadSheetBtn.label = i18n.t('mobile_game_panel_history') + '/' + i18n.t('mobile_game_panel_road_sheet');
        }
        this.chartBtn.label = i18n.t('mobile_game_panel_statistic_chart');
        this.tableInfoBtn.label = i18n.t('mobile_game_panel_table_info');
        this._gameInfoLabel.text = i18n.t('mobile_panel_game_Info');
      }

      public updateStat() {
        super.updateStat();
        this._statisticChartPanel.setValue(this.tableInfo);
      }

      public manualClose() {
        super.manualClose();

        // this._roadmapPanel.visible = false;
        // this._beadroadPanel.visible = false;
      }

      protected onViewChange(e: eui.UIEvent) {
        super.onViewChange(e);
        switch (env.orientation) {
          case 'landscape':
            if (e.target.value === '3') {
              e.target.value = 0;
            }

            if (e.target.value === '1' || e.target.value === '2') {
              this._roadButtonPanel.visible = false;
            } else {
              this._roadButtonPanel.visible = true;
            }
            break;
          case 'portrait':
            if (e.target.value === '0') {
              this._roadButtonPanel.roadmapType = 0;
            }
            if (e.target.value === '1') {
              this._roadButtonPanel.roadmapType = 1;
            }

            this._roadButtonPanel.changeState();
            if (e.target.value === '2' || e.target.value === '3') {
              this._roadButtonPanel.visible = false;
            } else {
              this._roadButtonPanel.visible = true;
            }
            break;
        }
        this.viewStack.selectedIndex = e.target.value;
      }

      protected onPanelToggle() {
        super.onPanelToggle();
        // this.viewStack.selectedIndex = 0;
        // if (env.isBottomPanelOpen) {
        //   this._roadmapPanel.visible = true;
        //   this._beadroadPanel.visible = true;
        // } else {
        //   this._roadmapPanel.visible = false;
        //   this._beadroadPanel.visible = false;
        // }
        this.viewStack.selectedIndex = Math.max(0, this.viewStack._selectedIndex);
        this.dispatchEvent(new egret.Event('ON_BOTTOM_PANEL_TOGGLE'));
      }

      protected onRoadMapChanged(e: eui.UIEvent) {
        this._roadmapPanel.onRoadMapChanged(e);
        this._beadroadPanel.onBeadRoadChanged(e);
      }

      public openTableInfo() {
        super.openTableInfo();
        this.tableInfoBtn.selected = true;
        this.viewStack.selectedIndex = this.tableInfoBtn.value;
      }
    }
  }
}
