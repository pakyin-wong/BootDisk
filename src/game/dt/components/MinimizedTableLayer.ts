namespace we {
  export namespace dt {
    export class MinimizedTableLayer extends core.BaseEUI implements ui.IMinimizedTableLayer {
      protected _dragonLabel: ui.RunTimeLabel;
      protected _dragonBetLabel;
      protected _tigerLabel: ui.RunTimeLabel;
      protected _tigerBetLabel;
      protected _tieLabel: ui.RunTimeLabel;
      protected _tieBetLabel;

      constructor() {
        super();
      }

      protected mount() {
        super.mount();
        if (this._tigerLabel) {
          this._tigerLabel.renderText = () => i18n.t('dragontiger.tigerShort');
          this._dragonLabel.renderText = () => i18n.t('dragontiger.dragonShort');
          this._tieLabel.renderText = () => i18n.t('dragontiger.tieShort');
          this._dragonBetLabel.text = '0';
          this._tigerBetLabel.text = '0';
          this._tieBetLabel.text = '0';
        }
      }

      public updateBetLabel(isinit: boolean, betInfo?: any) {
        if (isinit === true) {
          this._dragonBetLabel.text = '0';
          this._tigerBetLabel.text = '0';
          this._tieBetLabel.text = '0';
          return;
        }
        for (const prop in betInfo.amount) {
          switch (prop) {
            case 'DRAGON':
              this._dragonBetLabel.text = we.utils.formatNumber(betInfo.amount.DRAGON, true);
              break;
            case 'TIGER':
              this._tigerBetLabel.text = we.utils.formatNumber(betInfo.amount.TIGER, true);
              break;
            case 'TIE':
              this._tieBetLabel.text = we.utils.formatNumber(betInfo.amount.TIE, true);
              break;
            default:
              this._dragonBetLabel.text = '0';
              this._tigerBetLabel.text = '0';
              this._tieBetLabel.text = '0';
              break;
          }
        }
      }
    }
  }
}
