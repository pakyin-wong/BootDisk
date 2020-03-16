namespace we {
  export namespace di {
    export class LobbyTableLayer extends ui.TableLayer {
      protected _small_group: eui.Group;
      protected _big_group: eui.Group;
      protected _odd_group: eui.Group;
      protected _even_group: eui.Group;

      protected _small_image: eui.Image;
      protected _big_image: eui.Image;
      protected _odd_image: eui.Image;
      protected _even_image: eui.Image;

      protected _small_label: ui.RunTimeLabel;
      protected _big_label: ui.RunTimeLabel;
      protected _odd_label: ui.RunTimeLabel;
      protected _even_label: ui.RunTimeLabel;

      protected _imageSourceMapping: {};

      constructor() {
        super();
        this._betField = di.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._imageMapping = {};
        this._imageMapping[di.BetField.SMALL] = this._small_image;
        this._imageMapping[di.BetField.BIG] = this._big_image;
        this._imageMapping[di.BetField.ODD] = this._odd_image;
        this._imageMapping[di.BetField.EVEN] = this._even_image;

        this._imageSourceMapping = {};
        Object.keys(this._imageMapping).map(value => {
          this._imageSourceMapping[value] = [this._imageMapping[value].source, this._imageMapping[value].name];
        });

        this._small_label.renderText = () => i18n.t('dice.small');
        this._big_label.renderText = () => i18n.t('dice.big');
        this._odd_label.renderText = () => i18n.t('dice.odd');
        this._even_label.renderText = () => i18n.t('dice.even');
      }

      public onRollover(fieldName: string) {
        if (this._imageSourceMapping) {
          this._imageMapping[fieldName].source = this._imageSourceMapping[fieldName][1];
        }
      }

      public onRollout(fieldName: string) {
        this._imageMapping[fieldName].source = this._imageSourceMapping[fieldName][0];
      }

      public clearAllHighlights() {
        this.onRollout(di.BetField.SMALL);
        this.onRollout(di.BetField.BIG);
        this.onRollout(di.BetField.ODD);
        this.onRollout(di.BetField.EVEN);
      }
    }
  }
}
