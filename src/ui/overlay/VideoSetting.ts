namespace we {
  export namespace overlay {
    export class VideoSetting extends ui.Panel {
      private cam_title: ui.RunTimeLabel;
      private qua_title: ui.RunTimeLabel;

      private autoCamBtn: eui.RadioButton;
      private closerCamBtn: eui.RadioButton;
      private farCamBtn: eui.RadioButton;
      private closeCamBtn: eui.RadioButton;

      private autoQuaBtn: eui.RadioButton;
      private blueRayBtn: eui.RadioButton;
      private highQuaBtn: eui.RadioButton;
      private standQuaBtn: eui.RadioButton;

      private confirmBtn: eui.Component;
      protected confirmLabel: ui.RunTimeLabel;

      constructor() {
        super('VideoSetting');
      }

      protected mount() {
        super.mount();
        this.addListeners();
        this.updateText();
      }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        // this.viewStack.selectedIndex = radio.value;
      }

      public updateText() {
        this.autoCamBtn.label = i18n.t('mobile_game_panel_historyRoad');
        this.closerCamBtn.label = i18n.t('mobile_game_panel_history');
        this.farCamBtn.label = i18n.t('mobile_game_panel_road_sheet');
        this.closeCamBtn.label = i18n.t('mobile_game_panel_statistic_chart');

        this.autoQuaBtn.label = i18n.t('mobile_game_panel_table_info');
        this.blueRayBtn.label = i18n.t('mobile_panel_game_Info');
        this.highQuaBtn.label = i18n.t('mobile_game_panel_table_info');
        this.standQuaBtn.label = i18n.t('mobile_panel_game_Info');

        this.cam_title.text = i18n.t('mobile_panel_game_Info');
        this.qua_title.text = i18n.t('mobile_panel_game_Info');
        this.confirmLabel.text = i18n.t('mobile_panel_game_Info');
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        this.autoCamBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.closerCamBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.farCamBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.closeCamBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.autoQuaBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.blueRayBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.highQuaBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.standQuaBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      protected removeListeners() {
        this.autoCamBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.closerCamBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.farCamBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.closeCamBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.autoQuaBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.blueRayBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.highQuaBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.standQuaBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }


      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
      }
    }
  }
}
