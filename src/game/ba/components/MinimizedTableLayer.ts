namespace we {
  export namespace ba {
    export class MinimizedTableLayer extends core.BaseEUI {
      protected _bankerLabel;
      protected _bankerBetLabel;
      protected _playerLabel;
      protected _playerBetLabel;
      protected _tieLabel;
      protected _tieBetLabel;
      protected _playerPairLabel;
      protected _playerPairBetLabel;
      protected _bankerPairLabel;
      protected _bankerPairBetLabel;
      protected _superSixBankerLabel;
      protected _superSixBankerBetLabel;
      protected _superSixLabel;
      protected _superSixBetLabel;
      public _bankerPairGroupRoundRectShape;

      constructor() {
        super();
      }

      protected mount() {
        super.mount();
        this._playerLabel.renderText = () => i18n.t('baccarat.player');
        this._bankerLabel.renderText = () => i18n.t('baccarat.banker');
        this._playerPairLabel.renderText = () => i18n.t('baccarat.playerPair');
        this._tieLabel.renderText = () => i18n.t('baccarat.tie');
        this._bankerPairLabel.renderText = () => i18n.t('baccarat.bankerPair');
        this._superSixBankerLabel.renderText = () => i18n.t('baccarat.banker');
        this._superSixLabel.renderText = () => i18n.t('baccarat.superSix');
        this._bankerBetLabel.text = '0';
        this._playerBetLabel.text = '0';
        this._tieBetLabel.text = '0';
        this._playerPairBetLabel.text = '0';
        this._bankerPairBetLabel.text = '0';
        this._superSixBetLabel.text = '0';
        this._superSixBankerBetLabel.text = '0';
      }

      public updateBetLabel(isinit: boolean, betInfo?: any) {
        if (isinit === true) {
          this._bankerBetLabel.text = '0';
          this._playerBetLabel.text = '0';
          this._tieBetLabel.text = '0';
          this._playerPairBetLabel.text = '0';
          this._bankerPairBetLabel.text = '0';
          this._superSixBetLabel.text = '0';
          this._superSixBankerBetLabel.text = '0';
          return;
        }
        for (const prop in betInfo.amount) {
          switch (prop) {
            case 'PLAYER':
              this._playerBetLabel.text = we.utils.formatNumber(betInfo.amount.PLAYER, true);
              break;
            case 'BANKER':
              this._bankerBetLabel.text = we.utils.formatNumber(betInfo.amount.BANKER, true);
              break;
            case 'BANKER_PAIR':
              this._bankerPairBetLabel.text = we.utils.formatNumber(betInfo.amount.BANKER_PAIR, true);
              break;
            case 'PLAYER_PAIR':
              this._playerPairBetLabel.text = we.utils.formatNumber(betInfo.amount.PLAYER_PAIR, true);
              break;
            case 'TIE':
              this._tieBetLabel.text = we.utils.formatNumber(betInfo.amount.TIE, true);
              break;
            case 'SUPER_SIX':
              this._superSixBetLabel.text = we.utils.formatNumber(betInfo.amount.SUPER_SIX, true);
              break;
            case 'SUPER_SIX_BANKER':
              this._superSixBankerBetLabel.text = we.utils.formatNumber(betInfo.amount.SUPER_SIX_BANKER, true);
              break;
            default:
              this._bankerBetLabel.text = '0';
              this._playerBetLabel.text = '0';
              this._tieBetLabel.text = '0';
              this._playerPairBetLabel.text = '0';
              this._bankerPairBetLabel.text = '0';
              this._superSixBetLabel.text = '0';
              this._superSixBankerBetLabel.text = '0';
              break;
          }
        }
      }
    }
  }
}
