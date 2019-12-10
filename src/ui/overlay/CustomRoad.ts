namespace we {
  export namespace overlay {
    export class CustomRoad extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;

      constructor() {
        super('overlay/CustomRoad');
      }

      protected mount() {
        this._txt_title.renderText = () => `${i18n.t('overlaypanel_customroad_title')}`;
      }
    }
  }
}
