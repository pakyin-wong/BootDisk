namespace we {
  export namespace overlay {
    export class SoundSetting extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private _txt_soundfx: ui.RunTimeLabel;
      private _txt_bgm: ui.RunTimeLabel;
      private _txt_currLang: ui.RunTimeLabel;

      private _slider_soundfx: ui.Slider;
      private _slider_bgm: ui.Slider;

      private _btn_currLang: egret.DisplayObject;

      private _ddm_currLang: ui.Panel;

      constructor() {
        super('SoundSetting');
      }

      protected mount() {
        super.mount();
      }

      protected init_menu() {
        this._txt_title.renderText = () => `${i18n.t('nav.system.title')}`;
        this._txt_soundfx.renderText = () => `${i18n.t('nav.system.soundfx')}`;
        this._txt_bgm.renderText = () => `${i18n.t('nav.system.bgm')}`;

        const _arrCol_currLang = new eui.ArrayCollection([ui.NewDropdownItem('sc', () => `简体中文`), ui.NewDropdownItem('tc', () => `繁體中文`), ui.NewDropdownItem('en', () => `English`)]);
        if (this._ddm_currLang) {
          this._ddm_currLang.isDropdown = true;
          this._ddm_currLang.isPoppable = true;
          this._ddm_currLang.dismissOnClickOutside = true;
          this._ddm_currLang.setToggler(this._btn_currLang);
          this._ddm_currLang.dropdown.review = this._txt_currLang;
          this._ddm_currLang.dropdown.data.replaceAll(_arrCol_currLang.source);
          this._ddm_currLang.dropdown.select(env.language);
        }
        utils.DropdownCreator.new({
          toggler: this._btn_currLang,
          review: this._txt_currLang,
          arrCol: _arrCol_currLang,
          title: () => ``,
          selected: env.language,
        });

        const _arrCol_currFx = new eui.ArrayCollection([
          ui.NewDropdownItem('cantonese', () => `${i18n.t('voice_cantonese')}`),
          ui.NewDropdownItem('mandarin', () => `${i18n.t('voice_mandarin')}`),
          ui.NewDropdownItem('english', () => `${i18n.t('voice_english')}`),
        ]);

        const _arrCol_currBgm = new eui.ArrayCollection([
          ui.NewDropdownItem(1, () => `${i18n.t('nav.system.bgm')} 01`),
          ui.NewDropdownItem(2, () => `${i18n.t('nav.system.bgm')} 02`),
          ui.NewDropdownItem(3, () => `${i18n.t('nav.system.bgm')} 03`),
        ]);

        this._slider_bgm.value = dir.audioCtr.volumeBGM;
        this._slider_soundfx.value = dir.audioCtr.volumeFX;

        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        this._slider_soundfx.addEventListener(ui.Slider.PROGRESS, this.onSoundFxAdjust, this);
        this._slider_bgm.addEventListener(ui.Slider.PROGRESS, this.onBGMAdjust, this);

        if (env.isMobile) {
          this._btn_currLang.addEventListener('DROPDOWN_ITEM_CHANGE', this.onLangSelect, this);
        } else {
          this._ddm_currLang.addEventListener('DROPDOWN_ITEM_CHANGE', this.onLangSelect, this);
        }
      }

      protected removeListeners() {
        this._slider_soundfx.removeEventListener(ui.Slider.PROGRESS, this.onSoundFxAdjust, this);
        this._slider_bgm.removeEventListener(ui.Slider.PROGRESS, this.onBGMAdjust, this);

        if (env.isMobile) {
          this._btn_currLang.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onLangSelect, this);
        } else {
          this._ddm_currLang.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onLangSelect, this);
        }
      }

      private onLiveRecordAdjust(e) {
        dir.audioCtr.volumeLive = e.data;
      }

      private onSoundFxAdjust(e) {
        dir.audioCtr.volumeFX = e.data;
        this._slider_soundfx.value = dir.audioCtr.volumeFX;
      }

      private onBGMAdjust(e) {
        dir.audioCtr.volumeBGM = e.data;
        this._slider_bgm.value = dir.audioCtr.volumeBGM;
      }

      private onLangSelect(e) {
        i18n.setLang(e.data);
        this._ddm_currLang && this._ddm_currLang.dropdown.select(env.language);
      }

      private onFxSelect(e) {
        env.voice = e.data;
        dir.evtHandler.dispatch(core.Event.VOICE_UPDATE, e.data);
      }

      private onBgmSelect(e) {
        env.bgm = e.data;
        dir.evtHandler.dispatch(core.Event.BGM_UPDATE, e.data);
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.init_menu();
      }
    }
  }
}
