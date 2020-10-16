namespace we {
  export namespace ba {
    export class TableLayer extends ui.TableLayer {
      protected _playerPairImage: ui.BettingGrid;
      protected _bankerPairImage: ui.BettingGrid;
      protected _playerImage: ui.BettingGrid;
      protected _tieImage: ui.BettingGrid;
      protected _bankerImage: ui.BettingGrid;
      protected _superSixImage: ui.BettingGrid;
      protected _superSixBankerImage: ui.BettingGrid;

      protected _playerPairLabel: ui.RunTimeLabel;
      protected _bankerPairLabel: ui.RunTimeLabel;
      protected _playerLabel: ui.RunTimeLabel;
      protected _tieLabel: ui.RunTimeLabel;
      protected _bankerLabel: ui.RunTimeLabel;
      protected _superSixLabel: ui.RunTimeLabel;
      protected _superSixBankerLabel: ui.RunTimeLabel;

      protected _playerTotalAmount: eui.Label;
      protected _bankerTotalAmount: eui.Label;
      protected _superSixBankerTotalAmount: eui.Label;

      protected _playerTotalPerson: eui.Label;
      protected _bankerTotalPerson: eui.Label;
      protected _superSixBankerTotalPerson: eui.Label;

      protected _totalPersonMapping: any; // Total Person for each grid
      protected _totalAmountMapping: any; // Total amount for each grid

      // protected _imageSourceMapping: {};

      constructor() {
        super();
        this._betField = ba.BetField;
        this.addEventListener(egret.Event.COMPLETE, this.onSkinChanged, this);
      }

      public onSkinChanged() {
        // console.log(this.skinName);
      }

      protected createMapping() {
        super.createMapping();
        // let image;
        this._imageMapping = {};
        // this._imageSourceMapping = {};

        this._imageMapping[ba.BetField.PLAYER] = this._playerImage;
        this._imageMapping[ba.BetField.BANKER] = this._bankerImage;
        this._imageMapping[ba.BetField.PLAYER_PAIR] = this._playerPairImage;
        this._imageMapping[ba.BetField.TIE] = this._tieImage;
        this._imageMapping[ba.BetField.BANKER_PAIR] = this._bankerPairImage;
        this._imageMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerImage;
        this._imageMapping[ba.BetField.SUPER_SIX] = this._superSixImage;

        /*
        image = this._imageMapping[ba.BetField.PLAYER];
        this._imageSourceMapping[ba.BetField.PLAYER] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.BANKER];
        this._imageSourceMapping[ba.BetField.BANKER] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.PLAYER_PAIR];
        this._imageSourceMapping[ba.BetField.PLAYER_PAIR] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.TIE];
        this._imageSourceMapping[ba.BetField.TIE] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.BANKER_PAIR];
        this._imageSourceMapping[ba.BetField.BANKER_PAIR] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.SUPER_SIX_BANKER];
        this._imageSourceMapping[ba.BetField.SUPER_SIX_BANKER] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.SUPER_SIX];
        this._imageSourceMapping[ba.BetField.SUPER_SIX] = [image.source, image.name ? image.name : image.source];
*/

        this._totalPersonMapping = {};
        this._totalPersonMapping[ba.BetField.PLAYER] = this._playerTotalPerson;
        this._totalPersonMapping[ba.BetField.BANKER] = this._bankerTotalPerson;
        this._totalPersonMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerTotalPerson;

        this._totalAmountMapping = {};
        this._totalAmountMapping[ba.BetField.PLAYER] = this._playerTotalAmount;
        this._totalAmountMapping[ba.BetField.BANKER] = this._bankerTotalAmount;
        this._totalAmountMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerTotalAmount;

        this._playerLabel.renderText = () => i18n.t('baccarat.playerShort');
        this._bankerLabel.renderText = () => i18n.t('baccarat.bankerShort');
        this._playerPairLabel.renderText = () => i18n.t('baccarat.playerPairShort');
        this._tieLabel.renderText = () => i18n.t('baccarat.tieShort');
        this._bankerPairLabel.renderText = () => i18n.t('baccarat.bankerPairShort');
        this._superSixBankerLabel.renderText = () => i18n.t('baccarat.bankerShort');
        this._superSixLabel.renderText = () => i18n.t('baccarat.superSixShort');
      }

      public onRollover(fieldName: string) {
        if (this._imageMapping) {
          // const colorMatrix = [1, 0, 0, 0, 100, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]; // Red for testing
          const colorMatrix = [1, 0, 0, 0, 100, 0, 1, 0, 0, 100, 0, 0, 1, 0, 100, 0, 0, 0, 1, 0];
          const colorFilter = new egret.ColorMatrixFilter(colorMatrix);
          this._imageMapping[fieldName].filters = [colorFilter];
        }
      }

      public onRollout(fieldName: string) {
        this._imageMapping[fieldName].filters = [];
      }

      public clearAllHighlights() {
        Object.keys(ba.BetField).map(value => {
          this.onRollout(value);
        });
      }

      set totalPerson(persons: any) {
        if (this._totalPersonMapping) {
          Object.keys(persons).map(value => {
            if (this._totalPersonMapping[value]) {
              if (persons[value] !== null) {
                this._totalPersonMapping[value].text = persons[value];
              }
            }
          });
        }
      }

      get totalPerson() {
        return this._totalPersonMapping;
      }

      set totalAmount(amounts: any) {
        if (this._totalAmountMapping) {
          Object.keys(amounts).map(value => {
            if (this._totalAmountMapping[value]) {
              this._totalAmountMapping[value].text = amounts[value] / 100;
            }
          });
        }
      }

      get totalAmount() {
        return this._totalAmountMapping;
      }

      public async flashFields(gameData: we.data.GameData, superSixMode: boolean) {
        const winningFields = [];
        const { wintype, issupersix, isbankerpair, isplayerpair } = gameData;

        if (isbankerpair) {
          winningFields.push(ba.BetField.BANKER_PAIR);
        }
        if (isplayerpair) {
          winningFields.push(ba.BetField.PLAYER_PAIR);
        }
        if (issupersix) {
          winningFields.push(ba.BetField.SUPER_SIX);
        }

        switch (wintype) {
          case ba.WinType.BANKER: {
            if (superSixMode) {
              winningFields.push(ba.BetField.SUPER_SIX_BANKER);
            } else {
              winningFields.push(ba.BetField.BANKER);
            }
            break;
          }
          case ba.WinType.PLAYER: {
            winningFields.push(ba.BetField.PLAYER);
            break;
          }
          case ba.WinType.TIE: {
            winningFields.push(ba.BetField.TIE);
            break;
          }
          default: {
            break;
          }
        }

        winningFields.map(fieldName => {
          const colorMatrix = [1, 0, 0, 0, 100, 0, 1, 0, 0, 100, 0, 0, 1, 0, 100, 0, 0, 0, 1, 0];
          const brightnessFilter = new we.ui.BrightnessFilter(colorMatrix);
          this._imageMapping[fieldName].filters = [brightnessFilter];

          egret.Tween.get(brightnessFilter).to({ alpha: 0 }, 125).to({ alpha: 100 }, 125).to({ alpha: 0 }, 125).to({ alpha: 100 }, 125).to({ alpha: 0 }, 125).to({ alpha: 100 }, 125);
        });
      }
    }
  }
}
