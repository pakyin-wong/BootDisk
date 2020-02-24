namespace we {
  export namespace ro {
    export class RaceTrackControl extends core.BaseEUI {
      protected _distributionLabel: ui.RunTimeLabel;
      protected _distNumLabel: eui.Label;
      protected _addButton: ui.BaseImageButton;
      protected _lessButton: ui.BaseImageButton;

      public constructor() {
        super('ro/RaceTrackControl');
      }

      protected mount() {
        this._distributionLabel.renderText = () => i18n.t('roulette.distribution');
      }
    }
  }
}
