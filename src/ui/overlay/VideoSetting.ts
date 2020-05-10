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
      private bluRayBtn: eui.RadioButton;
      private highQuaBtn: eui.RadioButton;
      private standQuaBtn: eui.RadioButton;

      private confirmBtn: eui.Component;
      protected confirmLabel: ui.RunTimeLabel;

      protected camIndex: number = 0;
      protected quaIndex: number = 0;

      constructor() {
        super('VideoSetting');
      }

      protected mount() {
        super.mount();
        this.addListeners();
        this.updateText();
      }

      protected onCamChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.camIndex = radio.value;
      }

      protected onQuaChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.quaIndex = radio.value;
      }

      protected onConfirmChange(){
        //call the change function after press confirm
      }

      public updateText() {
        this.autoCamBtn.label = i18n.t('video_setting_auto');
        this.closerCamBtn.label = i18n.t('video_setting_closer');
        this.farCamBtn.label = i18n.t('video_setting_far');
        this.closeCamBtn.label = i18n.t('video_setting_close');

        this.autoQuaBtn.label = i18n.t('video_setting_auto');
        this.bluRayBtn.label = i18n.t('video_setting_bluray');
        this.highQuaBtn.label = i18n.t('video_setting_highQua');
        this.standQuaBtn.label = i18n.t('video_setting_standQua');

        this.cam_title.text = i18n.t('video_setting_cam');
        this.qua_title.text = i18n.t('video_setting_qua');

        this.confirmLabel.text = i18n.t('mobile_dropdown_confirm');
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        this.autoCamBtn.addEventListener(eui.UIEvent.CHANGE, this.onCamChange, this);
        this.closerCamBtn.addEventListener(eui.UIEvent.CHANGE, this.onCamChange, this);
        this.farCamBtn.addEventListener(eui.UIEvent.CHANGE, this.onCamChange, this);
        this.closeCamBtn.addEventListener(eui.UIEvent.CHANGE, this.onCamChange, this);

        this.autoQuaBtn.addEventListener(eui.UIEvent.CHANGE, this.onQuaChange, this);
        this.bluRayBtn.addEventListener(eui.UIEvent.CHANGE, this.onQuaChange, this);
        this.highQuaBtn.addEventListener(eui.UIEvent.CHANGE, this.onQuaChange, this);
        this.standQuaBtn.addEventListener(eui.UIEvent.CHANGE, this.onQuaChange, this);

        this.confirmBtn.addEventListener(eui.UIEvent.CHANGE, this.onConfirmChange, this);
      }

      protected removeListeners() {
        this.autoCamBtn.removeEventListener(eui.UIEvent.CHANGE, this.onCamChange, this);
        this.closerCamBtn.removeEventListener(eui.UIEvent.CHANGE, this.onCamChange, this);
        this.farCamBtn.removeEventListener(eui.UIEvent.CHANGE, this.onCamChange, this);
        this.closeCamBtn.removeEventListener(eui.UIEvent.CHANGE, this.onCamChange, this);

        this.autoQuaBtn.removeEventListener(eui.UIEvent.CHANGE, this.onQuaChange, this);
        this.bluRayBtn.removeEventListener(eui.UIEvent.CHANGE, this.onQuaChange, this);
        this.highQuaBtn.removeEventListener(eui.UIEvent.CHANGE, this.onQuaChange, this);
        this.standQuaBtn.removeEventListener(eui.UIEvent.CHANGE, this.onQuaChange, this);

        this.confirmBtn.removeEventListener(eui.UIEvent.CHANGE, this.onConfirmChange, this);
      }


      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
      }
    }
  }
}
