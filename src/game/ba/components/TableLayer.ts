namespace we {
  export namespace ba {
    export class TableLayer extends ui.TableLayer {
      protected _playerPairImage: eui.Image;
      protected _bankerPairImage: eui.Image;
      protected _playerImage: eui.Image;
      protected _tieImage: eui.Image;
      protected _bankerImage: eui.Image;
      protected _superSixImage: eui.Image;
      protected _superSixBankerImage: eui.Image;

      protected _playerPairLabel: ui.RunTimeLabel;
      protected _bankerPairLabel: ui.RunTimeLabel;
      protected _playerLabel: ui.RunTimeLabel;
      protected _tieLabel: ui.RunTimeLabel;
      protected _bankerLabel: ui.RunTimeLabel;
      protected _superSixLabel: ui.RunTimeLabel;
      protected _superSixBankerLabel: ui.RunTimeLabel;

      protected _playerTotalAmount: eui.Label;
      protected _bankerTotalAmount: eui.Label;

      protected _playerTotalPerson: eui.Label;
      protected _bankerTotalPerson: eui.Label;

      protected _totalPersonMapping: any; // Total Person for each grid
      protected _totalAmountMapping: any; // Total amount for each grid

      protected _imageSourceMapping: {};

      constructor() {
        super();
        this._betField = ba.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._imageMapping = {};
        this._imageMapping[ba.BetField.PLAYER] = this._playerImage;
        this._imageMapping[ba.BetField.BANKER] = this._bankerImage;
        this._imageMapping[ba.BetField.PLAYER_PAIR] = this._playerPairImage;
        this._imageMapping[ba.BetField.TIE] = this._tieImage;
        this._imageMapping[ba.BetField.BANKER_PAIR] = this._bankerPairImage;
        this._imageMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerImage;
        this._imageMapping[ba.BetField.SUPER_SIX] = this._superSixImage;

        this._imageSourceMapping = {};
        this._imageSourceMapping[ba.BetField.PLAYER] = [this._imageMapping[ba.BetField.PLAYER].source, this._imageMapping[ba.BetField.PLAYER].name];
        this._imageSourceMapping[ba.BetField.BANKER] = [this._imageMapping[ba.BetField.BANKER].source, this._imageMapping[ba.BetField.BANKER].name];
        this._imageSourceMapping[ba.BetField.PLAYER_PAIR] = [this._imageMapping[ba.BetField.PLAYER_PAIR].source, this._imageMapping[ba.BetField.PLAYER_PAIR].name];
        this._imageSourceMapping[ba.BetField.TIE] = [this._imageMapping[ba.BetField.TIE].source, this._imageMapping[ba.BetField.TIE].name];
        this._imageSourceMapping[ba.BetField.BANKER_PAIR] = [this._imageMapping[ba.BetField.BANKER_PAIR].source, this._imageMapping[ba.BetField.BANKER_PAIR].name];
        this._imageSourceMapping[ba.BetField.SUPER_SIX_BANKER] = [this._imageMapping[ba.BetField.SUPER_SIX_BANKER].source, this._imageMapping[ba.BetField.SUPER_SIX_BANKER].name];
        this._imageSourceMapping[ba.BetField.SUPER_SIX] = [this._imageMapping[ba.BetField.SUPER_SIX].source, this._imageMapping[ba.BetField.SUPER_SIX].name];

        this._totalPersonMapping = {};
        this._totalPersonMapping[ba.BetField.PLAYER] = this._playerTotalPerson;
        this._totalPersonMapping[ba.BetField.BANKER] = this._bankerTotalPerson;

        this._totalAmountMapping = {};
        this._totalAmountMapping[ba.BetField.PLAYER] = this._playerTotalAmount;
        this._totalAmountMapping[ba.BetField.BANKER] = this._bankerTotalAmount;

        this._playerLabel.renderText = () => i18n.t('baccarat.player');
        this._bankerLabel.renderText = () => i18n.t('baccarat.banker');
        this._playerPairLabel.renderText = () => i18n.t('baccarat.playerPair');
        this._tieLabel.renderText = () => i18n.t('baccarat.tie');
        this._bankerPairLabel.renderText = () => i18n.t('baccarat.bankerPair');
        this._superSixBankerLabel.renderText = () => i18n.t('baccarat.banker');
        this._superSixLabel.renderText = () => i18n.t('baccarat.superSix');
      }

      public onRollover(fieldName: string) {
        if (this._imageSourceMapping) {
          this._imageMapping[fieldName].source = this._imageSourceMapping[fieldName][1];
        }
      }

      public onRollout(fieldName: string) {
        this._imageMapping[fieldName].source = this._imageSourceMapping[fieldName][0];
      }

      set totalPerson(persons: any) {
        this._totalPersonMapping = persons;
        if (this._totalPersonMapping) {
          Object.keys(persons).map(value => {
            if (this._totalPersonMapping[value]) {
              this._totalPersonMapping[value].text = persons[value];
            }
          });
        }
      }

      get totalPerson() {
        return this._totalPersonMapping;
      }

      set totalAmount(amounts: any) {
        this._totalAmountMapping = amounts;
        if (this._totalAmountMapping) {
          Object.keys(amounts).map(value => {
            if (this._totalAmountMapping[value]) {
              this._totalAmountMapping[value].text = amounts[value];
            }
          });
        }
      }

      get totalAmount() {
        return this._totalAmountMapping;
      }
    }
  }
}
