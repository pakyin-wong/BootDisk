namespace we {
  export namespace overlay {
    export class VideoSetting extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;

      protected _txt_videoSec: ui.RunTimeLabel;
      protected switch_video: ui.BaseButton;

      protected _txt_qualitySec: ui.RunTimeLabel;
      private _btn_quality: egret.DisplayObject;
      private _txt_quality: ui.RunTimeLabel;
      private _ddm_quality: ui.Panel;

      protected _txt_cameraSec: ui.RunTimeLabel;
      private _btn_camera: egret.DisplayObject;
      private _txt_camera: ui.RunTimeLabel;
      private _ddm_camera: ui.Panel;

      protected targetScene: core.BaseGameScene;

      constructor(targetScene) {
        super('VideoSetting');
        this.targetScene = targetScene;
      }

      protected mount() {
        super.mount();
      }

      protected init_menu() {
        this._txt_title.renderText = () => `${i18n.t('video_setting')}`;
        this._txt_videoSec.renderText = () => `${i18n.t('video_setting_toggle')}`;
        this._txt_qualitySec.renderText = () => `${i18n.t('video_setting_qua')}`;
        this._txt_cameraSec.renderText = () => `${i18n.t('video_setting_cam')}`;

        const _arrCol_quality = new eui.ArrayCollection([ui.NewDropdownItem('01', () => `${i18n.t('video_setting_auto')}`)]);
        const _arrCol_camera = new eui.ArrayCollection([ui.NewDropdownItem('01', () => `${i18n.t('video_setting_auto')}`)]);

        if (this._ddm_quality) {
          this._ddm_quality.isDropdown = true;
          this._ddm_quality.isPoppable = true;
          this._ddm_quality.dismissOnClickOutside = true;
          this._ddm_quality.setToggler(this._btn_quality);
          this._ddm_quality.dropdown.review = this._txt_quality;
          this._ddm_quality.dropdown.data.replaceAll(_arrCol_quality.source);
          this._ddm_quality.dropdown.select('01');
        }
        if (this._ddm_camera) {
          this._ddm_camera.isDropdown = true;
          this._ddm_camera.isPoppable = true;
          this._ddm_camera.dismissOnClickOutside = true;
          this._ddm_camera.setToggler(this._btn_camera);
          this._ddm_camera.dropdown.review = this._txt_camera;
          this._ddm_camera.dropdown.data.replaceAll(_arrCol_camera.source);
          this._ddm_camera.dropdown.select('01');
        }
        utils.DropdownCreator.new({
          toggler: this._btn_quality,
          review: this._txt_quality,
          arrCol: _arrCol_quality,
          title: () => ``,
          selected: '01',
        });
        utils.DropdownCreator.new({
          toggler: this._btn_camera,
          review: this._txt_camera,
          arrCol: _arrCol_camera,
          title: () => ``,
          selected: '01',
        });

        this.switch_video.active = !this.targetScene.isVideoStopped;

        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      // protected onConfirmChange() {
      //   // call the change function after press confirm
      //   env.camMode = this.camIndex;
      //   env.qualityMode = this.quaIndex;
      //   if (this.camIndex === 3) {
      //     this.targetGameScene.stopVideo(this.targetGameScene);
      //   } else {
      //     this.targetGameScene.playVideo(this.targetGameScene);
      //   }
      //   (this.parent as we.ui.Overlay).hide();
      // }

      protected addListeners() {
        utils.addButtonListener(this.switch_video, this.onSwitchVideo, this);
        if (env.isMobile) {
          this._btn_quality.addEventListener('DROPDOWN_ITEM_CHANGE', this.onQualitySelect, this);
          this._btn_camera.addEventListener('DROPDOWN_ITEM_CHANGE', this.onCameraChange, this);
        } else {
          this._ddm_quality.addEventListener('DROPDOWN_ITEM_CHANGE', this.onQualitySelect, this);
          this._ddm_camera.addEventListener('DROPDOWN_ITEM_CHANGE', this.onCameraChange, this);
        }
      }

      protected removeListeners() {
        this.switch_video.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchVideo, this);
        if (env.isMobile) {
          this._btn_quality.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onQualitySelect, this);
          this._btn_camera.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onCameraChange, this);
        } else {
          this._ddm_quality.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onQualitySelect, this);
          this._ddm_camera.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onCameraChange, this);
        }
      }

      private onQualitySelect(e) {
        this._ddm_quality && this._ddm_quality.dropdown.select(e.data);
      }

      private onCameraChange(e) {
        this._ddm_camera && this._ddm_camera.dropdown.select(e.data);
      }

      private onSwitchVideo() {
        if (this.targetScene.isVideoStopped) {
          this.targetScene.playVideo();
          this.switch_video.active = true;
        } else {
          this.targetScene.stopVideo();
          this.switch_video.active = false;
        }
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.init_menu();
      }
    }
  }
}
