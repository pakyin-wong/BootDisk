namespace we {
  export namespace ba {
    export class ChipLayer extends ui.ChipLayer {
      protected _playerPairGroup: eui.Group;
      protected _bankerPairGroup: eui.Group;
      protected _playerGroup: eui.Group;
      protected _tieGroup: eui.Group;
      protected _superSixGroup: eui.Group;
      protected _superSixBankerGroup: eui.Group;
      protected _bankerGroup: eui.Group;

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

      protected restructureChildren() {}

      protected createMapping() {
        super.createMapping();
        this._mouseAreaMapping = {};
        this._mouseAreaMapping[ba.BetField.PLAYER] = this._playerGroup;
        this._mouseAreaMapping[ba.BetField.BANKER] = this._bankerGroup;
        this._mouseAreaMapping[ba.BetField.PLAYER_PAIR] = this._playerPairGroup;
        this._mouseAreaMapping[ba.BetField.TIE] = this._tieGroup;
        this._mouseAreaMapping[ba.BetField.BANKER_PAIR] = this._bankerPairGroup;
        this._mouseAreaMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerGroup;
        this._mouseAreaMapping[ba.BetField.SUPER_SIX] = this._superSixGroup;

        this._betChipStackMapping = {};

        this._betChipStackMapping[ba.BetField.PLAYER] = this._playerBetChipStack;
        this._betChipStackMapping[ba.BetField.BANKER] = this._bankerBetChipStack;
        this._betChipStackMapping[ba.BetField.PLAYER_PAIR] = this._playerPairBetChipStack;
        this._betChipStackMapping[ba.BetField.TIE] = this._tieBetChipStack;
        this._betChipStackMapping[ba.BetField.BANKER_PAIR] = this._bankerPairBetChipStack;
        this._betChipStackMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerBetChipStack;
        this._betChipStackMapping[ba.BetField.SUPER_SIX] = this._superSixBetChipStack;
      }

      protected isExceedUpperBetLimit(fieldAmounts: {}, betLimit: data.BetLimitSet, betDetail: data.BetDetail) {
        const banker = this.getAllValue(fieldAmounts, ba.BetField.BANKER);
        const player = this.getAllValue(fieldAmounts, ba.BetField.PLAYER);
        const superSixBanker = this.getAllValue(fieldAmounts, ba.BetField.SUPER_SIX_BANKER);
        const tie = this.getAllValue(fieldAmounts, ba.BetField.TIE);
        const bankerPair = this.getAllValue(fieldAmounts, ba.BetField.BANKER_PAIR);
        const playerPair = this.getAllValue(fieldAmounts, ba.BetField.PLAYER_PAIR);
        const superSix = this.getAllValue(fieldAmounts, ba.BetField.SUPER_SIX);

        let val = null;

        switch (betDetail.field) {
          case ba.BetField.BANKER:
            val = Math.abs(banker + betDetail.amount - player);
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'BANKER'));
          case ba.BetField.BANKER_PAIR:
            val = bankerPair + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'BANKER_PAIR'));
          case ba.BetField.PLAYER:
            val = Math.abs(player + betDetail.amount - banker);
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'PLAYER'));
          case ba.BetField.PLAYER_PAIR:
            val = playerPair + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'PLAYER_PAIR'));
          case ba.BetField.TIE:
            val = tie + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'TIE'));
          case ba.BetField.SUPER_SIX:
            val = superSix + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'SUPER_SIX'));
          case ba.BetField.SUPER_SIX_BANKER:
            val = superSixBanker + betDetail.amount;
            return this.checkLimit(val, betDetail, utils.getBetLimit(betLimit, 'ba', 'SUPER_SIX_BANKER'));
        }
      }

      // protected isExceedLowerBetLimit(fieldAmounts: {}, betLimit: data.BetLimitSet) {
      //   const banker = this.getAllValue(fieldAmounts, ba.BetField.BANKER);
      //   const player = this.getAllValue(fieldAmounts, ba.BetField.PLAYER);
      //   const superSixBanker = this.getAllValue(fieldAmounts, ba.BetField.SUPER_SIX_BANKER);
      //   const tie = this.getAllValue(fieldAmounts, ba.BetField.TIE);
      //   const bankerPair = this.getAllValue(fieldAmounts, ba.BetField.BANKER_PAIR);
      //   const playerPair = this.getAllValue(fieldAmounts, ba.BetField.PLAYER_PAIR);
      //   const superSix = this.getAllValue(fieldAmounts, ba.BetField.SUPER_SIX);

      //   if (
      //     (banker !== 0 && banker < betLimit.minlimit) ||
      //     (player !== 0 && player < betLimit.minlimit) ||
      //     (superSixBanker !== 0 && superSixBanker < betLimit.minlimit) ||
      //     (tie !== 0 && tie < betLimit.minlimit) ||
      //     (bankerPair !== 0 && bankerPair < betLimit.minlimit) ||
      //     (playerPair !== 0 && playerPair < betLimit.minlimit) ||
      //     (superSix !== 0 && superSix < betLimit.minlimit)
      //   ) {
      //     return true;
      //   }

      //   return false;
      // }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.createMapping();
      }
    }
  }
}
