// TypeScript file
namespace we {
  export namespace di {
    export class MobileBottomGamePanel extends ui.MobileBottomCommonPanel {
      public _roadmapPanel: MobileBottomRoadmapPanel;
      public _beadroadPanel: MobileBottomBeadRoadPanel;

      public _tableInfoPanel: di.TableInfoPanel;
      public _betLimitDropDownBtn: ui.RunTimeLabel;

      // public _statisticChartPanel: di.StatisticChartPanel;

      // viewStack and radioBtn
      protected historyBtn: eui.RadioButton;
      protected roadSheetBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;
      protected tableInfoBtn: eui.RadioButton;

      public constructor(skin?: string) {
        super(skin || !env.isMobile ? skin : 'di.MobileBottomGamePanel');
      }

      protected mount() {
        super.mount();

        this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;
      }

      public destroy() {
        super.destroy();

        this.removeListeners();
      }

      protected addListeners() {
        super.addListeners();
        this.historyBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.roadSheetBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      protected removeListeners() {
        super.removeListeners();
        this.historyBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.roadSheetBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.chartBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      public updateText() {
        this.historyBtn.label = i18n.t('mobile_game_panel_history');
        this.roadSheetBtn.label = i18n.t('mobile_game_panel_road_sheet');
        this.chartBtn.label = i18n.t('mobile_game_panel_statistic_chart');
        this.tableInfoBtn.label = i18n.t('mobile_game_panel_table_info');
        this._gameInfoLabel.text = i18n.t('mobile_panel_game_Info');
      }

      public manualClose() {
        super.manualClose();
        this._roadmapPanel.visible = false;
        this._beadroadPanel.visible = false;
      }

      // protected onPanelToggle() {
      //   super.onPanelToggle();
      //   if (this.isPanelOpen) {
      //     this._roadmapPanel.visible = true;
      //     this._beadroadPanel.visible = true;
      //   } else {
      //     this._roadmapPanel.visible = false;
      //     this._beadroadPanel.visible = false;
      //   }
      // }
    }
  }
}
