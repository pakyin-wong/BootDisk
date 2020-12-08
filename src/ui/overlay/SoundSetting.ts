namespace we {
  export namespace overlay {
    export class SoundSetting extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;

      private _txt_liveRecord: ui.RunTimeLabel;
      private _slider_liveRecord: ui.Slider;

      private _txt_soundfx: ui.RunTimeLabel;
      private _slider_soundfx: ui.Slider;
      private _btn_currFx: egret.DisplayObject;
      private _txt_currFx: ui.RunTimeLabel;
      private _ddm_currFx: ui.Panel;

      private _txt_bgm: ui.RunTimeLabel;
      private _slider_bgm: ui.Slider;
      private _btn_presetBgm: egret.DisplayObject;
      private _txt_presetBgm: ui.RunTimeLabel;
      private _ddm_presetBgm: ui.Panel;

      private soundAnimBtn: ui.SettingAnimationButton;

      private _isOn: boolean;

      private _isLiveRecordEnable: boolean = true;

      constructor(soundAnimBtn, isLiveRecordEnable?: boolean) {
        super('SoundSetting');
        this.soundAnimBtn = soundAnimBtn;
        if (isLiveRecordEnable !== null) {
          this._isLiveRecordEnable = isLiveRecordEnable;
        }
      }

      protected mount() {
        super.mount();
        this.updateState();
      }

      protected updateState() {
        if (this._isLiveRecordEnable === true) {
          this.currentState = 'liveRecord';
        } else this.currentState = 'noliveRecord';
      }
      
      protected init_menu() {
        this._txt_title.renderText = () => `${i18n.t('nav.menu.soundSet')}`;
        this._txt_liveRecord.renderText = () => `${i18n.t('nav.system.liveRecord')}`;
        this._txt_soundfx.renderText = () => `${i18n.t('nav.system.soundfx')}`;
        this._txt_bgm.renderText = () => `${i18n.t('nav.system.bgm')}`;
        this._txt_presetBgm.renderText = () => `${i18n.t('nav.system.bgm')}`;

        const _arrCol_currFx = new eui.ArrayCollection([
          ui.NewDropdownItem('cn', () => `${i18n.t('voice_mandarin')}`),
          ui.NewDropdownItem('zh', () => `${i18n.t('voice_cantonese')}`),
          ui.NewDropdownItem('en', () => `${i18n.t('voice_english')}`),
        ]);
        const _arrCol_presetBgm = new eui.ArrayCollection([
          ui.NewDropdownItem(0, () => `${i18n.t('nav.system.bgm')} 01`),
          ui.NewDropdownItem(1, () => `${i18n.t('nav.system.bgm')} 02`),
          ui.NewDropdownItem(2, () => `${i18n.t('nav.system.bgm')} 03`),
        ]);

        if (this._ddm_currFx) {
          this._ddm_currFx.isDropdown = true;
          this._ddm_currFx.isPoppable = true;
          this._ddm_currFx.dismissOnClickOutside = true;
          this._ddm_currFx.setToggler(this._btn_currFx);
          this._ddm_currFx.dropdown.review = this._txt_currFx;
          this._ddm_currFx.dropdown.data.replaceAll(_arrCol_currFx.source);
          this._ddm_currFx.dropdown.select(env.voice);
        }
        if (this._ddm_presetBgm) {
          this._ddm_presetBgm.isDropdown = true;
          this._ddm_presetBgm.isPoppable = true;
          this._ddm_presetBgm.dismissOnClickOutside = true;
          this._ddm_presetBgm.setToggler(this._btn_presetBgm);
          this._ddm_presetBgm.dropdown.review = this._txt_presetBgm;
          this._ddm_presetBgm.dropdown.data.replaceAll(_arrCol_presetBgm.source);
          this._ddm_presetBgm.dropdown.select(dir.audioCtr.bgmIdx);
        }
        utils.DropdownCreator.new({
          toggler: this._btn_currFx,
          review: this._txt_currFx,
          arrCol: _arrCol_currFx,
          title: () => ``,
          selected: env.language,
        });
        utils.DropdownCreator.new({
          toggler: this._btn_presetBgm,
          review: this._txt_presetBgm,
          arrCol: _arrCol_presetBgm,
          title: () => ``,
          selected: dir.audioCtr.bgmIdx,
        });

        this._slider_liveRecord.value = dir.audioCtr.volumeLive;
        this._slider_soundfx.value = dir.audioCtr.volumeFX;
        this._slider_bgm.value = dir.audioCtr.volumeBGM;

        if (dir.audioCtr.bgmIdx === 0 && dir.audioCtr.volumeLive === 0 && dir.audioCtr.volumeBGM === 0 && dir.audioCtr.volumeFX === 0) {
          this._isOn = false;
        } else {
          this._isOn = true;
        }

        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        this._slider_liveRecord.addEventListener(ui.Slider.PROGRESS, this.onLiveRecordAdjust, this);
        this._slider_soundfx.addEventListener(ui.Slider.PROGRESS, this.onSoundFxAdjust, this);
        this._slider_bgm.addEventListener(ui.Slider.PROGRESS, this.onBGMAdjust, this);

        this._slider_liveRecord.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.checkChange, this);
        this._slider_soundfx.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.checkChange, this);
        this._slider_bgm.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.checkChange, this);

        this._slider_liveRecord.addEventListener(egret.TouchEvent.TOUCH_END, this.checkChange, this);
        this._slider_soundfx.addEventListener(egret.TouchEvent.TOUCH_END, this.checkChange, this);
        this._slider_bgm.addEventListener(egret.TouchEvent.TOUCH_END, this.checkChange, this);

        if (env.isMobile) {
          this._btn_currFx.addEventListener('DROPDOWN_ITEM_CHANGE', this.onFxSelect, this);
          this._btn_presetBgm.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBgmSelect, this);
        } else {
          this._ddm_currFx.addEventListener('DROPDOWN_ITEM_CHANGE', this.onFxSelect, this);
          this._ddm_presetBgm.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBgmSelect, this);
        }
      }

      protected removeListeners() {
        this._slider_liveRecord.removeEventListener(ui.Slider.PROGRESS, this.onLiveRecordAdjust, this);
        this._slider_soundfx.removeEventListener(ui.Slider.PROGRESS, this.onSoundFxAdjust, this);
        this._slider_bgm.removeEventListener(ui.Slider.PROGRESS, this.onBGMAdjust, this);

        if (env.isMobile) {
          this._btn_currFx.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onFxSelect, this);
          this._btn_presetBgm.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onBgmSelect, this);
        } else {
          this._ddm_currFx.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onFxSelect, this);
          this._ddm_presetBgm.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onBgmSelect, this);
        }
      }

      private onLiveRecordAdjust(e) {
        dir.audioCtr.volumeLive = e.data;
        this._slider_liveRecord.value = dir.audioCtr.volumeLive;
        utils.debounce(this.checkChange, 200, this);
      }

      private onSoundFxAdjust(e) {
        dir.audioCtr.volumeFX = e.data;
        this._slider_soundfx.value = dir.audioCtr.volumeFX;
        utils.debounce(this.checkChange, 200, this);
      }

      private onBGMAdjust(e) {
        dir.audioCtr.volumeBGM = e.data;
        this._slider_bgm.value = dir.audioCtr.volumeBGM;
        utils.debounce(this.checkChange, 200, this);
      }

      private onFxSelect(e) {
        env.voice = e.data;
        dir.evtHandler.dispatch(core.Event.VOICE_UPDATE, e.data);
        this._ddm_currFx && this._ddm_currFx.dropdown.select(env.voice);
        dir.socket.updateSetting('voice', env.voice);
      }

      private onBgmSelect(e) {
        dir.audioCtr.bgmIdx = e.data;
        dir.evtHandler.dispatch(core.Event.BGM_UPDATE, e.data);
        this._ddm_presetBgm && this._ddm_presetBgm.dropdown.select(dir.audioCtr.bgmIdx);
        this.checkChange();
      }

      protected checkChange() {
        if (dir.audioCtr.volumeLive === 0 && dir.audioCtr.volumeBGM === 0 && dir.audioCtr.volumeFX === 0 && this._isOn) {
          this.soundAnimBtn.dispatchEvent(new egret.Event('SWITCH_TO_OFF'));
          this._isOn = false;
        } else if ((dir.audioCtr.volumeLive > 0 || dir.audioCtr.volumeBGM > 0 || dir.audioCtr.volumeFX > 0) && !this._isOn) {
          this.soundAnimBtn.dispatchEvent(new egret.Event('SWITCH_TO_ON'));
          this._isOn = true;
        } else {
          this.soundAnimBtn.dispatchEvent(new egret.Event('SETTING_UPDATE'));
        }
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.init_menu();
      }
    }
  }
}
