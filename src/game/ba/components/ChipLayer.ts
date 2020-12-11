namespace we {
  export namespace ba {
    export class ChipLayer extends ui.ChipLayer {
      protected _playerGroup: eui.Group;
      protected _bankerGroup: eui.Group;
      protected _playerPairGroup: eui.Group;
      protected _tieGroup: eui.Group;
      protected _bankerPairGroup: eui.Group;

      protected _superSixPlayerGroup: eui.Group;
      protected _superSixBankerGroup: eui.Group;
      protected _superSixPlayerPairGroup: eui.Group;
      protected _superSixTieGroup: eui.Group;
      protected _superSixGroup: eui.Group;
      protected _superSixBankerPairGroup: eui.Group;

      protected _playerBetChipStack: ui.BetChipStack;
      protected _bankerBetChipStack: ui.BetChipStack;
      protected _playerPairBetChipStack: ui.BetChipStack;
      protected _tieBetChipStack: ui.BetChipStack;
      protected _bankerPairBetChipStack: ui.BetChipStack;

      protected _superSixPlayerBetChipStack: ui.BetChipStack;
      protected _superSixBankerBetChipStack: ui.BetChipStack;
      protected _superSixPlayerPairBetChipStack: ui.BetChipStack;
      protected _superSixBetChipStack: ui.BetChipStack;
      protected _superSixTieBetChipStack: ui.BetChipStack;
      protected _superSixBankerPairBetChipStack: ui.BetChipStack;

      constructor() {
        super();
        this._betField = ba.BetField;
      }

      protected restructureChildren() { }

      protected createMapping() {
        super.createMapping();
        this._mouseAreaMapping = {};
        this._mouseAreaMapping[ba.BetField.PLAYER] = this._playerGroup;
        this._mouseAreaMapping[ba.BetField.BANKER] = this._bankerGroup;
        this._mouseAreaMapping[ba.BetField.PLAYER_PAIR] = this._playerPairGroup;
        this._mouseAreaMapping[ba.BetField.TIE] = this._tieGroup;
        this._mouseAreaMapping[ba.BetField.BANKER_PAIR] = this._bankerPairGroup;

        this._mouseAreaMapping[ba.BetField.SUPER_SIX_PLAYER] = this._superSixPlayerGroup;
        this._mouseAreaMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerGroup;
        this._mouseAreaMapping[ba.BetField.SUPER_SIX_PLAYER_PAIR] = this._superSixPlayerPairGroup;
        this._mouseAreaMapping[ba.BetField.SUPER_SIX_TIE] = this._superSixTieGroup;
        this._mouseAreaMapping[ba.BetField.SUPER_SIX] = this._superSixGroup;
        this._mouseAreaMapping[ba.BetField.SUPER_SIX_BANKER_PAIR] = this._superSixBankerPairGroup;

        this._betChipStackMapping = {};

        this._betChipStackMapping[ba.BetField.PLAYER] = this._playerBetChipStack;
        this._betChipStackMapping[ba.BetField.BANKER] = this._bankerBetChipStack;
        this._betChipStackMapping[ba.BetField.PLAYER_PAIR] = this._playerPairBetChipStack;
        this._betChipStackMapping[ba.BetField.TIE] = this._tieBetChipStack;
        this._betChipStackMapping[ba.BetField.BANKER_PAIR] = this._bankerPairBetChipStack;

        this._betChipStackMapping[ba.BetField.SUPER_SIX_PLAYER] = this._superSixPlayerBetChipStack;
        this._betChipStackMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerBetChipStack;
        this._betChipStackMapping[ba.BetField.SUPER_SIX_PLAYER_PAIR] = this._superSixPlayerPairBetChipStack;
        this._betChipStackMapping[ba.BetField.SUPER_SIX_TIE] = this._superSixTieBetChipStack;
        this._betChipStackMapping[ba.BetField.SUPER_SIX] = this._superSixBetChipStack;
        this._betChipStackMapping[ba.BetField.SUPER_SIX_BANKER_PAIR] = this._superSixBankerPairBetChipStack;
      }

      protected isExceedUpperBetLimit(fieldAmounts: {}, betLimit: data.BetLimitSet, betDetail: data.BetDetail) {
        const banker = this.getAllValue(fieldAmounts, ba.BetField.BANKER);
        const player = this.getAllValue(fieldAmounts, ba.BetField.PLAYER);
        const tie = this.getAllValue(fieldAmounts, ba.BetField.TIE);
        const bankerPair = this.getAllValue(fieldAmounts, ba.BetField.BANKER_PAIR);
        const playerPair = this.getAllValue(fieldAmounts, ba.BetField.PLAYER_PAIR);

        const superSixBanker = this.getAllValue(fieldAmounts, ba.BetField.SUPER_SIX_BANKER);
        const superSixPlayer = this.getAllValue(fieldAmounts, ba.BetField.SUPER_SIX_PLAYER);
        const superSixPlayerPair = this.getAllValue(fieldAmounts, ba.BetField.SUPER_SIX_PLAYER_PAIR);
        const superSixTie = this.getAllValue(fieldAmounts, ba.BetField.SUPER_SIX_TIE);
        const superSix = this.getAllValue(fieldAmounts, ba.BetField.SUPER_SIX);
        const superSixBankerPair = this.getAllValue(fieldAmounts, ba.BetField.SUPER_SIX_BANKER_PAIR);

        let val = null;

        switch (betDetail.field) {
          case ba.BetField.BANKER:
            val = Math.abs(banker + betDetail.amount);
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'BANKER'));
          case ba.BetField.BANKER_PAIR:
            val = bankerPair + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'BANKER_PAIR'));
          case ba.BetField.PLAYER:
            val = Math.abs(player + betDetail.amount);
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'PLAYER'));
          case ba.BetField.PLAYER_PAIR:
            val = playerPair + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'PLAYER_PAIR'));
          case ba.BetField.TIE:
            val = tie + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'TIE'));
            
          case ba.BetField.SUPER_SIX_PLAYER:
            val = superSixPlayer + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'SUPER_SIX_PLAYER'));
          case ba.BetField.SUPER_SIX_BANKER:
            val = superSixBanker + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'SUPER_SIX_BANKER'));
          case ba.BetField.SUPER_SIX_PLAYER_PAIR:
            val = superSixPlayerPair + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'SUPER_SIX_PLAYER_PAIR'));
          case ba.BetField.SUPER_SIX_TIE:
            val = superSixTie + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'SUPER_SIX_TIE'));
          case ba.BetField.SUPER_SIX:
            val = superSix + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'SUPER_SIX'));
          case ba.BetField.SUPER_SIX_BANKER_PAIR:
            val = superSixBankerPair + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'SUPER_SIX_BANKER_PAIR'));

        }
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.createMapping();
      }
    }
  }
}
