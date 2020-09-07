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

      constructor() {
        super();
        // console.log('ttesteeette');
      }
      public get tableInfo() {
        return this._tableInfo;
      }
      public set tableInfo(val: any) {
        this._tableInfo = val;
      }
      public get tableId() {
        return this._tableId;
      }
      public set tableId(val: any) {
        this._tableId = val;
      }
      protected mount() {
        super.mount();
        this._playerLabel.renderText = () => i18n.t('baccarat.player');
        this._bankerLabel.renderText = () => i18n.t('baccarat.banker');
        this._playerPairLabel.renderText = () => i18n.t('baccarat.playerPair');
        this._tieLabel.renderText = () => i18n.t('baccarat.tie');
        this._bankerPairLabel.renderText = () => i18n.t('baccarat.bankerPair');
        // this._superSixBankerLabel.renderText = () => i18n.t('baccarat.banker');
        // this._superSixLabel.renderText = () => i18n.t('baccarat.superSix');
        this._bankerBetLabel.text = '0';
        this._playerBetLabel.text = '0';
        this._tieBetLabel.text = '0';
        this._playerPairBetLabel.text = '0';
        this._bankerPairBetLabel.text = '0';
      }
      public updateBetLabel(betInfo) {
              console.log('betInfo.betinfo',betInfo.betinfo)
              console.log('betInfo..betinfoamount',betInfo.betinfo.amount)
              console.log('type of betInfo.betinfo.amount',typeof(betInfo.betinfo.amount))
              for (let prop in betInfo.betinfo.amount) {
                  console.log('prop',prop);
                  console.log('type of prop',typeof(prop))
              }
      }
    }
  }
}
