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

      constructor() {
        super('overlay/SystemSetting');
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
    }
  }
}
