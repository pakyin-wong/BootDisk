namespace we {
  export namespace ba {
    export class ChipLayer extends ui.ChipLayer {
      protected _playerPairImage: eui.Image;
      protected _bankerPairImage: eui.Image;
      protected _playerImage: eui.Image;
      protected _tieImage: eui.Image;
      protected _superSixImage: eui.Image;
      protected _superSixBankerImage: eui.Image;
      protected _bankerImage: eui.Image;

      protected _playerPairBetChipStack: ui.BetChipStack;
      protected _bankerPairBetChipStack: ui.BetChipStack;
      protected _playerBetChipStack: ui.BetChipStack;
      protected _tieBetChipStack: ui.BetChipStack;
      protected _superSixBetChipStack: ui.BetChipStack;
      protected _superSixBankerBetChipStack: ui.BetChipStack;
      protected _bankerBetChipStack: ui.BetChipStack;

      constructor() {
        super();
        this._betField = ba.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._mouseAreaMapping = {};
        this._mouseAreaMapping[ba.BetField.PLAYER] = this._playerImage;
        this._mouseAreaMapping[ba.BetField.BANKER] = this._bankerImage;
        this._mouseAreaMapping[ba.BetField.PLAYER_PAIR] = this._playerPairImage;
        this._mouseAreaMapping[ba.BetField.TIE] = this._tieImage;
        this._mouseAreaMapping[ba.BetField.BANKER_PAIR] = this._bankerPairImage;
        this._mouseAreaMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerImage;
        this._mouseAreaMapping[ba.BetField.SUPER_SIX] = this._superSixImage;

        this._betChipStackMapping = {};

        this._betChipStackMapping[ba.BetField.PLAYER] = this._playerBetChipStack;
        this._betChipStackMapping[ba.BetField.BANKER] = this._bankerBetChipStack;
        this._betChipStackMapping[ba.BetField.PLAYER_PAIR] = this._playerPairBetChipStack;
        this._betChipStackMapping[ba.BetField.TIE] = this._tieBetChipStack;
        this._betChipStackMapping[ba.BetField.BANKER_PAIR] = this._bankerPairBetChipStack;
        this._betChipStackMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerBetChipStack;
        this._betChipStackMapping[ba.BetField.SUPER_SIX] = this._superSixBetChipStack;
      }

      protected isExceedBetLimit(fieldAmounts: {}, betLimit: data.BetLimit) {
        return (
          Math.abs(fieldAmounts[ba.BetField.BANKER] - fieldAmounts[ba.BetField.PLAYER]) > betLimit.maxlimit ||
          Math.abs(fieldAmounts[ba.BetField.SUPER_SIX_BANKER] - fieldAmounts[ba.BetField.PLAYER]) > betLimit.maxlimit ||
          fieldAmounts[ba.BetField.TIE] > betLimit.maxlimit ||
          fieldAmounts[ba.BetField.BANKER_PAIR] > betLimit.maxlimit ||
          fieldAmounts[ba.BetField.PLAYER_PAIR] > betLimit.maxlimit ||
          fieldAmounts[ba.BetField.SUPER_SIX] > betLimit.maxlimit
        );
      }
    }
  }
}
