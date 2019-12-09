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

      private _slider_liveRecord: ui.Slider;
      private _slider_soundfx: ui.Slider;
      private _slider_bgm: ui.Slider;

      constructor() {
        super('SystemSetting');

        this._slider_liveRecord.addEventListener(we.ui.Slider.PROGRESS, this.handleAdjust.bind(this, 'volumeLive'), this);
        this._slider_soundfx.addEventListener(we.ui.Slider.PROGRESS, this.handleAdjust.bind(this, 'volumeFX'), this);
        this._slider_bgm.addEventListener(we.ui.Slider.PROGRESS, this.handleAdjust.bind(this, 'volumeBGM'), this);
      }

      protected mount() {
        this._txt_title.renderText = () => `${i18n.t('nav.system.title')}`;
        this._txt_lang.renderText = () => `${i18n.t('nav.system.lang')}`;
        this._txt_liveRecord.renderText = () => `${i18n.t('nav.system.liveRecord')}`;
        this._txt_soundfx.renderText = () => `${i18n.t('nav.system.soundfx')}`;
        this._txt_bgm.renderText = () => `${i18n.t('nav.system.bgm')}`;
        this._txt_term.renderText = () => `${i18n.t('nav.system.term')}`;

        this._txt_version.text = 'v0.00.001';
      }

      private handleAdjust(which, event: egret.Event) {
        const progress = event.data;
        dir.audioCtr[which] = progress;
      }
    }
  }
}
