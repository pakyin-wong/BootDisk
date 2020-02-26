namespace we {
  export namespace overlay {
    export class SystemSetting extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private _txt_lang: ui.RunTimeLabel;
      private _txt_liveRecord: ui.RunTimeLabel;
      private _txt_soundfx: ui.RunTimeLabel;
      private _txt_bgm: ui.RunTimeLabel;
      private _txt_term: ui.RunTimeLabel;
      private _txt_version: ui.RunTimeLabel;
      private _txt_currLang: ui.RunTimeLabel;
      private _txt_currFx: ui.RunTimeLabel;
      private _txt_currBgm: ui.RunTimeLabel;

      private _slider_liveRecord: ui.Slider;
      private _slider_soundfx: ui.Slider;
      private _slider_bgm: ui.Slider;

      private _btn_currLang: egret.DisplayObject;
      private _btn_currFx: egret.DisplayObject;
      private _btn_currBgm: egret.DisplayObject;

      private _ddm_currLang: ui.Panel;
      private _ddm_currFx: ui.Panel;
      private _ddm_currBgm: ui.Panel;

      constructor() {
        super('overlay/SystemSetting');
      }

      protected mount() {
        super.mount();
        this._txt_title.renderText = () => `${i18n.t('nav.system.title')}`;
        this._txt_lang.renderText = () => `${i18n.t('nav.system.lang')}`;
        this._txt_liveRecord.renderText = () => `${i18n.t('nav.system.liveRecord')}`;
        this._txt_soundfx.renderText = () => `${i18n.t('nav.system.soundfx')}`;
        this._txt_bgm.renderText = () => `${i18n.t('nav.system.bgm')}`;
        this._txt_term.renderText = () => `${i18n.t('nav.system.term')}`;

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
        if (this._ddm_currFx) {
          this._ddm_currFx.isDropdown = true;
          this._ddm_currFx.isPoppable = true;
          this._ddm_currFx.dismissOnClickOutside = true;
          this._ddm_currFx.setToggler(this._btn_currFx);
          this._ddm_currFx.dropdown.review = this._txt_currFx;
          this._ddm_currFx.dropdown.data.replaceAll(_arrCol_currFx.source);
          this._ddm_currFx.dropdown.select(env.voice);
        }
        utils.DropdownCreator.new({
          toggler: this._btn_currFx,
          review: this._txt_currFx,
          arrCol: _arrCol_currFx,
          title: () => ``,
          selected: env.voice,
        });

        const _arrCol_currBgm = new eui.ArrayCollection([
          ui.NewDropdownItem(1, () => `${i18n.t('nav.system.bgm')} 01`),
          ui.NewDropdownItem(2, () => `${i18n.t('nav.system.bgm')} 02`),
          ui.NewDropdownItem(3, () => `${i18n.t('nav.system.bgm')} 03`),
        ]);
        if (this._ddm_currBgm) {
          this._ddm_currBgm.isDropdown = true;
          this._ddm_currBgm.isPoppable = true;
          this._ddm_currBgm.dismissOnClickOutside = true;
          this._ddm_currBgm.setToggler(this._btn_currBgm);
          this._ddm_currBgm.dropdown.review = this._txt_currBgm;
          this._ddm_currBgm.dropdown.data.replaceAll(_arrCol_currBgm.source);
          this._ddm_currBgm.dropdown.select(env.bgm);
        }
        utils.DropdownCreator.new({
          toggler: this._btn_currBgm,
          review: this._txt_currBgm,
          arrCol: _arrCol_currBgm,
          title: () => ``,
          selected: env.bgm,
        });

        this._txt_version.text = env.version;

        this._slider_liveRecord.value = dir.audioCtr.volumeLive;
        this._slider_bgm.value = dir.audioCtr.volumeBGM;
        this._slider_soundfx.value = dir.audioCtr.volumeFX;

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

        if (env.isMobile) {
          this._btn_currLang.addEventListener('DROPDOWN_ITEM_CHANGE', this.onLangSelect, this);
          this._btn_currFx.addEventListener('DROPDOWN_ITEM_CHANGE', this.onFxSelect, this);
          this._btn_currBgm.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBgmSelect, this);
        } else {
          this._ddm_currLang.addEventListener('DROPDOWN_ITEM_CHANGE', this.onLangSelect, this);
          this._ddm_currFx.addEventListener('DROPDOWN_ITEM_CHANGE', this.onFxSelect, this);
          this._ddm_currBgm.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBgmSelect, this);
        }
      }

      protected removeListeners() {
        this._slider_liveRecord.removeEventListener(ui.Slider.PROGRESS, this.onLiveRecordAdjust, this);
        this._slider_soundfx.removeEventListener(ui.Slider.PROGRESS, this.onSoundFxAdjust, this);
        this._slider_bgm.removeEventListener(ui.Slider.PROGRESS, this.onBGMAdjust, this);

        if (env.isMobile) {
          this._btn_currLang.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onLangSelect, this);
          this._btn_currFx.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onFxSelect, this);
          this._btn_currBgm.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onBgmSelect, this);
        } else {
          this._ddm_currLang.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onLangSelect, this);
          this._ddm_currFx.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onFxSelect, this);
          this._ddm_currBgm.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onBgmSelect, this);
        }
      }

      private onLiveRecordAdjust(e) {
        dir.audioCtr.volumeLive = e.data;
        this._slider_liveRecord.value = dir.audioCtr.volumeLive;
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
        this._ddm_currFx && this._ddm_currFx.dropdown.select(env.voice);
      }

      private onBgmSelect(e) {
        env.bgm = e.data;
        dir.evtHandler.dispatch(core.Event.BGM_UPDATE, e.data);
        this._ddm_currBgm && this._ddm_currBgm.dropdown.select(env.bgm);
      }
    }
  }
}
