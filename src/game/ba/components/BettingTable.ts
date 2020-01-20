namespace we {
  export namespace ba {
    export class BettingTable extends ui.BettingTable {
      protected _gridPlayerPair: we.ui.BettingTableGrid;
      protected _gridBankerPair: we.ui.BettingTableGrid;
      protected _gridPlayer: we.ui.BettingTableGrid;
      protected _gridTie: we.ui.BettingTableGrid;
      protected _gridSuperSix: we.ui.BettingTableGrid;
      protected _gridSuperSixBanker: we.ui.BettingTableGrid;
      protected _gridBanker: we.ui.BettingTableGrid;

      constructor() {
        super();
        this._betField = ba.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this.mapping = {};
        this.mapping[ba.BetField.PLAYER] = this._gridPlayer;
        this.mapping[ba.BetField.BANKER] = this._gridBanker;
        this.mapping[ba.BetField.PLAYER_PAIR] = this._gridPlayerPair;
        this.mapping[ba.BetField.TIE] = this._gridTie;
        this.mapping[ba.BetField.BANKER_PAIR] = this._gridBankerPair;
        this.mapping[ba.BetField.SUPER_SIX_BANKER] = this._gridSuperSixBanker;
        this.mapping[ba.BetField.SUPER_SIX] = this._gridSuperSix;
      }

      protected changeLang() {
        super.changeLang();
        this._gridPlayer.text = i18n.t('baccarat.player');
        this._gridBanker.text = i18n.t('baccarat.banker');
        this._gridPlayerPair.text = i18n.t('baccarat.playerPair');
        this._gridTie.text = i18n.t('baccarat.tie');
        this._gridBankerPair.text = i18n.t('baccarat.bankerPair');
        this._gridSuperSixBanker.text = i18n.t('baccarat.banker');
        this._gridSuperSix.text = i18n.t('baccarat.superSix');
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
