namespace we {
  export namespace ba {
    export class MinimizedTableLayer extends core.BaseEUI {
      protected _tableInfo: any;
      protected _tableId: any;

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

      constructor() {
        super();
        // console.log('ttesteeette');
      }
      // public get tableInfo() {
      //   return this._tableInfo;
      // }
      // public set tableInfo(val: any) {
      //   this._tableInfo = val;
      // }
      // public get tableId() {
      //   return this._tableId;
      // }
      // public set tableId(val: any) {
      //   this._tableId = val;
      // }
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

      public updateBetLabel(isinit:boolean , betInfo?:any ) {

        if (isinit === true) {
          this._bankerBetLabel.text = '0';
          this._playerBetLabel.text = '0';
          this._tieBetLabel.text = '0';
          this._playerPairBetLabel.text = '0';
          this._bankerPairBetLabel.text = '0';
          this._superSixBetLabel.text = '0';
          this._superSixBankerBetLabel.text = '0';   
          return       
        }
        for (const prop in betInfo.amount) {
          switch (prop) {
            case 'PLAYER':
              this._playerBetLabel.text = betInfo.amount.PLAYER / 100;
              break;
            case 'BANKER':
              this._bankerBetLabel.text = betInfo.amount.BANKER / 100;
              break;
            case 'BANKER_PAIR':
              this._bankerPairBetLabel.text = betInfo.amount.BANKER_PAIR / 100;
              break;
            case 'PLAYER_PAIR':
              this._playerPairBetLabel.text = betInfo.amount.PLAYER_PAIR / 100;
              break;
            case 'TIE':
              this._tieBetLabel.text = betInfo.amount.TIE / 100;
              break;
            case 'SUPER_SIX':
              this._superSixBetLabel.text = betInfo.amount.SUPER_SIX / 100;
              break;
            case 'SUPER_SIX_BANKER':
              this._superSixBankerBetLabel.text =  betInfo.amount.SUPER_SIX_BANKER / 100;
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
